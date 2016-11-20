'use strict';

/* Controllers */
// signin controllers
angular.module("pu.settle.controllers")
    .controller('SettleController',function ($scope, $rootScope, $state,$stateParams ,toaster, $uibModal,LoanQueryService,SettleService,SysDictService) {
        $scope.initSettleHistoryTaskList = function(){
            $scope.settleApplyList = SettleService.getApplySettleTaskList("jqlx01").$object;
        };
        $scope.initApplyApprove = function(){
            $scope.procInstId = $stateParams.procInstId;
            $scope.taskId = $stateParams.taskId;
            $scope.businessKey = $stateParams.businessKey;
            $scope.appId = $stateParams.appId;
            $scope.workflowKey = $stateParams.workflowKey;
            $scope.task = LoanQueryService.getTaskByTaskId($stateParams.taskId,$stateParams.workflowKey).$object;
            $scope.baseInfoVo = LoanQueryService.getLoanCustApplyInfo($scope.appId).$object;
            $scope.applyVo = SettleService.getApplySettleInfo($scope.businessKey).$object
            $scope.approveVo={};
            $scope.approveList = SysDictService.queryDictDataByTypeCode("fkspjglx").$object;
        };
        $scope.commitApproveSettleTask = function(){
            SettleService.commitApproveSettleTask($scope.taskId,$scope.approveVo).then(function(response){
                toaster.pop('success', '操作提醒', "提交任务成功");
                $state.go("app.loantask.todolist")
            })
        } ;
        $scope.initApplyConfirm = function(){
            $scope.procInstId = $stateParams.procInstId;
            $scope.taskId = $stateParams.taskId;
            $scope.businessKey = $stateParams.businessKey;
            $scope.appId = $stateParams.appId;
            $scope.workflowKey = $stateParams.workflowKey;
            $scope.task = LoanQueryService.getTaskByTaskId($stateParams.taskId,$stateParams.workflowKey).$object;
            $scope.baseInfoVo = LoanQueryService.getLoanCustApplyInfo($scope.appId).$object;
            $scope.applyVo = SettleService.getApplySettleInfo($scope.businessKey).$object
            $scope.remissionFeeItemVo={};
        };
        $scope.commitApplyConfirmSettleTask = function(){
            SettleService.commitApplyConfirmSettleTask($scope.taskId,$scope.applyVo.remissionFeeItemVo).then(function(response){
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
            $scope.applyVo = SettleService.getApplySettleInfo($scope.businessKey).$object;
            $scope.approveVo={};
            $scope.approveList = SysDictService.queryDictDataByTypeCode("fkspjglx").$object;
        };
        $scope.commitConfirm = function(){

        }


    })
;