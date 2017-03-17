angular.module('pu.charge.services')
    .service("ChargeService",function($window,RestApi){
        this.generatorOfferChargeList = function(){
            return RestApi.all("/charge/generatorOfferChargeList").post();
        };
        this.getNotSelOfferModeList = function(){
            return RestApi.all("/charge/getNotSelOfferModeList").getList();
        };
        this.getSelOfferModeList = function(chargeMode){
            return RestApi.all("/charge/getSelOfferModeList").all(chargeMode).getList();
        };
        this.setOfferChargeMode = function(chargeIds,chargeMode){
            return RestApi.all("/charge/setOfferChargeMode").all(chargeMode).post(chargeIds);
        };
        this.exportOfferFile = function(merchantNo){
            return RestApi.one("/charge/exportOfferFile",merchantNo).get();
        };
        this.doFileRetOffer = function(filedata){
            return RestApi.all("/charge/doFileRetOffer").withHttpConfig({transformRequest: angular.identity})
                .post(filedata, {}, {'Content-Type': undefined});
        };
        this.getOfferBatchList = function(){
            return RestApi.all("/charge/getOfferBatchList").getList();
        };
        this.getOfferBatchDetail = function(offerBatchId){
            return RestApi.all("/charge/getOfferBatchDetail").all(offerBatchId).getList();
        };
        this.getOfferBatchChargeLog = function(offerBatchId){
            return RestApi.all("/charge/getOfferBatchChargeLog").all(offerBatchId).getList();
        }
    });
