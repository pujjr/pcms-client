angular.module('pu.system.services')
    .service("InsuranceService",function($window,RestApi){
        this.queryInsuranceCompanyList = function(enabled){
            return RestApi.all("/insurancecompany").getList({'enabled':enabled});
        };
        this.addInsuranceCompany = function(item){
            return RestApi.all("/insurancecompany").post(item);
        };
        this.modifyInsuranceCompany = function(item){
            return RestApi.one("/insurancecompany",item.id).customPUT(item);
        };
        this.deleteInsuranceCompany = function(id){
            return RestApi.one("/insurancecompany",id).remove();
        };
    });
