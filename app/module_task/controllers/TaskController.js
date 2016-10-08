'use strict';

/* Controllers */
// signin controllers
angular.module("pu.task.controllers")
    .controller('TaskController',function ($scope, $rootScope, $state, toaster, $uibModal,TaskService) {
        $scope.backTask = function(taskId){
            TaskService.backTask(taskId).then(function(response){
                $state.go('app.task.todolist');
                toaster.pop('success', '操作提醒','提交退回任务成功')
            })
        };
        $scope.queryWorkflowProcessResult = function(taskId){
            $scope.workflowProcessResultList = TaskService.queryWorkflowProcessResult(taskId).$object;
        }
    })
;