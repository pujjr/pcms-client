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
        this.querySysAccount  = function(){
            return RestApi.all("/sysaccount").getList();
        };
        this.saveAccountAuth = function(accountId,param){
            return RestApi.all("/sysaccount/saveAccountAuth").all(accountId).post(param);
        };
        this.getAccountQueryAuthList = function(accountId){
            return RestApi.one("/sysaccount/getAccountQueryAuthList",accountId).get();
        };
        this.resetPassword = function(accountId){
            return RestApi.all("sysaccount/resetPassword").all(accountId).post();
        }
    });
