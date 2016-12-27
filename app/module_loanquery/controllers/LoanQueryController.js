'use strict';

/* Controllers */
// signin controllers
angular.module("pu.loanquery.controllers")
    .controller('LoanQueryController',function ($scope, $rootScope, $state,$stateParams, toaster, $uibModal,LoanQueryService,PublicRepayService,SettleService,AlterRepayDateService,RefundService,
                                                RemissionService,ExtendPeriodService,OtherFeeService,CollectionService,AlterCustInfoService,InsManageService,TelInterviewService,SmsService,ProductService,SysDictService) {
        $scope.initList = function(){
            $scope.productList = ProductService.queryAllProductList().$object;
            $scope.repayStatusList = SysDictService.queryDictDataByTypeCode("hkzt").$object;
            $scope.loanCustList = LoanQueryService.getLoanCustList().$object;
        };
        $scope.queryLoanCustList = function(){
            $scope.loanCustList = LoanQueryService.getLoanCustList().$object;
        }
        $scope.initLoanDetail = function(){
            $scope.appId = $stateParams.appId;
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

        $scope.queryOtherFeeList = function(){
            $scope.otherFeeList = LoanQueryService.getOtherFeeList($stateParams.appId).$object;
        }
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
        };
        $scope.doOtherFee = function(){
            OtherFeeService.addOtherFeeApply($stateParams.appId);
        };
        $scope.doPartSettle = function(){
            SettleService.addPartSettleApply($stateParams.appId);
        };
        $scope.doPhoneCollection = function(){
            CollectionService.createPhoneCollectionTask($stateParams.appId,"test").then(function(response){
                toaster.pop('success', '操作提醒', '提交任务成功');
            });
        };
        $scope.doRecoverCollectionTask = function(){
            CollectionService.createRecoverCollectionTask($stateParams.appId).then(function(response){
                toaster.pop('success', '操作提醒', '提交任务成功');
            })
        };
        $scope.doAlterTenantInfo = function(){
            AlterCustInfoService.doAlterTenantInfo($stateParams.appId,$scope.applyInfo).then(function(response){
                toaster.pop('success', '操作提醒', '提交变更成功');
            })
        };
        $scope.doAlterColesseeInfo = function(){
            AlterCustInfoService.doAlterColesseeInfo($stateParams.appId,$scope.applyInfo).then(function(response){
                toaster.pop('success', '操作提醒', '提交变更成功');
            })
        };
        $scope.doAlterLinkmanInfo = function(){
            AlterCustInfoService.doAlterLinkmanInfo($stateParams.appId,$scope.applyInfo).then(function(response){
                toaster.pop('success', '操作提醒', '提交变更成功');
            })
        };
        $scope.doAlterBankInfo = function(){
            AlterCustInfoService.doAlterBankInfo($stateParams.appId).then(function(response){
                toaster.pop('success', '操作提醒', '提交变更成功');
            })
        };
        $scope.doInsuranceContinue = function(){
            InsManageService.createInsuranceContinueTask($stateParams.appId).then(function(response){
                toaster.pop('success', '操作提醒', '发起任务成功');
            })
        };
        $scope.getInsuranceHisList = function(){
            $scope.insHisList = InsManageService.getInsuranceHisList($stateParams.appId).$object;
        };
        $scope.createTelInterviewTask = function(){
            TelInterviewService.createTelInterviewTask($stateParams.appId).then(function(response){
                toaster.pop('success', '操作提醒', '发起任务成功');
            })
        };
        $scope.getTelInterviewHisList = function(){
            $scope.telInterviewHisList = TelInterviewService.getTelInterviewHisList($scope.appId).$object;
        };
        $scope.showTelInterviewDetail = function(item){
            TelInterviewService.showTelInterviewDetail(item);
        };
        $scope.sendSms = function(appId){
            SmsService.sendSms(appId);
        }
    })
;