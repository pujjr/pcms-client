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
        $scope.initReApplyFileManage=function(appId,categoryKey){
            $scope.reApplyFileInterface.init(appId,categoryKey);
        };
        $scope.initReApplyFileComponent = function(fileInterface){
            $scope.reApplyFileInterface = fileInterface;
        };
        /**初始化审核文件目录**/
        $scope.initCheckFileManage=function(appId,categoryKey){
            $scope.checkFileInterface.init(appId,categoryKey);
        };
        $scope.initCheckFileComponent = function(fileInterface){
            $scope.checkFileInterface = fileInterface;
        };

    })
;