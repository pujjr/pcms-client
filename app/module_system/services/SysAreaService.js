angular.module('pu.system.services')
    .service("SysAreaService",function($window,RestApi){
        this.querySysAreaList = function(){
            return RestApi.all("/sysarea").getList();
        };
        this.addSysArea = function(item){
            return
        }
    });
