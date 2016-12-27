'use strict';

/* Controllers */
// signin controllers
angular.module("pu.task.controllers")
    .controller('ReconsiderController',function ($scope, $rootScope, $state,$stateParams, toaster, $uibModal,TaskService,SysDictService,modal) {
        $scope.taskId = $stateParams.taskId;
        $scope.businessKey = $stateParams.businessKey;
        $scope.initReconsiderApply = function(){
            $scope.doInitApplyEdit($stateParams.businessKey);
            $scope.task = TaskService.queryTaskByTaskId($stateParams.taskId).$object;
            $scope.reconsiderApplyVo = TaskService.queryReconsiderApplyInfo($stateParams.taskId).$object;
            $scope.reconsiderReasonList = SysDictService.queryDictDataByTypeCode("fyyy").$object;
        };
        $scope.commitReconsiderApply = function(){
            modal.confirm("操作提醒","确认提交任务？").then(function(){
                TaskService.commitReconsiderApply($scope.reconsiderApplyVo,$stateParams.businessKey,$stateParams.taskId).then(function(response){
                    $state.go('app.task.todolist');
                    toaster.pop('success', '操作提醒','提交复议申请成功')
                })
            })
        };
        $scope.initReconsiderApprove = function(){
            $scope.doInitApplyEdit($stateParams.businessKey);
            $scope.task = TaskService.queryTaskByTaskId($stateParams.taskId).$object;
            $scope.reconsiderApproveVo = TaskService.queryReconsiderApproveInfo($stateParams.businessKey).$object;
            $scope.reconsiderReasonList = SysDictService.queryDictDataByTypeCode("fyyy").$object;
            $scope.reconsiderApproveResultList = SysDictService.queryDictDataByTypeCode("fyspjg").$object;
        };
        $scope.commitReconsiderApprove = function(){
            modal.confirm("操作提醒","确认提交任务？").then(function(){
                TaskService.commitReconsiderApproveTask($scope.reconsiderApproveVo,$stateParams.taskId).then(function(response){
                    $state.go('app.task.todolist');
                    toaster.pop('success', '操作提醒','提交复议审批成功')
                })
            })
        };
    })
;