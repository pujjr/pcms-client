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
            },
            templateUrl:'module_file/tpl/choose-file.html',
            link:function($scope,element,attrs,ngModelCtrl){
                if(!ngModelCtrl){
                    return;
                };
                $scope.files=[];
                $scope.fileChange = function(){
                    ngModelCtrl.$setViewValue(file.files);
                    $scope.files=file.files;
                    $scope.$digest();
                };
            }
        };
    });
