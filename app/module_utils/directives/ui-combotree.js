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
                labelField:'@',
                ngRequired:'@',
                placeholder:'@'
            },
            templateUrl:'module_utils/tpl/ui-combotree.html',
            link:function($scope,element,attrs,ngModel){
                if(!ngModel) return;

                if(!$scope.trackBy){
                    $scope.trackBy='id';
                };
                $scope.convertArrayToTree=function(data,options){
                    options = options || {};
                    var ID_KEY = options.idKey || 'id';
                    var PARENT_KEY = options.parentKey || 'parent';
                    var CHILDREN_KEY = options.childrenKey || 'children';

                    var tree = [],
                        childrenOf = {};
                    var item, id, parentId;

                    for (var i = 0, length = data.length; i < length; i++) {
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
                ngModel.$formatters.push(function(modelValue){
                    for(var i =0;i<$scope.choices.length;i++){
                        for(var j = 0 ;j<modelValue.length;j++){
                            if($scope.choices[i][$scope.trackBy]==modelValue[j][$scope.trackBy]){
                                $scope.choices[i].checked=true;
                            }
                        }
                    }
                    $scope.treeData = $scope.convertArrayToTree($scope.choices,$scope.convertTreeOption);
                    $scope.setViewValue(modelValue);
                });
                $scope.$watch('choices',function(newVal,oldVal){
                    if(ngModel.$modelValue!=undefined){
                        for(var i =0;i<$scope.choices.length;i++){
                            for(var j = 0 ;j<ngModel.$modelValue.length;j++){
                                if($scope.choices[i][$scope.trackBy]==ngModel.$modelValue[j][$scope.trackBy]){
                                    $scope.choices[i].checked=true;
                                }
                            }
                        }
                        $scope.setViewValue(ngModel.$modelValue);
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
                        viewValue+=checkList[i][$scope.labelField]+","
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
                }

            }

        }
    })