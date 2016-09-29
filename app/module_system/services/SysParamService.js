angular.module('pu.system.services')
    .service("SysParamService",function($window,RestApi){
        this.querySysParamList = function(){
            return RestApi.all("/sysparam").getList();
        };
        this.addSysParam = function(item){
            return RestApi.all("/sysparam").post(item);
        };
        this.modifySysParam = function(item){
            return RestApi.one("/sysparam",item.id).customPUT(item);
        };
        this.deleteSysParam = function(id){
            return RestApi.one("/sysparam",id).remove();
        }
    });
