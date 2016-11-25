'use strict';

/* Controllers */
// signin controllers
angular.module("pu.alterrepaydate.controllers")
    .controller('AlterRepayDateController',function ($scope, $rootScope, $state,$stateParams ,toaster, $uibModal,LoanQueryService,AlterRepayDateService,SysDictService,ToolsService) {
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
            AlterRepayDateService.commitApproveAlterRepayDateTask($scope.taskId,$scope.approveVo).then(function(response){
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
            $scope.applyVo = AlterRepayDateService.getApplyAlterRepayDateTaskById($scope.businessKey).$object
            $scope.approveVo={};
            $scope.approveList = SysDictService.queryDictDataByTypeCode("fkspjglx").$object;
        };
        $scope.commitConfirmAlterRepayDateTask = function(){
            AlterRepayDateService.commitConfirmAlterRepayDateTask($scope.taskId).then(function(response){
                toaster.pop('success', '操作提醒', "提交任务成功");
                $state.go("app.loantask.todolist")
            })
        }


    })
;