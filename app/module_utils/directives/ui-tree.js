'use strict';

/**
 * @ngdoc directive
 * @name widgetApp.directive:tree
 * @description
 * # tree
 */
angular.module('pu.utils.directives')
    .directive('uiTree', function ($compile) {
        return {
            restrict: "E",
            scope: {
                treeData: '=',
                checked:'=',
                label:'@',
                mode:'@',
                onSelect:'&',
                onChecked:'&'
            },
            templateUrl:'module_utils/tpl/ui-treenode.html',
            link:function($scope,element,attrs){
                $scope.$on('nodeClicked',function (event) {
                    $scope.selItem=event.targetScope.treeData;
                    $scope.onSelect({$item:$scope.selItem});
                });

            }
        };
    });
