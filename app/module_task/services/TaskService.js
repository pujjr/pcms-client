angular.module('pu.task.services')
    .service("TaskService",function($window,RestApi,$q,$uibModal,ToolsService,modal,toaster){
        this.queryToDoTaskList = function(param){
            return RestApi.all("/task/todolist").getList(param);
        };
        this.queryTaskByTaskId = function(taskId){
            return RestApi.one("/task",taskId).get();
        };
        this.commitApplyTask = function(item){
            return RestApi.all("/task/commitApplyTask").post(item);
        };
        this.commitReApplyTask = function(applyVo,taskId){
            return RestApi.all("/task/commitReApplyTask").all(taskId).post(applyVo);
        };
        this.commitSupplyCheckTask = function(applyVo,taskId){
            return RestApi.all("/task/commitSupplyCheckTask").all(taskId).post(applyVo);
        };
        this.commitPreCheckTask = function(taskId){
            return RestApi.all("/task/commitPreCheckTask").all(taskId).post();
        };
        this.commitCheckTask = function(applyVo,checkVo,taskId){
            return RestApi.all("/task/commitCheckTask").all(taskId).post({"applyVo":applyVo,"checkVo":checkVo});
        };
        this.commitApproveTask = function(applyVo,approveVo,taskId){
            return RestApi.all("/task/commitApproveTask").all(taskId).post({"applyVo":applyVo,"approveVo":approveVo});
        };
        this.queryCheckWorkgroupOnlineAcct = function(){
            return RestApi.all("/task/getCheckWorkgroupOnlineAcct").getList();
        };
        this.doCheckBatchAssigneeTask = function(taskList,assigneeList){
            return RestApi.all("/task/doCheckBatchAssigneeTask").post({'toDoTaskList':taskList,'assingees':assigneeList});
        };
        this.querySignInfo = function(appId){
            return RestApi.one("/task/querySignInfo",appId).get();
        };
        this.saveSignContractInfo = function(signContractVo){
            return RestApi.all("/task/saveSignContractInfo").post(signContractVo);
        };
        this.commitSignContractTask = function(appId,taskId){
            return RestApi.all("/task/commitSignContractTask").all(appId).all(taskId).post();
        };
        this.saveLoanCheckInfo = function(signContractVo){
            return RestApi.all("/task/saveLoanCheckInfo").post(signContractVo);
        };
        this.commitSupplyLoanCheckTask = function(taskId){
            return RestApi.all("/task/commitSupplyLoanCheckTask").all(taskId).post();
        }
        this.commitLoanCheckTask = function(signContractVo,commitType,taskId){
            return RestApi.all("/task/commitLoanCheckTask").all(taskId).all(commitType).post(signContractVo);
        };
        this.commitPrevLoanApproveTask = function(taskId){
            return RestApi.all("/task/commitPrevLoanApproveTask").all(taskId).post();
        };
        this.commitLoanApproveTask = function(loanApproveVo,taskId){
            return RestApi.all("/task/commitLoanApproveTask").all(taskId).post(loanApproveVo);
        };
        this.queryReconsiderApplyInfo = function(taskId){
            return RestApi.one("/task/getReconsiderInfo",taskId).get();
        };
        this.commitReconsiderApply = function(reconsiderApplyVo,appId,taskId){
            return RestApi.all("/task/commitReconsiderApplyTask").all(appId).all(taskId).post(reconsiderApplyVo);
        };
        this.queryReconsiderApproveInfo = function(appId){
            return RestApi.one("/task/getReconsiderApproveInfo",appId).get();
        };
        this.commitReconsiderApproveTask = function(reconsiderApproveVo,taskId){
            return RestApi.all("/task/commitReconsiderApproveTask").all(taskId).post(reconsiderApproveVo);
        };
        this.backTask = function(taskId){
            var defered=$q.defer();
            modal.prompt('回退原因','请输入回退原因').then(function(response){
                RestApi.all("/task/backTask").all(taskId).post(response).then(function(response){
                    defered.resolve();
                },function(response){
                    defered.reject();
                });
            })
            return defered.promise;
        };
        this.queryWorkflowProcessResult = function(taskId){
            return RestApi.all("/task/getWorkflowProcessResult").all(taskId).getList();
        };
        this.commitCallBackTask = function(params,appId,taskId){
            return RestApi.all("/task/commitCallBackTask").all(appId).all(taskId).post(params);
        };
        this.commitChangeApplyInfoTask = function(params,appId,taskId){
            return RestApi.all("/task/commitChangeApplyInfoTask").all(appId).all(taskId).post(params);
        };
        this.queryLatestChangeApplyInfo = function(taskId){
            return RestApi.one("/task/getLatestChangeApplyInfo",taskId).get();
        };
        this.commitApproveChangeApplyInfoTask = function(params,appId,taskId){
            return RestApi.all("/task/commitApproveChangeApplyInfoTask").all(appId).all(taskId).post(params);
        };
        this.commitCancelApplyInfoTask = function(params,appId,taskId){
            return RestApi.all("/task/commitCancelApplyInfoTask").all(appId).all(taskId).post(params);
        };
        this.queryLatestCancelApplyInfo = function(taskId){
            return RestApi.one("/task/getLatestCancelApplyInfo",taskId).get();
        };
        this.commitApproveCancelApplyInfoTask = function(params,appId,taskId){
            return RestApi.all("/task/commitApproveCancelApplyInfoTask").all(appId).all(taskId).post(params);
        };
        this.queryAutoAssigneeConfigInfo = function(){
            return RestApi.one("/task/getAutoAssigneeConfigInfo").get();
        };
        this.setAutoAssigneeConfigInfo = function(params){
            return RestApi.all("/task/setAutoAssigneeConfigInfo").post(params);
        }
        this.showAutoAssigneeConfigDialog = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                size:'lg',
                backdrop:'false',
                templateUrl :'module_task/tpl/dialog-auto-assignee-config.html',
                controller:function($scope,RestApi,TaskService){
                    $scope.item = TaskService.queryAutoAssigneeConfigInfo().$object;
                    $scope.ok=function(){
                        TaskService.setAutoAssigneeConfigInfo($scope.item).then(function(){
                            modalInstance.close('设置成功');
                        })
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            return modalInstance.result;
        };
        this.getContractInfoListByAppId = function(appId){
            return RestApi.all("/task/getContractInfoListByAppId").all(appId).getList();
        };
        this.getContractOSSKey = function(appId,contractKey){
            return RestApi.all("/print/generateContract").one(appId,contractKey).get();
        };
        this.getUserTaskDefineGroupInfo = function(param){
            return RestApi.all("/task/getUserTaskDefineGroupInfo").getList(param);
        };
        this.batchDoLoanTask = function(params){
            return RestApi.all("/task/batchDoLoanTask").post(params);
        };
        this.commitLoanTask = function(taskId,appId){
            return RestApi.all("/task/commitLoanTask").all(taskId).all(appId).post();
        };
        this.commitCounterSignApprove = function(taskId,params){
            return RestApi.all("/task/commitCounterSignApprove").all(taskId).post(params);
        }

    });
