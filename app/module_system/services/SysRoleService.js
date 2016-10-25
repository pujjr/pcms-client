angular.module('pu.system.services')
    .service("SysRoleService",function($window,RestApi){
        this.querySysRoleList = function(enabled){
            return RestApi.all("/sysrole").getList();
        };
        this.addSysRole = function(item){
            return RestApi.all("/sysrole").post(item);
        };
        this.modifySysRole = function(item){
            return RestApi.one("/sysrole",item.id).customPUT(item);
        };
        this.deleteSysRole = function(id){
            return RestApi.one("/sysrole",id).remove();
        };
    });
