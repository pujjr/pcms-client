'use strict';

/* Controllers */
// signin controllers
angular.module("pu.task.controllers")
    .controller('ToDoTaskController',function ($scope, $rootScope, $state, toaster, $uibModal,TaskService) {
        $scope.queryParam={};
        $scope.init = function(){
            $scope.queryToDoTaskList($scope.queryParam);
            $rootScope.vm.inTaskDefKeys="";
            $scope.taskDefinGroupList = TaskService.getUserTaskDefineGroupInfo({outTaskDefKeys:'sgfd,fk'}).$object;
        };
        $scope.pageChanged = function(){
            $scope.queryToDoTaskList({});
        }
        $scope.queryToDoTaskList = function(params){
            angular.extend(params, {outTaskDefKeys:'sgfd,fk'});
            $scope.loading = TaskService.queryToDoTaskList(params).then(function(response){
               $scope.toDoTaskList = response;
           });
        };
        $scope.queryToDoTaskFilterByDefKey = function(item){
            $rootScope.resetCache();
            var params = {inTaskDefKeys:item.taskDefKey};
            angular.extend(params, {outTaskDefKeys:'sgfd,fk'});
            $scope.loading = TaskService.queryToDoTaskList(params).then(function(response){
                $scope.toDoTaskList = response;
            });
        };
        $scope.queryToDoTaskListByFilter = function(){
            $rootScope.resetPage();
            $scope.queryToDoTaskList($scope.queryParam);
        }
        $scope.doTask = function(item){
            $state.go(
                item.taskRouter,
                    {
                        "businessKey":item.businessKey,
                        "procInstId":item.procInstId,
                        "taskId":item.taskId
                    }
            )
        };
        //执行变更申请
        $scope.doChangeApply=function(item){
            $state.go(
                "app.task.process.changeapplyinfo",
                {
                    "businessKey":item.businessKey,
                    "procInstId":item.procInstId,
                    "taskId":item.taskId
                }
            )
        }
        //执行取消申请
        $scope.doCancelApply=function(item){
            $state.go(
                "app.task.process.cancelapplyinfo",
                {
                    "businessKey":item.businessKey,
                    "procInstId":item.procInstId,
                    "taskId":item.taskId
                }
            )
        }
    })
;