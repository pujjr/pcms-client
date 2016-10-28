angular.module('pu.query.services')
    .service("QueryService",function($window,RestApi){
        this.queryApplyList = function(queryParam){
            return RestApi.all("/query/applyList").getList(queryParam);
        };
        this.queryApplyConditionLoanCommentList = function(appId){
            return RestApi.all("/query/conditionLoanCommentList").all(appId).getList();
        }
    });
