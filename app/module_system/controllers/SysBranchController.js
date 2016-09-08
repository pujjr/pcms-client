'use strict';

/* Controllers */
// signin controller
angular.module("pu.system.controllers")
    .controller('SysBranchController',function ($scope, $rootScope, $state, toaster, SysBranchService,ToolsService) {
        $scope.init = function () {
           SysBranchService.querySysBranchList().then(function(response){
                $scope.sysBranchTree=ToolsService.convertArrayToTree(response, {
                    idKey: 'id',
                    parentKey: 'parentId',
                    childrenKey: 'children'
                });
            });
        };
    })
;