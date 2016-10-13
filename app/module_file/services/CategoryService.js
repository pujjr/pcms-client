angular.module('pu.file.services')
    .service("CategoryService",function($window,RestApi){
        this.queryCategoryList = function(enabled){
            return RestApi.all("/category").getList();
        };
        this.addCategory = function(item){
            return RestApi.all("/category").post(item);
        };
        this.modifyCategory = function(item){
            return RestApi.one("/category",item.id).customPUT(item);
        };
        this.deleteCategory = function(id){
            return RestApi.one("/category",id).remove();
        };

    });
