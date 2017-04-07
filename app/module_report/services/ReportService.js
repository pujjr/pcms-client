angular.module('pu.report.services')
    .service("ReportService",function($window,RestApi,$uibModal){
        this.exportCreditInfo = function(){
            return RestApi.one("/report","exportCreditInfo").get();
        };
        this.exportCollectionLog = function(){
            return RestApi.one("/report","exportCollectionLog").get();
        };
        this.exportOverdueCollection = function(){
            return RestApi.one("/report","exportOverdueCollection").get();
        };
    });
