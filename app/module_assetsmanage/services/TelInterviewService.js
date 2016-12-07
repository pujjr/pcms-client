angular.module('pu.assetsmanage.services')
    .service("TelInterviewService",function($window,RestApi,$uibModal,toaster){
        this.addTelInterviewResult = function(appId,params){
            return RestApi.all("/telinterview/addTelInterviewResult").all(appId).post(params);
        };
    });
