'use strict';

/* Controllers */
angular.module("pu.assetsmanage.controllers")
    .controller('InsManageController',function ($scope, $rootScope, $state,$stateParams, toaster,modal, $uibModal,InsManageService,LoanQueryService,SysDictService) {
        $scope.initInsuranceContinue = function(){
            $scope.procInstId = $stateParams.procInstId;
            $scope.taskId = $stateParams.taskId;
            $scope.businessKey = $stateParams.businessKey;
            $scope.appId = $stateParams.appId;
            $scope.workflowKey = $stateParams.workflowKey;
            $scope.doInitApplyEdit($stateParams.appId);
            $scope.task = LoanQueryService.getTaskByTaskId($stateParams.taskId,$stateParams.workflowKey).$object;
            $scope.baseInfoVo = LoanQueryService.getLoanCustApplyInfo($scope.appId).$object;
            $scope.insHisList = InsManageService.getInsuranceHisList($scope.appId).$object;
        };
        $scope.addBusinessInsurance = function(item){
            InsManageService.addBusinessInsurance($scope.appId,item.signId,"bxlx02").then(function(response){
                toaster.pop('success', '操作提醒', '新增保险信息成功 ');
                $state.reload();
            })
        };
        $scope.commitInsuranceContinue = function(){
            InsManageService.commitInsuranceContinue($scope.taskId).then(function(response){
                toaster.pop('success', '操作提醒', '提交任务成功 ');
                $state.go('app.loantask.todolist');
            })
        }
    })
;