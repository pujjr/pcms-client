'use strict';

/* Controllers */
// signin controllers
angular.module("pu.otherfee.controllers")
    .controller('OtherFeeController',function ($scope, $rootScope, $state,$stateParams ,toaster, $uibModal,LoanQueryService,LoanTaskService,OtherFeeService,SysDictService,ToolsService) {
        $scope.initOtherFeeHistoryTaskList = function(){
            $scope.taskList = OtherFeeService.getApplyOtherFeeTaskList().$object;
        };
        $scope.showOtherFeeTaskDetail = function(item){
            OtherFeeService.showOtherFeeTaskDetail(item);
        }
        $scope.initApplyApprove = function(){
            $scope.procInstId = $stateParams.procInstId;
            $scope.taskId = $stateParams.taskId;
            $scope.businessKey = $stateParams.businessKey;
            $scope.appId = $stateParams.appId;
            $scope.workflowKey = $stateParams.workflowKey;
            $scope.task = LoanQueryService.getTaskByTaskId($stateParams.taskId,$stateParams.workflowKey).$object;
            $scope.baseInfoVo = LoanQueryService.getLoanCustApplyInfo($scope.appId).$object;
            $scope.applyVo = OtherFeeService.getApplyOtherFeeTaskById($scope.businessKey).$object
            $scope.approveVo={};
            $scope.approveList = SysDictService.queryDictDataByTypeCode("fkspjglx").$object;
        };
        $scope.commitApproveOtherFeeTask = function(){
            LoanTaskService.inputApproveResult().then(function(response){
                OtherFeeService.commitApproveOtherFeeTask($scope.taskId,response).then(function(response){
                    toaster.pop('success', '操作提醒', "提交任务成功");
                    $state.go("app.loantask.todolist")
                })
            })
        };
    })
;