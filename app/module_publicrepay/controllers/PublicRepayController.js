'use strict';

/* Controllers */
// signin controllers
angular.module("pu.publicrepay.controllers")
    .controller('PublicRepayController',function ($scope, $rootScope, $state,$stateParams ,toaster, $uibModal,LoanQueryService,LoanTaskService,PublicRepayService,SysDictService,ApplyService,modal,BankService) {
        $scope.initPublicRepayHistoryTaskList = function(){
            $scope.publicRepayApplyList = PublicRepayService.getApplyPublicRepayTaskList().$object;
        };
        //任务界面顶部放置下拉按钮
        $scope.appendToEl = angular.element(document.querySelector('.check-header'));
        $scope.showPublicRepayTaskDetail = function(item){
            PublicRepayService.showPublicRepayTaskDetail(item);
        }
        $scope.initApplyApprove = function(){
            $scope.procInstId = $stateParams.procInstId;
            $scope.taskId = $stateParams.taskId;
            $scope.businessKey = $stateParams.businessKey;
            $scope.appId = $stateParams.appId;
            $scope.workflowKey = $stateParams.workflowKey;
            $scope.bankAcctInfoList = BankService.getBankAcctInfoList("yhzhyt02",true).$object;
            $scope.baseInfoVo = LoanQueryService.getLoanCustApplyInfo($scope.appId).$object;
            $scope.applyInfo = ApplyService.queryApplyInfoByAppId($scope.appId).$object;
            $scope.task = LoanQueryService.getTaskByTaskId($stateParams.taskId,$stateParams.workflowKey).$object;
            PublicRepayService.getApplyPublicRepayInfo($scope.businessKey).then(function(response){
                 $scope.applyPublicRepayVo = response;
                $scope.applyPublicRepayVo.totalRepayAmount = ($scope.applyPublicRepayVo.feeItem.repayCapital+
                    $scope.applyPublicRepayVo.feeItem.repayInterest+
                    $scope.applyPublicRepayVo.feeItem.repayOverdueAmount+
                    $scope.applyPublicRepayVo.feeItem.otherAmount+
                    $scope.applyPublicRepayVo.feeItem.otherOverdueAmount).toFixed(2);
            });
            $scope.approveVo={};
            $scope.approveList = SysDictService.queryDictDataByTypeCode("fkspjglx").$object;
        };
        $scope.commitApprovePublicRepayTask = function(){
            LoanTaskService.inputApproveResult().then(function(response){
                PublicRepayService.commitApprovePublicRepayTask($scope.taskId,response).then(function(response){
                    toaster.pop('success', '操作提醒', "提交任务成功");
                    $state.go("app.loantask.todolist")
                })
            })
        }
    });