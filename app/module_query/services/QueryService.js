angular.module('pu.query.services')
    .service("QueryService",function($window,RestApi){
        this.queryApplyList = function(queryParam){
            return RestApi.all("/query/applyList").getList(queryParam);
        };
        this.queryApplyConditionLoanCommentList = function(appId){
            return RestApi.all("/query/conditionLoanCommentList").all(appId).getList();
        };
        this.getWorkflowProcessResultByAppId = function(appId){
            return RestApi.all("/query/getWorkflowProcessResult").all(appId).getList();
        };
        this.queryApplyRunPathNodeMap = function(appId){
            return RestApi.one("/query/queryApplyRunPathNodeMap",appId).get();
        };
        this.getWorkflowProcessResultByProcInstId = function(procInstId){
            return RestApi.all("/query/getWorkflowProcessResultByProcInstId").all(procInstId).getList();
        }
    });
