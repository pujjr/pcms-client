angular.module('pu.loanquery.services')
    .service("LoanQueryService",function($window,RestApi){
        this.getLoanCustList = function(){
            return RestApi.all("/loanquery/getLoanCustList").getList();
        };
        this.getLoanCustApplyInfo=function(appId){
            return RestApi.one("/loanquery/getLoanCustApplyInfo",appId).get();
        };
        this.getLoanCustNeedRepayInfo = function(appId){
            return RestApi.one("/loanquery/getLoanCustNeedRepayInfo",appId).get();
        };
        this.getLoanCustRepayPlanList = function(appId){
            return RestApi.all("/repay//select/list").all(appId).all(0).getList();
        };
        this.getLoanCustRepayLog = function(appId){
            return RestApi.all("/loanquery/getLoanCustRepayLog").all(appId).getList();
        };
        this.getLoanCustChargeLog = function(appId){
            return RestApi.all("/loanquery/getLoanCustChargeLog").all(appId).getList();
        };
        this.getTaskByTaskId = function(taskId,workflowKey){
            return RestApi.all("/loanquery/getTaskByTaskId").one(taskId,workflowKey).get();
        };
        this.getAfterCurrentPeriodRemainPeroidList = function(appId){
            return RestApi.all("/loanquery/getAfterCurrentPeriodRemainPeroidList").all(appId).getList();
        };
        this.getCurrentPeriodRepayPlan = function(appId){
            return RestApi.one("/loanquery/getCurrentPeriodRepayPlan",appId).get();
        };
        this.getOtherFeeList = function(appId){
            return RestApi.all("/loanquery/getOtherFeeList").all(appId).getList();
        }
    });
