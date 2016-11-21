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
                //提前结清审批
                .state('app.loantask.process.settle-approve', {
                    url: '/settle-approve/:workflowKey/:procInstId/:taskId/:businessKey/:appId',
                    templateUrl:'module_settle/tpl/settle-approve.html',
                    controller:'SettleController'
                })
                //提前结清申请确认入账
                .state('app.loantask.process.settle-apply-confirm', {
                    url: '/settle-apply-confirm/:workflowKey/:procInstId/:taskId/:businessKey/:appId',
                    templateUrl:'module_settle/tpl/settle-apply-confirm.html',
                    controller:'SettleController'
                })
                //提前结清确认入账
                .state('app.loantask.process.settle-confirm', {
                    url: '/settley-confirm/:workflowKey/:procInstId/:taskId/:businessKey/:appId',
                    templateUrl:'module_settle/tpl/settle-confirm.html',
                    controller:'SettleController'
                })
                //变更还款日申请
                .state('app.loantask.process.alterrepaydate-approve', {
                    url: '/alterrepaydate-approve/:workflowKey/:procInstId/:taskId/:businessKey/:appId',
                    templateUrl:'module_alterrepaydate/tpl/alterrepaydate-approve.html',
                    controller:'AlterRepayDateController'
                })
                //变更还款日确认
                .state('app.loantask.process.alterrepaydate-confirm', {
                    url: '/alterrepaydate-confirm/:workflowKey/:procInstId/:taskId/:businessKey/:appId',
                    templateUrl:'module_alterrepaydate/tpl/alterrepaydate-confirm.html',
                    controller:'AlterRepayDateController'
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
                //提起结清任务查询
                .state('app.loantask.history.settle', {
                    url: '/settle',
                    templateUrl:'module_settle/tpl/settle-task-history.html',
                    controller:'SettleController'
                })
                //变更还款日任务查询
                .state('app.loantask.history.alterrepaydate', {
                    url: '/settle',
                    templateUrl:'module_alterrepaydate/tpl/alterrepaydatee-task-history.html',
                    controller:'AlterRepayDateController'
                })
        }
    ]
);