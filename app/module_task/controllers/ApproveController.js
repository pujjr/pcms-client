'use strict';

/* Controllers */
// signin controllers
angular.module("pu.task.controllers")
    .controller('ApproveController',function ($scope, $rootScope, $state,$stateParams, toaster, $uibModal,TaskService,SysDictService) {
        $scope.initApprove = function(){
            $scope.doInitApplyEdit($stateParams.businessKey);
            $scope.task = TaskService.queryTaskByTaskId($stateParams.taskId).$object;
            $scope.approveList = SysDictService.queryDictDataByTypeCode("sprwjglx").$object;
            $scope.approveVo = {};
        };
        $scope.commitApproveTask = function(){
            TaskService.commitApproveTask($scope.applyInfo,$scope.approveVo,$stateParams.taskId).then(function(response){
                $state.go('app.task.todolist');
                toaster.pop('success', '操作提醒','提交审批任务成功')
            })
        };
    })
;