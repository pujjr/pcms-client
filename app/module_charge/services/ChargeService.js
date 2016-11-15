angular.module('pu.charge.services')
    .service("ChargeService",function($window,RestApi){
        this.getEnableChargeList = function(){
            return RestApi.all("/charge/getEnableChargeList").getList();
        };
        this.setChargeMode = function(chargeIds,chargeMode){
            return RestApi.all("/charge/setChargeMode").all(chargeMode).post(chargeIds);
        };
        this.confirmManualOffer = function(merchantNo){
            return RestApi.all("/charge/confirmManualOffer").all(merchantNo).getList();
        };
        this.getWatingOfferChargeList = function(chargeMode){
            return RestApi.all("/charge/getWatingOfferChargeList").all(chargeMode).getList();
        }
    });
