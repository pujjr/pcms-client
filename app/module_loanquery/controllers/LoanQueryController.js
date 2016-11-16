'use strict';

/* Controllers */
// signin controllers
angular.module("pu.loanquery.controllers")
    .controller('LoanQueryController',function ($scope, $rootScope, $state,$stateParams, toaster, $uibModal,LoanQueryService) {
        $scope.initList = function(){
            $scope.loanCustList = LoanQueryService.getLoanCustList().$object;
        };
        $scope.initLoanDetail = function(){
            $scope.doInitApplyEdit($stateParams.appId);
        }
    })
;