'use strict';

/* Controllers */
angular.module("pu.task.controllers")
    .controller('LoanController',function ($scope, $rootScope, $state, toaster, $uibModal,TaskService) {
        $scope.queryParam={};
        $scope.init = function(){
            $scope.selectAllStatus =false;
            $scope.queryWaitLoanTaskList();
        }
        //查询待放款的任务
        $scope.queryWaitLoanTaskList = function(){
            var params={inTaskDefKeys:'fk',appStatus:'sqdzt11'}
           $scope.waitLoanTaskList = TaskService.queryToDoTaskList(params).$object;
        };
        $scope.queryWaitLoanFilter = function(){
            var params={inTaskDefKeys:'fk',appStatus:'sqdzt11'}
            angular.extend($scope.queryParam,params);
            $scope.waitLoanTaskList = TaskService.queryToDoTaskList($scope.queryParam).$object;
        }
        //查询放款中的任务
        $scope.queryLoaningTaskList = function(){
            var params={inTaskDefKeys:'fk',appStatus:'sqdzt12'}
            $scope.loaningTaskList = TaskService.queryToDoTaskList(params).$object;
        }
        $scope.checkAll = function(){
            $scope.selectAllStatus = !$scope.selectAllStatus;
            angular.forEach($scope.waitLoanTaskList,function(item){
                item.checked = $scope.selectAllStatus;
            })
        };
        $scope.batchDoLoanTask = function(){
            var checkList = [];
            angular.forEach($scope.waitLoanTaskList,function(item){
                if(item.checked){
                    checkList.push(item);
                }
            });
            TaskService.batchDoLoanTask(checkList).then(function(response){
                toaster.pop('success', '操作提醒','添加放款任务成功');
                $scope.init();
            })

        }

    })
;