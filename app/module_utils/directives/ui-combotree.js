/**
 * Created by dengpan on 2016/9/27.
 */
angular.module('pu.utils.directives')
    .directive('uiCombotree',function(){
        return {
            restrict:'E',
            require:'?ngModel',
            scope:{
                choices:'=',
                convertTreeOption:'=',
                trackBy:'@',
                label:'@',
                checked:'=',
                ngRequired:'@',
                placeholder:'@'
            },
            templateUrl:'module_utils/tpl/ui-combotree.html',
            link:function($scope,element,attrs,ngModel){
                if(!ngModel) return;

                if($scope.trackBy==undefined){
                    $scope.trackBy='id';
                };
                if($scope.checked==undefined){
                    $scope.checked = false;
                }
                $scope.convertArrayToTree=function(data,options){
                    options = options || {};
                    var ID_KEY = options.idKey || 'id';
                    var PARENT_KEY = options.parentKey || 'parent';
                    var CHILDREN_KEY = options.childrenKey || 'children';

                    var tree = [],
                        childrenOf = {};
                    var item, id, parentId;

                    for (var i = 0, length = data.length; i < length; i++) {
                        data[i].$$expanded = true;
                        item = data[i];
                        id = item[ID_KEY];
                        parentId = item[PARENT_KEY] || 0;
                        // every item may have children
                        childrenOf[id] = childrenOf[id] || [];
                        // init its children
                        item[CHILDREN_KEY] = childrenOf[id];
                        if (parentId != 0) {
                            // init its parent's children object
                            childrenOf[parentId] = childrenOf[parentId] || [];
                            // push it into its parent's children object
                            childrenOf[parentId].push(item);
                        } else {
                            tree.push(item);
                        }
                    };
                    return tree[0];
                };
                $scope.initView = function(modelValue){
                    if($scope.checked==true){
                        //如果开启复选模式，则model的值应为array类型
                        for(var i =0;i<$scope.choices.length;i++){
                            for(var j = 0 ;j<modelValue.length;j++){
                                if($scope.choices[i][$scope.trackBy]==modelValue[j][$scope.trackBy]){
                                    $scope.choices[i].checked=true;
                                }
                            }
                        }
                        $scope.setViewValue(modelValue);
                    }else{
                        //单选模式下只支持字符串
                        for(var i =0;i<$scope.choices.length;i++){
                            if($scope.choices[i][$scope.trackBy]==modelValue){
                                var tmp = [];
                                tmp.push($scope.choices[i]);
                                $scope.setViewValue(tmp);
                                break;
                            }
                        }
                    }
                };
                ngModel.$formatters.push(function(modelValue){
                    $scope.treeData = $scope.convertArrayToTree($scope.choices,$scope.convertTreeOption);
                    $scope.initView(modelValue);
                });

                $scope.$watch('choices',function(newVal,oldVal){
                    if(ngModel.$modelValue!=undefined){
                        $scope.initView(ngModel.$modelValue);
                    };
                    $scope.treeData = $scope.convertArrayToTree($scope.choices,$scope.convertTreeOption);
                },true);

                $scope.checkHandle = function(tree){
                    var checkList = $scope.getCheckItem(tree);
                    ngModel.$setViewValue(checkList);
                    $scope.setViewValue(checkList);
                };

                $scope.setViewValue = function(checkList){
                    if(checkList == undefined)
                        return;
                    var viewValue="";
                    for(var i =0 ;i<checkList.length ;i++){
                        viewValue+=checkList[i][$scope.label]+","
                    }
                    if(viewValue.length>0){
                        viewValue = viewValue.substring(0,viewValue.length-1);
                    }
                    $scope.selectedViewValue = viewValue;
                }
                $scope.getCheckItem = function(tree){
                    var checkList = [];
                    if(tree.checked){
                        checkList.push(tree);
                    }
                    for(var i = 0;i<tree.children.length;i++){
                        checkList=checkList.concat($scope.getCheckItem(tree.children[i]));
                    }
                    return checkList;
                };
                //复选模式下关闭节点选择事件处理
                if($scope.checked!=true){
                    $scope.$on('nodeClicked',function (event) {
                        $scope.selItem=event.targetScope.treeData;
                        $scope.selectedViewValue = $scope.selItem[$scope.label];
                        ngModel.$setViewValue($scope.selItem[$scope.trackBy]);
                    });
                }
            }

        }
    })