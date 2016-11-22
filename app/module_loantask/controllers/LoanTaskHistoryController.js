'use strict';

/* Controllers */
// signin controllers
angular.module("pu.loantask.controllers")
    .controller('LoanTaskHistoryController',function ($scope, $rootScope, $state,$stateParams, toaster, $uibModal,LoanTaskService) {
        $scope.showPublicRepayTask = function(){
            $state.go('app.loantask.history.publicrepay');
        };
        $scope.showSettleTask = function(){
            $state.go('app.loantask.history.settle');
        };
        $scope.showAlterRepayDateTask = function(){
            $state.go('app.loantask.history.alterrepaydate');
        };
        $scope.showRefundTask = function(){
            $state.go("app.loantask.history.refund");
        }
    })
;