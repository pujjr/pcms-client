'use strict';

/* Controllers */
// signin controllers
angular.module("pu.refund.controllers")
    .controller('RefundController',function ($scope, $rootScope, $state,$stateParams ,toaster, modal,$uibModal,LoanQueryService,LoanTaskService,RefundService,SysDictService,ToolsService) {
        $scope.initRefundHistoryTaskList = function(){
            $scope.taskList = RefundService.getApplyRefundTaskList().$object;
        };
        $scope.showRefundTaskDetail = function(item){
            RefundService.showRefundTaskDetail(item);
        }
        $scope.initApplyApprove = function(){
            $scope.procInstId = $stateParams.procInstId;
            $scope.taskId = $stateParams.taskId;
            $scope.businessKey = $stateParams.businessKey;
            $scope.appId = $stateParams.appId;
            $scope.workflowKey = $stateParams.workflowKey;
            $scope.task = LoanQueryService.getTaskByTaskId($stateParams.taskId,$stateParams.workflowKey).$object;
            $scope.baseInfoVo = LoanQueryService.getLoanCustApplyInfo($scope.appId).$object;
            LoanQueryService.getCurrentPeriodRepayPlan($scope.appId).then(function(response){
                $scope.applyVo.closingDate = response.closingDate;
            });
            $scope.applyVo = RefundService.getApplyRefundTaskById($scope.businessKey).$object
            $scope.approveVo={};
            $scope.approveList = SysDictService.queryDictDataByTypeCode("fkspjglx").$object;
        };
        $scope.commitApproveRefundTask = function(){
            LoanTaskService.inputApproveResult().then(function(response){
                RefundService.commitApproveRefundTask($scope.taskId,response).then(function(response){
                    toaster.pop('success', '操作提醒', "提交任务成功");
                    $state.go("app.loantask.todolist")
                })
            })
        };
        $scope.initConfirm = function(){
            $scope.procInstId = $stateParams.procInstId;
            $scope.taskId = $stateParams.taskId;
            $scope.businessKey = $stateParams.businessKey;
            $scope.appId = $stateParams.appId;
            $scope.workflowKey = $stateParams.workflowKey;
            $scope.task = LoanQueryService.getTaskByTaskId($stateParams.taskId,$stateParams.workflowKey).$object;
            $scope.baseInfoVo = LoanQueryService.getLoanCustApplyInfo($scope.appId).$object;
            LoanQueryService.getCurrentPeriodRepayPlan($scope.appId).then(function(response){
                $scope.applyVo.closingDate = response.closingDate;
            });
            $scope.applyVo = RefundService.getApplyRefundTaskById($scope.businessKey).$object
            $scope.approveVo={};
            $scope.approveList = SysDictService.queryDictDataByTypeCode("fkspjglx").$object;
        };
        $scope.commitConfirmRefundTask = function(){
            LoanTaskService.inputApproveResult().then(function(response){
                RefundService.commitConfirmRefundTask($scope.taskId,response).then(function (response) {
                    toaster.pop('success', '操作提醒', "提交任务成功");
                    $state.go("app.loantask.todolist")
                })
            })
        }


    })
;