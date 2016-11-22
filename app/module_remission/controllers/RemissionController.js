'use strict';

/* Controllers */
// signin controllers
angular.module("pu.remission.controllers")
    .controller('RemissionController',function ($scope, $rootScope, $state,$stateParams ,toaster, $uibModal,LoanQueryService,RefundService,SysDictService,ToolsService) {
        $scope.initRefundHistoryTaskList = function(){
            $scope.taskList = RefundService.getApplyRefundTaskList().$object;
        };
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
            RefundService.commitApproveRefundTask($scope.taskId,$scope.approveVo).then(function(response){
                toaster.pop('success', '操作提醒', "提交任务成功");
                $state.go("app.loantask.todolist")
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
            RefundService.commitConfirmRefundTask($scope.taskId).then(function(response){
                toaster.pop('success', '操作提醒', "提交任务成功");
                $state.go("app.loantask.todolist")
            })
        }


    })
;