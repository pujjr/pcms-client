'use strict';

/* Controllers */
angular.module("pu.task.controllers")
    .controller('LoanController',function ($scope, $rootScope, $state, toaster, $uibModal,modal,TaskService,BankService,SysBranchService) {
        $scope.queryParam={};
        $scope.init = function(){
            $scope.selectAllStatus =false;
            $scope.queryWaitLoanTaskList();
        }
        $scope.branchList = SysBranchService.getDealerTreeList().$object;
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
        $scope.checkLoanningAll = function(){
            $scope.selectAllStatus = !$scope.selectAllStatus;
            angular.forEach($scope.loaningTaskList,function(item){
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
            if(checkList.length==0){
                modal.error("未选择记录");
            }else{
                modal.confirm("操作提醒","确认放款？").then(function(){
                    TaskService.batchDoLoanTask(checkList).then(function(response){
                        toaster.pop('success', '操作提醒','添加放款任务成功');
                        $scope.init();
                    })
                })
            }
        };
        $scope.batchConfirmLoanTask = function(){
            var checkList = [];
            angular.forEach($scope.loaningTaskList,function(item){
                if(item.checked){
                    checkList.push({'taskId':item.taskId,'appId':item.businessKey});
                }
            });
            if(checkList.length==0){
                modal.error("未选择记录");
            }else{
                modal.confirm("操作提醒","确认提交放款").then(function(){
                    BankService.selectBankAcct("yhzhyt01").then(function(response){
                        TaskService.batchCommitLoanTask(response.id,checkList).then(function(response){
                            toaster.pop('success', '操作提醒','确认放款成功');
                            $scope.queryLoaningTaskList();
                        })
                    })
                })
            }
        };
        $scope.commitLoanTask = function(item){
            modal.confirm("操作提醒","确认提交放款").then(function(){
                BankService.selectBankAcct("yhzhyt01").then(function(response){
                    $scope.loading = TaskService.commitLoanTask(response.id,item.taskId,item.businessKey).then(function(response){
                        toaster.pop('success', '操作提醒','确认放款成功');
                        $scope.queryLoaningTaskList();
                    })
                })
            })
        }

    })
;