'use strict';

/* Controllers */
// signin controllers
angular.module("pu.loantask.controllers")
    .controller('LoanTaskController',function ($scope, $rootScope, $state,$stateParams, toaster, $uibModal,LoanTaskService) {
        $scope.initList = function(){
            $scope.toDoTaskList  = LoanTaskService.getLoanToDoTaskList().$object;
        };
        $scope.queryToDoTaskList = function(){
            $rootScope.resetPage();
            $scope.loading = LoanTaskService.getLoanToDoTaskList().then(function(response){
                $scope.toDoTaskList = response;
            });
        }
        $scope.doTask = function(item){
            $state.go(
                item.taskRouter,
                {
                    "businessKey":item.businessKey,
                    "procInstId":item.procInstId,
                    "taskId":item.taskId,
                    "appId":item.appId,
                    "workflowKey":item.workflowKey
                }
            )
        };
        $scope.pageChanged = function(){
            $scope.initList();
        }
    })
;