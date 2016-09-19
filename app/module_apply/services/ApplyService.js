angular.module('pu.apply.services')
    .service("ApplyService",function($window,RestApi,$uibModal,ToolsService){
        this.saveApplyInfo = function(item){
            return RestApi.all("/apply").post(item);
        };
    });
