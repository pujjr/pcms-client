'use strict';

/* Controllers */
// signin controllers
angular.module("pu.task.controllers")
    .controller('SupplyLoanCheckInfoController',function ($scope, $rootScope, $state,$stateParams, toaster, $uibModal,TaskService,GpsService,BankService,modal) {
        $scope.initSupplyLoanCheckInfo = function(){
            $scope.doInitApplyEdit($stateParams.businessKey);
            $scope.task = TaskService.queryTaskByTaskId($stateParams.taskId).$object;
            $scope.gpsSupplierList = GpsService.queryGpsSupplierList(true).$object;
            $scope.unionPayBankList = BankService.queryUnionPayBankInfoList().$object;
            $scope.signContractVo = TaskService.querySignInfo($stateParams.businessKey).$object;
        };
        $scope.saveSignContractInfo = function(){
            TaskService.saveSignContractInfo($scope.signContractVo).then(function(response){
                toaster.pop('success', '操作提醒','保存签约信息成功');
            })
        };
        $scope.commitSupplyLoanCheckTask = function(){
            modal.confirm("操作提醒","确认提交任务？").then(function(){
                TaskService.commitSupplyLoanCheckTask($stateParams.taskId).then(function(response){
                    $state.go('app.task.todolist');
                    toaster.pop('success', '操作提醒','提交补充放款资料任务成功')
                })
            })
        };
    })
;