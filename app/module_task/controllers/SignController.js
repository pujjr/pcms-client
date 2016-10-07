'use strict';

/* Controllers */
// signin controllers
angular.module("pu.task.controllers")
    .controller('SignController',function ($scope, $rootScope, $state,$stateParams, toaster, $uibModal,TaskService,GpsService,BankService) {
        $scope.initSign = function(){
            $scope.doInitApplyEdit($stateParams.businessKey);
            $scope.task = TaskService.queryTaskByTaskId($stateParams.taskId).$object;
            $scope.gpsSupplierList = GpsService.queryGpsSupplierList(true).$object;
            $scope.unionPayBankList = BankService.queryUnionPayBankInfoList().$object;
            $scope.signContractVo = TaskService.querySignInfo($stateParams.businessKey).$object;
        };
        $scope.commitSignContractTask = function(){
            TaskService.commitSignContractTask($scope.signContractVo,$stateParams.taskId).then(function(response){
                $state.go('app.task.todolist');
                toaster.pop('success', '操作提醒','提交签约任务成功')
            })
        };
    })
;