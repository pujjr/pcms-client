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
        }
    });
