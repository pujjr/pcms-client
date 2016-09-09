angular.module('pu.system.services')
    .service("SysAreaService",function($window,RestApi){
        this.querySysAreaList = function(){
            return RestApi.all("/sysarea").getList();
        };
        this.addSysArea = function(item){
            return RestApi.all("/sysarea").post(item);
        }
        this.querySysAreaListByParentId = function(parentId){
            return RestApi.one("/sysarea",parentId).all("/subsysarea").getList();
        };
        this.modifySysArea = function(item){
            return RestApi.one("/sysarea",item.id).customPUT(item);
        };
        this.deleteSysArea = function(id){
            return RestApi.one("/sysarea",id).remove();
        }
    });
