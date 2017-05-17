'use strict';

/* Controllers */
// signin controllers
angular.module("pu.remission.controllers")
    .controller('RemissionController',function ($scope, $rootScope, $state,$stateParams ,toaster, $uibModal,LoanQueryService,LoanTaskService,RemissionService,SysDictService,ToolsService) {
        $scope.initRemissionHistoryTaskList = function(){
            $scope.taskList = RemissionService.getApplyRemissionTaskList().$object;
        };
        $scope.showRemissionTaskDetail = function(item){
            RemissionService.showRemissionTaskDetail(item);
        }
        $scope.initApplyApprove = function(){
            $scope.procInstId = $stateParams.procInstId;
            $scope.taskId = $stateParams.taskId;
            $scope.businessKey = $stateParams.businessKey;
            $scope.appId = $stateParams.appId;
            $scope.workflowKey = $stateParams.workflowKey;
            $scope.task = LoanQueryService.getTaskByTaskId($stateParams.taskId,$stateParams.workflowKey).$object;
            $scope.baseInfoVo = LoanQueryService.getLoanCustApplyInfo($scope.appId).$object;
            $scope.applyVo = RemissionService.getApplyRemissionTaskById($scope.businessKey).$object;
            LoanQueryService.getLoanCustNeedRepayInfo($scope.appId).then(function(response){
                $scope.applyVo.feeItem = response;
            })
        };
        $scope.commitApproveRemissionTask = function(){
            LoanTaskService.inputApproveResult().then(function(response){
                RemissionService.commitApproveRemissionTask($scope.taskId,response).then(function(response){
                    toaster.pop('success', '操作提醒', "提交任务成功");
                    $state.go("app.loantask.todolist")
                })
            })
        };


    })
;