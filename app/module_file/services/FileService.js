angular.module('pu.file.services')
    .service("FileService",function($window,RestApi){
        this.queryApplyFormCategoryDirectoryList = function(appId,categoryKey){
            return RestApi.all("/file/getApplyFormCategoryDirectoryList").all(appId).all(categoryKey).getList();
        };
    });
