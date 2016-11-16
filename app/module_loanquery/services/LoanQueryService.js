angular.module('pu.loanquery.services')
    .service("LoanQueryService",function($window,RestApi){
        this.getLoanCustList = function(){
            return RestApi.all("/loanquery/getLoanCustList").getList();
        }
    });
