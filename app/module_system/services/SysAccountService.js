angular.module('pu.system.services')
    .service("SysAccountService",function($window,RestApi) {
        this.addSysAccount = function(item){
            return RestApi.all("/sysaccount").post(item);
        }
        this.deleteSysAccount = function(id){
            return RestApi.one("/sysaccount",id).remove();
        }
        this.modifySysAccount = function(item){
            return  RestApi.one("/sysaccount",item.id).customPUT(item);
        }
    });
