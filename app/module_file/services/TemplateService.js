angular.module('pu.file.services')
    .service("TemplateService",function($window,RestApi){
        this.queryTemplateList = function(enabled){
            return RestApi.all("/template").getList({'enabled':enabled});
        };
        this.addTemplate = function(item){
            return RestApi.all("/template").post(item);
        };
        this.modifyTemplate = function(item){
            return RestApi.one("/template",item.id).customPUT(item);
        };
        this.deleteTemplate = function(id){
            return RestApi.one("/template",id).remove();
        };

    });
