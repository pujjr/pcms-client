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
        }
    ]
);