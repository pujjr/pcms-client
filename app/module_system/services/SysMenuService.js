angular.module('pu.system.services')
    .service("SysMenuService",function($window,RestApi){
        this.querySysMenuList = function(){
            return RestApi.all("/sysmenu").getList();
        };
        this.addSysMenu = function(item){
            return RestApi.all("/sysmenu").post(item);
        }
        this.querySysMenuListByParentId = function(parentId){
            return RestApi.one("/sysmenu",parentId).all("/submenu").getList();
        };
        this.modifySysMenu = function(item){
            return RestApi.one("/sysmenu",item.id).customPUT(item);
        };
        this.deleteSysMenu = function(id){
            return RestApi.one("/sysmenu",id).remove();
        };
    });
