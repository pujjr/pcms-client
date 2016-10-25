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
        this.querySysRoleMenuList = function(roleId){
            return RestApi.all("/sysrole").all(roleId).all("/menulist").getList();
        };
        this.saveSysRoleMenuList = function(roleId,menus){
            return RestApi.all("/sysrole").all(roleId).all("saveSysRoelMenuList").post(menus);
        };
        this.queryAccountRoleList = function(accountId){
            return RestApi.all("/sysrole/getAccountRoleList").all(accountId).getList();
        };
        this.saveAccountRoleList = function(accountId,roles){
            return RestApi.all("/sysrole").all(accountId).all("saveAccountRoleList").post(roles);
        }
    });
