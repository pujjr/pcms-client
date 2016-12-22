angular.module('pu.sms.services')
    .service("SmsService",function($window,RestApi){
        this.getSmsTemplateList = function(){
            return RestApi.all("/sms/template").getList();
        };
        this.addSmsTemplate = function(item){
            return RestApi.all("/sms/template").post(item);
        };
        this.modifySmsTemplate = function(item){
            return RestApi.one("/sms/template",item.id).customPUT(item);
        };
        this.getSmsHistoryList = function(){
            return RestApi.all("/sms/history").getList();
        }
    });
