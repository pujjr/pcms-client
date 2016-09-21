'use strict';

/* Controllers */
// signin controllers
angular.module("pu.apply.controllers")
    .controller('CheckController',function ($scope, $rootScope, $state,$stateParams, toaster, $uibModal,CheckService,TaskService) {
        $scope.initCheck = function(){
            $scope.doInitApplyEdit($stateParams.businessKey);
            $scope.task = TaskService.queryTaskByTaskId($stateParams.taskId).$object;
        };
        $scope.commitCheckTask = function(){
            CheckService.commitCheckTask($scope.applyInfo,$stateParams.taskId).then(function(response){
                $state.go('app.task.todolist');
                toaster.pop('success', '操作提醒','提交审核任务成功')
            })
        };
        $scope.saveCheckInfo = function(){

        }
    })
;