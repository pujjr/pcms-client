'use strict';

/* Controllers */
angular.module("pu.task.controllers")
    .controller('LoanController',function ($scope, $rootScope, $state, toaster, $uibModal,modal,TaskService,BankService,SysBranchService) {
        $scope.queryParam={};
        $scope.init = function(){
            $scope.selectAllStatus =false;
            $scope.queryWaitLoanTaskList();
        }
         $scope.branchList = SysBranchService.getEffectDealerList().$object;
        //查询待放款的任务
        $scope.queryWaitLoanTaskList = function(){
            var params={inTaskDefKeys:'fk',appStatus:'sqdzt11'}
           $scope.loading = TaskService.queryToDoTaskList(params).then(function(response){
               $scope.waitLoanTaskList = response;
           });
        };
        //通过过滤条件查询目前待放款的任务
        $scope.queryWaitLoanFilter = function(){
            var params={inTaskDefKeys:'fk',appStatus:'sqdzt11'}
            angular.extend($scope.queryParam,params);
            $scope.loading = TaskService.queryToDoTaskList($scope.queryParam).then(function(response){
                $scope.waitLoanTaskList = response;
            });
        }
        //查询放款中的任务
        $scope.queryLoaningTaskList = function(){
            var params={inTaskDefKeys:'fk',appStatus:'sqdzt12'}
            $scope.loading = TaskService.queryToDoTaskList(params).then(function(response){
                $scope.loaningTaskList = response;
            });
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
                BankService.selectBankAcct("yhzhyt01").then(function(response){
                    modal.confirm("操作提醒","确认提交放款").then(function(){
                        $scope.loading = TaskService.batchCommitLoanTask(response.id,checkList).then(function(response){
                            toaster.pop('success', '操作提醒','确认放款成功');
                            $scope.queryLoaningTaskList();
                        })
                    })
                })
            }
        };
        $scope.commitLoanTask = function(item){
            BankService.selectBankAcct("yhzhyt01").then(function(response){
                modal.confirm("操作提醒","确认提交放款").then(function(){
                    $scope.loading = TaskService.commitLoanTask(response.id,item.taskId,item.businessKey).then(function(response){
                        toaster.pop('success', '操作提醒','确认放款成功');
                        $scope.queryLoaningTaskList();
                    })

                })
            })
        };
        $scope.exportWaitingLoanReport = function(){
            $scope.loading = TaskService.exportWaitingLoanReport().then(function(response){
                var ossKey = response.ossKey;
                var link = document.createElement('a');
                link.href=SERVER_URL.OSS_URL+ossKey;
                link.click();
                window.URL.revokeObjectURL(link.href);
            })
        }

    })
;