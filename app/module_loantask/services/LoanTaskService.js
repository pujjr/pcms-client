angular.module('pu.loanquery.services')
    .service("LoanTaskService",function($window,RestApi){
        this.getLoanToDoTaskList = function(){
            return RestApi.all("/loanquery/getLoanToDoTaskList").getList();
        }
    });
