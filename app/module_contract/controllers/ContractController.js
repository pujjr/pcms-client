'use strict';

/* Controllers */
// signin controllers
angular.module("pu.contract.controllers")
    .controller('ContractController',function ($scope, $rootScope, $state, toaster, $uibModal) {
        $scope.contractInfoManage = function(){
            $state.go('app.contract.contractinfo');
        };
        $scope.contractTemplateManage = function(){
            $state.go('app.contract.contracttemplate');
        };
    })
;