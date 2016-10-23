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
        };
        /**初始化重新申请文件目录**/
        $scope.initReApplyFileManage=function(appId){
            $scope.reApplyFileInterface.init(appId,"apply");
        };
        $scope.initReApplyFileComponent = function(fileInterface){
            $scope.reApplyFileInterface = fileInterface;
        };
        /**初始化审核文件目录**/
        $scope.initCheckFileManage=function(appId){
            $scope.checkFileInterface.init(appId,"check");
        };
        $scope.initCheckFileComponent = function(fileInterface){
            $scope.checkFileInterface = fileInterface;
        };
        /*初始化签约文件目录*/
        $scope.initSignFileManage=function(appId){
            $scope.signFileInterface.init(appId,"sign");
        };
        $scope.initSignFileComponent = function(fileInterface){
            $scope.signFileInterface = fileInterface;
        };
        /**初始化放款复核文件目录**/
        $scope.initLoanCheckFileManage=function(appId){
            $scope.loanCheckFileInterface.init(appId,"loancheck");
        };
        $scope.initLoanCheckFileComponent = function(fileInterface){
            $scope.loanCheckFileInterface = fileInterface;
        };

    })
;