'use strict';

/* Controllers */
// signin controllers
angular.module("pu.loanquery.controllers")
    .controller('LoanQueryController',function ($scope, $rootScope, $state,$stateParams, toaster, $uibModal,LoanQueryService,PublicRepayService,SettleService,AlterRepayDateService,RefundService,modal,
                                                RemissionService,ExtendPeriodService,OtherFeeService,CollectionService,AlterCustInfoService,InsManageService,TelInterviewService,SmsService,ProductService,SysDictService,OfferService) {
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
            LoanQueryService.getLoanCustRepayPlanList($stateParams.appId).then(function(response){
                $scope.repayPlanList = response;
                $scope.totalCapital=0.00;
                $scope.totalInterest=0.00;
                $scope.repayingCapital=0.00;
                $scope.repayingInterest=0.00;
                $scope.repayingOverdue=0.00;
                for(var i = 0 ; i<$scope.repayPlanList.length;i++){
                    var item = $scope.repayPlanList[i];
                    $scope.totalCapital+= item.repayCapital;
                    $scope.totalInterest+=item.repayInterest;
                    if(item.watingCharge!=null){
                        $scope.repayingCapital+=item.watingCharge.repayCapital;
                        $scope.repayingInterest+=item.watingCharge.repayInterest;
                        $scope.repayingOverdue+=item.watingCharge.repayOverdueAmount;
                    }
                }
                $scope.totalCapital = $scope.totalCapital.toFixed(2);
                $scope.totalInterest = $scope.totalInterest.toFixed(2);
                $scope.repayingCapital = $scope.repayingCapital.toFixed(2);
                $scope.repayingInterest = $scope.repayingInterest.toFixed(2);
                $scope.repayingOverdue = $scope.repayingOverdue.toFixed(2);
            });
            $scope.doInitApplyEdit($stateParams.appId);
            $scope.baseInfoVo = LoanQueryService.getLoanCustApplyInfo($scope.appId).$object;
        };
        $scope.pageChanged = function(){
            $scope.queryLoanCustList();
        }
        $scope.repayLogPageChanged = function(){
            $scope.repayLogList =LoanQueryService.getLoanCustRepayLog($stateParams.appId).$object;
        }
        $scope.queryRepayLog = function(){
            $rootScope.resetCache();
            $scope.repayLogList =LoanQueryService.getLoanCustRepayLog($stateParams.appId).$object;
        };

        $scope.queryChargeLog = function(){
            $scope.chargeLogList = LoanQueryService.getLoanCustChargeLog($stateParams.appId).$object;
        };

        $scope.queryOtherFeeList = function(){
            $scope.otherFeeList = LoanQueryService.getOtherFeeList($stateParams.appId).$object;
        };
        $scope.queryRefundLog = function(){
            $scope.refundLogList = LoanQueryService.getRefundLog($stateParams.appId).$object;
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
        $scope.doOffer = function(){
            OfferService.addOfferApply($stateParams.appId);
        }
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
                $scope.initLoanDetail();
            })
        };
        $scope.doAlterColesseeInfo = function(){
            if($scope.applyInfo.cloessee.type ==null){
                modal.error("申请单未录入共租人");
                return;
            }
            AlterCustInfoService.doAlterColesseeInfo($stateParams.appId,$scope.applyInfo).then(function(response){
                toaster.pop('success', '操作提醒', '提交变更成功');
                $scope.initLoanDetail();
            })
        };
        $scope.doAlterLinkmanInfo = function(){
            AlterCustInfoService.doAlterLinkmanInfo($stateParams.appId,$scope.applyInfo).then(function(response){
                toaster.pop('success', '操作提醒', '提交变更成功');
                $scope.initLoanDetail();
            })
        };
        $scope.doAlterBankInfo = function(){
            AlterCustInfoService.doAlterBankInfo($stateParams.appId).then(function(response){
                toaster.pop('success', '操作提醒', '提交变更成功');
                $scope.initLoanDetail();
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
        };
        $scope.getImportantCollectionLog = function(){
            $scope.collectionLogCntMap = CollectionService.getCollectionTaskCnt($scope.appId).$object;
            $scope.importanCollectionLogList = CollectionService.getImportanCollectionLogInfo($scope.appId).$object;
        };
        $scope.getCollectionLog = function(taskType){
            $scope.collectionLogList = CollectionService.getCollectionLogInfo($scope.appId,taskType).$object;
        };
        $scope.getTelIncomeHisList = function(){
            $scope.telIncomeHisList = TelInterviewService.getTelIncomeLogList($scope.appId).$object;
        }
        //查询客户信息变更记录
        $scope.getAlterInfoLogList = function(){
            $scope.alterInfoLogList = AlterCustInfoService.getAlterInfoLogList($scope.appId).$object;
        }
        //查询客户信息变更明细
        $scope.showAlterCustInfoLogDetail = function(logId){
            AlterCustInfoService.showAlterCustInfoLogDetail(logId);
        }
    })
;