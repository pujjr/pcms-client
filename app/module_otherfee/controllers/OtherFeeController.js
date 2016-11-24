'use strict';

/* Controllers */
// signin controllers
angular.module("pu.otherfee.controllers")
    .controller('OtherFeeController',function ($scope, $rootScope, $state,$stateParams ,toaster, $uibModal,LoanQueryService,OtherFeeService,SysDictService,ToolsService) {
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
            $scope.applyVo = OtherFeeService.getApplyOtherFeeTaskById($scope.businessKey).$object
            $scope.approveVo={};
            $scope.approveList = SysDictService.queryDictDataByTypeCode("fkspjglx").$object;
        };
        $scope.commitApproveOtherFeeTask = function(){
            RefundService.commitApproveRefundTask($scope.taskId,$scope.approveVo).then(function(response){
                toaster.pop('success', '操作提醒', "提交任务成功");
                $state.go("app.loantask.todolist")
            })
        };
    })
;