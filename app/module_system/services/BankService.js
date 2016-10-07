angular.module('pu.system.services')
    .service("BankService",function($window,RestApi){
        this.queryBankInfoList = function(enabled){
            return RestApi.all("/bank").getList({'enabled':enabled});
        };
        this.addBankInfo = function(item){
            return RestApi.all("/bank").post(item);
        };
        this.modifyBankInfo = function(item){
            return RestApi.one("/bank",item.id).customPUT(item);
        };
        this.deleteBankInfo = function(id){
            return RestApi.one("/bank",id).remove();
        }
        this.queryUnionPayBankInfoList = function(){
            return RestApi.all("/bank/unionpay").getList();
        }
    });
