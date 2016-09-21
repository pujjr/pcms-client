angular.module('pu.task.services')
    .service("TaskService",function($window,RestApi,$uibModal,ToolsService){
        this.queryToDoTaskList = function(){
            return RestApi.all("/task/todolist").getList();
        };
        this.queryTaskByTaskId = function(taskId){
            return RestApi.one("/task",taskId).get();
        }
    });
