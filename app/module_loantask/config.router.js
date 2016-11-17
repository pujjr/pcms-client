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
                .state('app.loantask',{
                    abstract:true,
                    url:'/loantask',
                    template: '<div ui-view=""></div>',
                    controller:'TaskController'
                })
                //查询贷后待办
                .state('app.loantask.todolist',{
                    url:'/todolist',
                    templateUrl:'module_loantask/tpl/todotask-list.html',
                    controller:'LoanTaskController'
                })
                .state('app.loantask.process', {
                    url: '/process',
                    abstract: true,
                    template:'<div ui-view=""></div>',
                    controller:'ApplyController'
                })
                //对公还款审批
                .state('app.loantask.process.publicrepay-approve', {
                    url: '/publicrepay-approve/:workflowKey/:procInstId/:taskId/:businessKey/:appId',
                    templateUrl:'module_publicrepay/tpl/publicrepay-approve.html',
                    controller:'PublicRepayController'
                })
                //贷后历史任务查询
                .state('app.loantask.history', {
                    url: '/history',
                    abstract: true,
                    templateUrl:'module_loantask/tpl/loantask-history-manage.html',
                    controller:'LoanTaskHistoryController'
                })
                //对公还款任务查询
                .state('app.loantask.history.publicrepay', {
                    url: '/publicrepay',
                    templateUrl:'module_publicrepay/tpl/publicrepay-task-history.html',
                    controller:'PublicRepayController'
                })
        }
    ]
);