angular.module('pu.task.services')
    .service("TaskService",function($window,RestApi,$uibModal,ToolsService){
        this.queryToDoTaskList = function(){
            return RestApi.all("/task/todolist").getList();
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
    });
