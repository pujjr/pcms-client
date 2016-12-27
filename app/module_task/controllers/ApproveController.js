'use strict';

/* Controllers */
// signin controllers
angular.module("pu.task.controllers")
    .controller('ApproveController',function ($scope, $rootScope, $state,$stateParams, toaster, $uibModal,TaskService,SysDictService,modal) {
        $scope.taskId = $stateParams.taskId;
        $scope.businessKey = $stateParams.businessKey;
        $scope.initApprove = function(){
            $scope.doInitApplyEdit($stateParams.businessKey);
            $scope.task = TaskService.queryTaskByTaskId($stateParams.taskId).$object;
            $scope.approveList = SysDictService.queryDictDataByTypeCode("sprwjglx").$object;
            $scope.approveRejectReasonList =  SysDictService.queryDictDataByTypeCode("spjjyy").$object;
            $scope.approveCancelReasonList =  SysDictService.queryDictDataByTypeCode("spqxyy").$object;
            $scope.queryFraudInnerResult($stateParams.businessKey);
            $scope.approveVo = {};
        };
        $scope.commitApproveTask = function(){
            modal.confirm("操作提醒","确认提交申请？").then(function(){
                TaskService.commitApproveTask($scope.applyInfo,$scope.approveVo,$stateParams.taskId).then(function(response){
                    $state.go('app.task.todolist');
                    toaster.pop('success', '操作提醒','提交审批任务成功')
                })
            })
        };
        /**初始化审贷会审批 **/
        $scope.initCounterSignApprove = function(){
            $scope.doInitApplyEdit($stateParams.businessKey);
            $scope.task = TaskService.queryTaskByTaskId($stateParams.taskId).$object;
            $scope.approveList = SysDictService.queryDictDataByTypeCode("sdhjg").$object;
            $scope.queryFraudInnerResult($stateParams.businessKey);
            $scope.approveVo = {};
        };
        $scope.commitCounterSignApprove = function(){
            modal.confirm("操作提醒","确认提交申请?").then(function(){
                TaskService.commitCounterSignApprove($scope.taskId,$scope.approveVo).then(function(){
                    $state.go('app.task.todolist');
                    toaster.pop('success', '操作提醒','提交审批任务成功')
                })
            })
        }

    })
;