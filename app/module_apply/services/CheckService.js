angular.module('pu.apply.services')
    .service("CheckService",function($window,RestApi,$uibModal,ToolsService){
        this.commitCheckTask = function(applyVo,taskId){
            return RestApi.all("/task/commitCheckTask").all(taskId).post(applyVo);
        }
    });
