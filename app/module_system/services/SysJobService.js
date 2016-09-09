angular.module('pu.system.services')
    .service("SysJobService",function($window,RestApi){
        this.querySysJobList = function(){
            return RestApi.all("/sysjob").getList();
        };
        this.addSysJob = function(item){
            return RestApi.all("/sysjob").post(item);
        };
        this.modifySysJob = function(item){
            return RestApi.one("/sysjob",item.id).customPUT(item);
        };
        this.deleteSysJob = function(id){
            return RestApi.one("/sysjob",id).remove();
        }
    });
