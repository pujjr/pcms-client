angular.module('pu.system.services')
    .service("SysWorkgroupService",function($window,RestApi){
        this.querySysWorkgroupList = function(){
            return RestApi.all("/sysworkgroup").getList();
        };
        this.addSysWorkgroup = function(item){
            return RestApi.all("/sysworkgroup").post(item);
        };
        this.modifySysWorkgroup = function(item){
            return RestApi.one("/sysworkgroup",item.id).customPUT(item);
        };
        this.deleteSysWorkgroup = function(id){
            return RestApi.one("/sysworkgroup",id).remove();
        }
        this.querySysAccountListByWorkgroupId = function(workgroupId){
            return RestApi.one("/sysworkgroup",workgroupId).all("/accounts").getList();
        };
    });
