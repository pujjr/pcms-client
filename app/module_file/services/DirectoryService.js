angular.module('pu.file.services')
    .service("DirectoryService",function($window,RestApi){
        this.queryDirectoryList = function(enabled){
            return RestApi.all("/directory").getList({'enabled':enabled});
        };
        this.addDirectory = function(item){
            return RestApi.all("/directory").post(item);
        };
        this.modifyDirectory = function(item){
            return RestApi.one("/directory",item.id).customPUT(item);
        };
        this.deleteDirectory = function(id){
            return RestApi.one("/directory",id).remove();
        };
        this.queryDirectoryListByParentId = function(parentId){
            return RestApi.one("/directory",parentId).all("/subdirectory").getList();
        };
        this.queryDirectoryByTemplateId = function(templateId){
            return RestApi.all("/directory/template").all(templateId).getList();
        }

    });
