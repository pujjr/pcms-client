/**
 * Created by dengpan on 2016/9/27
 * 实现多选下拉框功能
 * 参数
 * choices 可选下拉框列表 数组
 * seperator 当modelFormat为字符串时按照seperator分割，默认为‘,’
 * trackBy model值与choices按照指定域进行匹配
 * showField 当选择下拉框后在文本框显示字段
 * modelFormat 模型类型string或array
 * ngRequired 是否必须
 * ngDisabled 是否禁用.
 */
angular.module('pu.utils.directives')
    .directive('uiMultiselect',function(){
        return {
            restrict:'E',
            require:'?ngModel',
            scope:{
                choices:'=',
                seperator:'@',
                trackBy:'@',
                showField:'@',
                modelFormat:'@',
                ngRequired:'@',
                ngDisabled:'@',
                placeholder:'@'
            },
            transclude:true,
            templateUrl:'module_utils/tpl/ui-multiselect.html',
            link:function($scope,element,attrs,ngModel){
                if(!ngModel){
                    return;
                }
                if(!angular.isArray($scope.choices)){
                    console.error("choices属性必须为列表格式");
                    return;
                }
                if($scope.showField == undefined){
                    console.error("未设置showField属性");
                    return;
                }
                //将模型值转换
                ngModel.$formatters.push(function(modelValue){
                    var modelValArray=[];
                    if(angular.isArray($scope.choices) && $scope.choices.length>0){
                        if($scope.modelFormat=='string'){
                            if($scope.seperator!=undefined){
                                modelValArray = modelValue.split($scope.seperator)
                            }else{
                                modelValArray = modelValue.split(",");
                            };

                        }else{
                            modelValArray = modelValue;
                        }
                        if(!$scope.trackBy){
                            $scope.trackBy='id';
                        };
                        for(var i  = 0 ;i<modelValArray.length;i++){
                            for(var j = 0 ;j<$scope.choices.length;j++){
                                if(angular.isString(modelValArray[i])){
                                    if($scope.choices[j][$scope.trackBy]==modelValArray[i]){
                                        $scope.choices[j].checked=true;
                                    }
                                }else if(angular.isObject(modelValArray[i])){
                                    if($scope.choices[j][$scope.trackBy]==modelValArray[i][$scope.trackBy]){
                                        $scope.choices[j].checked=true;
                                    }
                                }

                            }
                        };
                        $scope.setViewValue();
                    }
                });
                ngModel.$parsers.push(function(viewValue){
                   return viewValue;
                });
                $scope.onCheck = function(item){
                    item.checked = !item.checked;
                    $scope.setViewValue();
                    $scope.setModelValue();
                };
                $scope.setModelValue = function(){
                    if($scope.modelFormat =="string"){
                        var modelValue="";
                        angular.forEach($scope.choices,function(item){
                            if(item.checked==true){
                                modelValue+=item[$scope.trackBy]+$scope.seperator;
                            }
                        });
                        if(modelValue.length>0){
                            modelValue = modelValue.substring(0,modelValue.length-1);
                        }
                        ngModel.$setViewValue(modelValue);
                    }else{
                        var modelList =[];
                        angular.forEach($scope.choices,function(item){
                            if(item.checked==true){
                                modelList.push(item);
                            }
                        });
                        ngModel.$setViewValue(modelList);
                    }
                }
                $scope.setViewValue = function(){
                    var viewValue="";
                    angular.forEach($scope.choices,function(item){
                        if(item.checked==true){
                            viewValue+=item[$scope.showField]+",";
                        }
                    });
                    if(viewValue.length>0)
                        viewValue = viewValue.substring(0,viewValue.length-1);
                    $scope.selectedViewValue = viewValue;
                }

            }

        }
    })