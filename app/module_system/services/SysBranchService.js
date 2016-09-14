angular.module('pu.system.services')
    .service("SysBranchService",function($window,RestApi){
        this.querySysBranchList = function(){
            return RestApi.all("/sysbranch").getList();
        };
        this.addSysBranch = function(item){
            return RestApi.all("/sysbranch").post(item);
        };
        this.modifySysBranch = function(item){
            return RestApi.one("/sysbranch",item.sysBranch.id).customPUT(item);
        };
        this.deleteSysBranch = function(id){
            return RestApi.one("/sysbranch",id).remove();
        }
        this.querySysAccountListByBranchId = function(branchId){
            return RestApi.one("/sysbranch",branchId).all("/accounts").getList();
        };
        this.querySysBranchByBranchId = function(id){
            return RestApi.one("/sysbranch",id).get();
        };
        this.queryAllGpsLvlList = function(){
            return RestApi.all("/gps").getList();
        }
    });
