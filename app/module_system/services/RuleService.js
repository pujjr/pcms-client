angular.module('pu.system.services')
    .service("RuleService",function($window,RestApi){
        this.queryWorkgroupRule = function(workgroupId){
            return RestApi.one("/rule/getWorkgroupRule",workgroupId).get();
        };
        this.queryParentWorkgroupFinanceAmountRule = function(workgroupId){
            return RestApi.one("/rule/getParentWorkgroupFinanceAmountRule",workgroupId).get();
        };
        this.queryParentWorkgroupSysBranchRuleList = function(workgroupId){
            return RestApi.all("/rule/getParentWorkgroupDealerRule").all(workgroupId).getList();
        };
        this.queryParentWorkgroupProductRuleList = function(workgroupId){
            return RestApi.all("/rule/getParentWorkgroupProductRule").all(workgroupId).getList();
        };
        this.saveWorkgroupRule = function(workgroupId,vo){
            return RestApi.all("/rule/saveWorkgroupRule").all(workgroupId).post(vo);
        };
        this.batchSaveAccountAssigneeTaskCnt = function(workgroupId,maxAssigneeTaskCnt,accounts){
            return RestApi.all("/rule/batchSetTaskCnt").all(workgroupId).all(maxAssigneeTaskCnt).post(accounts);
        };
        this.getWorkgroupRuleRemission = function(workgroupId){
            return RestApi.one("/rule/getWorkgroupRuleRemission",workgroupId).get();
        };
        this.saveWorkgroupRuleRemission = function(workgroupId,params){
            return RestApi.all("/rule/saveWorkgroupRuleRemission").all(workgroupId).post(params);
        };
        this.getParentWorkgroupRuleRemission = function(workgroupId){
            return RestApi.one("/rule/getParentWorkgroupRuleRemission",workgroupId).get();
        }
    });
