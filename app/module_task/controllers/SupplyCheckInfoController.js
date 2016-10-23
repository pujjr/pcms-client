'use strict';

/* Controllers */
// signin controllers
angular.module("pu.task.controllers")
    .controller('SupplyCheckInfoController',function ($scope, $rootScope, $state,$stateParams, toaster, $uibModal,TaskService,SysDictService) {
        $scope.taskId = $stateParams.taskId;
        $scope.businessKey = $stateParams.businessKey;
        $scope.initSupplyCheck = function(){
            $scope.doInitApplyEdit($stateParams.businessKey);
            $scope.task = TaskService.queryTaskByTaskId($stateParams.taskId).$object;
        };
        $scope.commitSupplyCheckTask = function(){
            TaskService.commitSupplyCheckTask($scope.applyInfo,$stateParams.taskId).then(function(response){
                $state.go('app.task.todolist');
                toaster.pop('success', '操作提醒','提交补充审核资料任务成功')
            })
        };

    })
;