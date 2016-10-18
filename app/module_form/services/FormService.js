angular.module('pu.form.services')
    .service("FormService",function($window,RestApi){
        this.queryFormFieldList = function(){
            return RestApi.all("/form/field").getList();
        };
        this.addFormField = function(item){
            return RestApi.all("/form/field").post(item);
        };
        this.modifyFormField = function(item){
            return RestApi.one("/form/field",item.id).customPUT(item);
        };
        this.deleteFormField = function(id){
            return RestApi.one("/form/field",id).remove();
        };
        this.queryChildFormFieldList = function(parentId){
            return RestApi.all("/form/field/child").all(parentId).getList();
        }
        this.queryFormFieldTemplateList = function(){
            return RestApi.all("/form/template").getList();
        };
        this.addFormFieldTemplate = function(item){
            return RestApi.all("/form/template").post(item);
        };
        this.modifyFormFieldTemplate = function(item){
            return RestApi.one("/form/template",item.id).customPUT(item);
        };
        this.deleteFormFieldTemplate = function(id){
            return RestApi.one("/form/template",id).remove();
        };
        this.queryTemplateRequiredFormFileList = function(tplId){
            return RestApi.all("/form/requirefield/template").all(tplId).getList();
        };
        this.saveTemplateRequiredFormField = function(tplId,list){
            return RestApi.all("/form/saverequiredfield").all(tplId).post(list);
        }
    });
