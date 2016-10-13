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
        this.saveTemplateDirectory = function(templateId,dirs){
            return RestApi.one("/template",templateId).all("/saveTemplateDirectory").post(dirs);
        };
        this.saveTemplateCategory = function(templateId,categorys){
            return RestApi.one("/template",templateId).all("saveTemplateCategory").post(categorys);
        }

    });
