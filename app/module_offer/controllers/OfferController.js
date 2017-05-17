'use strict';

/* Controllers */
// signin controllers
angular.module("pu.offer.controllers")
    .controller('OfferController',function ($scope, $rootScope, $state,$stateParams ,toaster, $uibModal,LoanQueryService,LoanTaskService,OfferService,SysDictService,ApplyService,modal) {
        $scope.initOfferHistoryTaskList = function(){
            $scope.offerApplyList = OfferService.getApplyOfferTaskList().$object;
        };
        $scope.showOfferTaskDetail = function(item){
            OfferService.showOfferTaskDetail(item);
        }
        $scope.initApplyApprove = function(){
            $scope.procInstId = $stateParams.procInstId;
            $scope.taskId = $stateParams.taskId;
            $scope.businessKey = $stateParams.businessKey;
            $scope.appId = $stateParams.appId;
            $scope.workflowKey = $stateParams.workflowKey;
            $scope.baseInfoVo = LoanQueryService.getLoanCustApplyInfo($scope.appId).$object;
            $scope.applyInfo = ApplyService.queryApplyInfoByAppId($scope.appId).$object;
            $scope.task = LoanQueryService.getTaskByTaskId($stateParams.taskId,$stateParams.workflowKey).$object;
            OfferService.getApplyOfferInfo($scope.businessKey).then(function(response){
                 $scope.applyOfferVo = response;
                $scope.applyOfferVo.totalRepayAmount = ($scope.applyOfferVo.feeItem.repayCapital+
                    $scope.applyOfferVo.feeItem.repayInterest+
                    $scope.applyOfferVo.feeItem.repayOverdueAmount+
                    $scope.applyOfferVo.feeItem.otherAmount+
                    $scope.applyOfferVo.feeItem.otherOverdueAmount).toFixed(2);
            });
            $scope.approveVo={};
            $scope.approveList = SysDictService.queryDictDataByTypeCode("fkspjglx").$object;
        };
        $scope.commitApproveOfferTask = function(){
            LoanTaskService.inputApproveResult().then(function(response){
                OfferService.commitApproveOfferTask($scope.taskId,response).then(function(response){
                    toaster.pop('success', '操作提醒', "提交任务成功");
                    $state.go("app.loantask.todolist")
                })
            });
        }
    });