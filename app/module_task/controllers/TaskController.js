'use strict';

/* Controllers */
// signin controllers
angular.module("pu.task.controllers")
    .controller('TaskController',function ($scope, $rootScope, $state, toaster, $uibModal,TaskService) {
        $scope.queryToDoTaskList = function(){
            $scope.toDoTaskList = TaskService.queryToDoTaskList().$object;
        };
        $scope.doTask = function(item){
            $state.go(
                item.taskRouter,
                    {
                        "businessKey":item.businessKey,
                        "procInstId":item.procInstId,
                        "taskId":item.taskId
                    }
            )
        }

    })
;