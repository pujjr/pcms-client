angular.module('pu.system.services')
    .service("SysBranchService",function($window,RestApi){
        this.querySysBranchList = function(){
            return RestApi.all("/sysbranch").getList();
        };
    });
