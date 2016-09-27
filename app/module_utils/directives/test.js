/**
 * Created by dengpan on 2016/9/27.
 */
angular.module('pu.utils.directives')
    .directive('test',function(){
        return {
            restrict:'E',
            require:'?ngModel',
            scope:{
                treeData:'=',
                nameField:'@',
                ngRequired:'@'
            },
            templateUrl:'module_utils/tpl/test.html',
            link:function($scope,element,attrs,ngModel){
                if(!ngModel) return;
                ngModel.$render = function(){

                };
                ngModel.$parsers.push(function(viewValue){
                    return viewValue+"ssss";
                });
                $scope.checkHandle = function(item){
                   $scope.val="aaaa";
                };
            }

        }
    })