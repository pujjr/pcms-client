'use strict';

/* Controllers */
// signin controllers
angular.module("pu.task.controllers")
    .controller('ReApplyController',function ($scope, $rootScope, $state,$stateParams, toaster, $uibModal,TaskService,SysDictService) {
        $scope.taskId = $stateParams.taskId;
        $scope.businessKey = $stateParams.businessKey;
        $scope.initReApply = function(){
            $scope.doInitApplyEdit($stateParams.businessKey);
            $scope.task = TaskService.queryTaskByTaskId($stateParams.taskId).$object;
        };
        $scope.commitReApplyTask = function(){
            TaskService.commitReApplyTask($scope.applyInfo,$stateParams.taskId).then(function(response){
                $state.go('app.task.todolist');
                toaster.pop('success', '操作提醒','提交任务成功')
            })
        };

    })
;