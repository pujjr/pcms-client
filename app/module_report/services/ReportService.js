angular.module('pu.report.services')
    .service("ReportService",function($window,RestApi,$uibModal){
        this.exportCreditReport = function(){
            return RestApi.one("/query","exportNeedQueryCreditReport").get();
        };
    });
