'use strict';

/* Controllers */
// signin controllers
angular.module("pu.loantask.controllers")
    .controller('LoanTaskHistoryController',function ($scope, $rootScope, $state,$stateParams, toaster, $uibModal,LoanTaskService) {
        $scope.showPublicRepayTask = function(){
            $state.go('app.loantask.history.publicrepay');
        };
    })
;