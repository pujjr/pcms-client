'use strict';

/**
 * @ngdoc directive
 * @name widgetApp.directive:tree
 * @description
 * # tree
 */
angular.module('pu.utils.directives')
    .directive('ngFileChoose', function ($compile,FileService,ToolsService,modal,$uibModal,toaster) {
        return {
            restrict: "E",
            require:'?^ngModel',
            scope:{
                ngRequired:'=',
                ngDisabled:'=',
                placeholder:'@'
            },
            templateUrl:'module_file/tpl/choose-file.html',
            link:function($scope,element,attrs,ngModelCtrl){
                if(!ngModelCtrl){
                    return;
                };
                if(attrs.$attr.multiple!=undefined){
                    $scope.multiple=true;
                }else{
                    $scope.multiple=false;
                }
                $scope.fileChange = function(){
                    ngModelCtrl.$setViewValue(file.files);
                    $scope.fileListName="";
                    angular.forEach(file.files,function(item){
                        $scope.fileListName +=item.name+",";
                    });
                    $scope.$apply();
                };
            }
        };
    });
