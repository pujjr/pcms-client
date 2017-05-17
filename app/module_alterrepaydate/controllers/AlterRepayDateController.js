'use strict';

/* Controllers */
// signin controllers
angular.module("pu.alterrepaydate.controllers")
    .controller('AlterRepayDateController',function ($scope, $rootScope, $state,$stateParams ,toaster, $uibModal,LoanQueryService,LoanTaskService,AlterRepayDateService,SysDictService,ToolsService,modal) {
        $scope.initAlterRepayDateHistoryTaskList = function(){
            $scope.taskList = AlterRepayDateService.getApplyAlterRepayDateTaskList().$object;
        };
        $scope.showAlterRepayDateTaskDetail = function(item){
            AlterRepayDateService.showAlterRepayDateTaskDetail(item);
        }
        $scope.initApplyApprove = function(){
            $scope.procInstId = $stateParams.procInstId;
            $scope.taskId = $stateParams.taskId;
            $scope.businessKey = $stateParams.businessKey;
            $scope.appId = $stateParams.appId;
            $scope.workflowKey = $stateParams.workflowKey;
            $scope.task = LoanQueryService.getTaskByTaskId($stateParams.taskId,$stateParams.workflowKey).$object;
            $scope.baseInfoVo = LoanQueryService.getLoanCustApplyInfo($scope.appId).$object;
            $scope.applyVo = AlterRepayDateService.getApplyAlterRepayDateTaskById($scope.businessKey).$object
            $scope.approveVo={};
            $scope.approveList = SysDictService.queryDictDataByTypeCode("fkspjglx").$object;
        };
        $scope.commitApproveAlterRepayDateTask = function(){
            LoanTaskService.inputApproveResult().then(function(response){
                AlterRepayDateService.commitApproveAlterRepayDateTask($scope.taskId,response).then(function(response){
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
            $scope.applyVo = AlterRepayDateService.getApplyAlterRepayDateTaskById($scope.businessKey).$object
            $scope.approveVo={};
            $scope.approveList = SysDictService.queryDictDataByTypeCode("fkspjglx").$object;
        };
        $scope.commitConfirmAlterRepayDateTask = function(){
            modal.confirm("操作提醒","确认提交任务？").then(function(){
                AlterRepayDateService.commitConfirmAlterRepayDateTask($scope.taskId).then(function(response){
                    toaster.pop('success', '操作提醒', "提交任务成功");
                    $state.go("app.loantask.todolist")
                })
            })
        }
        $scope.cancelAlterRepayDateTask = function(){
            modal.prompt("取消变更还款日任务","请输入取消备注").then(function(response){
                AlterRepayDateService.cancelAlterRepayDateTask($scope.taskId,response).then(function(){
                    toaster.pop('success', '操作提醒', "取消任务成功");
                    $state.go("app.loantask.todolist")
                })
            })
        }

    })
;