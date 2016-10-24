angular.module('pu.task.services')
    .service("TaskService",function($window,RestApi,$q,$uibModal,ToolsService,modal){
        this.queryToDoTaskList = function(queryType){
            return RestApi.all("/task/todolist").all(queryType).getList();
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
        }
    });
