'use strict';

/* Controllers */
// signin controllers
angular.module("pu.task.controllers")
    .controller('ToDoTaskController',function ($scope, $rootScope, $state, toaster, $uibModal,TaskService) {
        $scope.queryParam={};
        $scope.init = function(){
            $scope.queryToDoTaskList($scope.queryParam);
        };
        $scope.pageChanged = function(){
            $scope.init();
        }
        $scope.queryToDoTaskList = function(params){
            angular.extend(params, {outTaskDefKeys:'sgfd,fk'});
            $scope.toDoTaskList = TaskService.queryToDoTaskList(params).$object;
            $scope.taskDefinGroupList = TaskService.getUserTaskDefineGroupInfo({outTaskDefKeys:'sgfd,fk'}).$object;
        };
        $scope.queryToDoTaskFilterByDefKey = function(item){
            $scope.queryToDoTaskList({inTaskDefKeys:item.taskDefKey});
        };
        $scope.queryToDoTaskListByFilter = function(){
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