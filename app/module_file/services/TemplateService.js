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
        };
        this.queryTemplateCategoryInfo = function(templateId,categoryId){
            return RestApi.all("/template/getTemplateCategoryInfo").one(templateId,categoryId).get();
        };
        this.saveTemplateCategoryDir = function(templateId,categoryId,dirs){
            return RestApi.all("/template/saveTemplateCategoryDir").all(templateId).all(categoryId).post(dirs);
        }
        this.saveTemplateCategoryRequestDir = function(templateId,categoryId,dirs){
            return RestApi.all("/template/saveTemplateCategoryRequestDir").all(templateId).all(categoryId).post(dirs);
        }

    });
