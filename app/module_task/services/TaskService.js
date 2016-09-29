angular.module('pu.task.services')
    .service("TaskService",function($window,RestApi,$uibModal,ToolsService){
        this.queryToDoTaskList = function(queryType){
            return RestApi.all("/task/todolist").all(queryType).getList();
        };
        this.queryTaskByTaskId = function(taskId){
            return RestApi.one("/task",taskId).get();
        };
        this.commitApplyTask = function(item){
            return RestApi.all("/task/commitApplyTask").post(item);
        }
        this.commitCheckTask = function(applyVo,checkVo,taskId){
            return RestApi.all("/task/commitCheckTask").all(taskId).post({"applyVo":applyVo,"checkVo":checkVo});
        };
        this.queryCheckWorkgroupOnlineAcct = function(){
            return RestApi.all("/task/getCheckWorkgroupOnlineAcct").getList();
        };
        this.doCheckBatchAssigneeTask = function(taskList,assigneeList){
            return RestApi.all("/task/doCheckBatchAssigneeTask").post({'toDoTaskList':taskList,'assingees':assigneeList});
        }
    });
