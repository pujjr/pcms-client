angular.module('pu.assetsmanage.services')
    .service("InsManageService",function($window,RestApi,$uibModal,toaster){
        this.getInsuranceHisList = function(appId){
            return RestApi.all("/insmanage/getInsuranceHisList").all(appId).getList();
        };
    });
