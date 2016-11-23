'use strict';

/* Controllers */
// signin controllers
angular.module("pu.loanquery.controllers")
    .controller('LoanQueryController',function ($scope, $rootScope, $state,$stateParams, toaster, $uibModal,LoanQueryService,PublicRepayService,SettleService,AlterRepayDateService,RefundService,RemissionService,ExtendPeriodService) {
        $scope.initList = function(){
            $scope.loanCustList = LoanQueryService.getLoanCustList().$object;
        };
        $scope.initLoanDetail = function(){
            $scope.loanCustApplyInfo = LoanQueryService.getLoanCustApplyInfo($stateParams.appId).$object;
            $scope.loanCustNeedRepayInfo = LoanQueryService.getLoanCustNeedRepayInfo($stateParams.appId).$object;
            $scope.repayPlanList = LoanQueryService.getLoanCustRepayPlanList($stateParams.appId).$object;
            $scope.doInitApplyEdit($stateParams.appId);
        };

        $scope.queryRepayLog = function(){
            $scope.repayLogList =LoanQueryService.getLoanCustRepayLog($stateParams.appId).$object;
        };

        $scope.queryChargeLog = function(){
            $scope.chargeLogList = LoanQueryService.getLoanCustChargeLog($stateParams.appId).$object;
        };

        $scope.doPublicRepay = function(){
            PublicRepayService.addPublicRepayApply($stateParams.appId);
        };
        $scope.doSettle = function(){
            SettleService.addSettleApply($stateParams.appId);
        };
        $scope.doAlterRepayDate = function(){
            AlterRepayDateService.addAlterRepayDateApply($stateParams.appId);
        };
        $scope.doRefund = function(){
            RefundService.addRefundApply($stateParams.appId);
        };
        $scope.doRemission = function(){
            RemissionService.addRemissionApply($stateParams.appId);
        };
        $scope.doExtendPeriod = function(){
            ExtendPeriodService.addExtendPeriodApply($stateParams.appId);
        }

    })
;