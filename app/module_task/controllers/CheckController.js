'use strict';

/* Controllers */
// signin controllers
angular.module("pu.task.controllers")
    .controller('CheckController',function ($scope, $rootScope, $state,$stateParams, toaster, $uibModal,TaskService,SysDictService) {
        $scope.taskId = $stateParams.taskId;
        $scope.businessKey = $stateParams.businessKey;
        $scope.initCheck = function(){
            $scope.doInitApplyEdit($stateParams.businessKey);
            $scope.task = TaskService.queryTaskByTaskId($stateParams.taskId).$object;
            $scope.checkList = SysDictService.queryDictDataByTypeCode("shrwjglx").$object;
            $scope.checkVo = {};
        };
        $scope.commitCheckTask = function(){
            TaskService.commitCheckTask($scope.applyInfo,$scope.checkVo,$stateParams.taskId).then(function(response){
                $state.go('app.task.todolist');
                toaster.pop('success', '操作提醒','提交审核任务成功')
            })
        };
        $scope.saveCheckInfo = function(){

        };
    })
;