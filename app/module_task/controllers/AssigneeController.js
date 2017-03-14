'use strict';

/* Controllers */
// signin controllers
angular.module("pu.task.controllers")
    .controller('AssigneeController',function ($scope, $rootScope, $state,$stateParams,modal, toaster, $uibModal,TaskService,SysDictService,SysBranchService) {
        $scope.initToAssigneeList = function(){
            //$rootScope.resetCache();
            $scope.toDoTaskList =  TaskService.queryToDoTaskList({inTaskDefKeys:'sgfd'}).$object;
            $scope.autoAssigneeConfig = TaskService.queryAutoAssigneeConfigInfo().$object;
            $scope.branchList = SysBranchService.getEffectDealerList().$object;
        };
        $scope.queryToAssigneeList = function(){
            $scope.toDoTaskList =  TaskService.queryToDoTaskList({inTaskDefKeys:'sgfd'}).$object;
        }
        $scope.checkAll = function(){
            angular.forEach($scope.toDoTaskList,function(item){
                item.checked = $scope.selectAllStatus;
            })
        };
        $scope.selectAssigneeList = function(){
            var selTask=[];
            angular.forEach($scope.toDoTaskList,function(item){
                if(item.checked == true){
                    selTask.push(item);
                }
            });
            if(selTask.length==0){
                modal.info("操作提醒","请选择至少一个任务");
                return;
            }
            var modalInstance = $uibModal.open({
                animation: true,
                size:'md',
                backdrop:'false',
                templateUrl :'module_task/tpl/dialog-selectassignee.html',
                controller:function($scope,RestApi,modal,TaskService){
                    $scope.accounts = TaskService.queryCheckWorkgroupOnlineAcct().$object;
                    $scope.checkAll = function(){
                        angular.forEach($scope.accounts,function(item){
                            item.checked = $scope.selectAllStatus;
                        })
                    };
                    $scope.ok=function(){
                        var setAccounts=[];
                        angular.forEach($scope.accounts,function(item){
                            if(item.checked == true){
                                setAccounts.push(item);
                            }
                        });
                        if(setAccounts.length==0){
                            modal.info("操作提醒","请选择至少一个用户");
                            return;
                        }

                        modalInstance.close(setAccounts);
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                var selAccounts = [];
                angular.forEach(response,function(item){
                    selAccounts.push(item.accountId);
                })
                TaskService.doCheckBatchAssigneeTask(selTask,selAccounts).then(function(response){
                    //toaster.pop('success', '操作提醒', "分单成功");
                    var modalInstance1 = $uibModal.open({
                        animation: true,
                        backdrop:'static',
                        resolve:{
                            assigneeResults:function(){
                                return response;
                            }
                        },
                        templateUrl :'module_task/tpl/dialog-showassigneeresult.html',
                        controller:function($scope,RestApi,assigneeResults){
                            $scope.assigneeResults = assigneeResults;
                            $scope.ok=function(){
                                modalInstance1.close();
                            };
                        }
                    });
                    modalInstance1.result.then(function(response){
                        $scope.queryToAssigneeList();
                    })
                })
            })
        };

        $scope.taskId = $stateParams.taskId;
        $scope.businessKey = $stateParams.businessKey;
        $scope.initAssignee = function(){
            $scope.doInitApplyEdit($stateParams.businessKey);
            $scope.task = TaskService.queryTaskByTaskId($stateParams.taskId).$object;
        };
        $scope.doTask = function(item){
            $state.go(
                'app.task.process.assignee',
                {
                    "businessKey":item.businessKey,
                    "procInstId":item.procInstId,
                    "taskId":item.taskId
                }
            )
        };
        $scope.setAutoAssigneeConfig = function(){
            TaskService.showAutoAssigneeConfigDialog().then(function(response){
                toaster.pop('success', '操作提醒', "设置自动分单成功");
                $scope.autoAssigneeConfig = TaskService.queryAutoAssigneeConfigInfo().$object;
            })
        };
    })
;