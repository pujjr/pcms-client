'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .config(
    ['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                //贷款综合查询
                .state('app.loanquery',{
                    abstract:true,
                    url:'/loanquery',
                    template: '<div ui-view=""></div>'
                })
                //查询贷款客户列表
                .state('app.loanquery.list',{
                    url:'/list',
                    templateUrl:'module_loanquery/tpl/loanquery-list.html',
                    controller:'LoanQueryController'
                })
                //查询贷款客户详细信息
                .state('app.loanquery.loaninfo',{
                    abstract:true,
                    url:'/loaninfo',
                    template: '<div ui-view=""></div>',
                    controller:'ApplyController'
                })
                //查询贷款客户详细信息
                .state('app.loanquery.loaninfo.detail',{
                    url:'/detail/:appId',
                    templateUrl:'module_loanquery/tpl/loanquery-detail.html',
                    controller:'LoanQueryController'
                })
                //查询我办理的任务
                .state('app.loanquery.mydotask',{
                    url:'/mydotask',
                    templateUrl:'module_loanquery/tpl/mydotask-list.html',
                    controller:'LoanQueryController'
                })
                //查询所有贷后所有流程
                .state('app.loanquery.alltask',{
                    url:'/alltask',
                    templateUrl:'module_loanquery/tpl/allapplytask-list.html',
                    controller:'LoanQueryController'
                })
        }
    ]
);