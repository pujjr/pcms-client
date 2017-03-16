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
                //人手报盘审批
                .state('app.loantask.process.offer-approve', {
                    url: '/offer-approve/:workflowKey/:procInstId/:taskId/:businessKey/:appId',
                    templateUrl:'module_offer/tpl/offer-approve.html',
                    controller:'OfferController'
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
                //提前申请减免审批
                .state('app.loantask.process.settle-remission-approve', {
                    url: '/settle-remission-approve/:workflowKey/:procInstId/:taskId/:businessKey/:appId',
                    templateUrl:'module_settle/tpl/settle-remission-approve.html',
                    controller:'SettleController'
                })
                //提前结清确认入账
                .state('app.loantask.process.settle-confirm', {
                    url: '/settley-confirm/:workflowKey/:procInstId/:taskId/:businessKey/:appId',
                    templateUrl:'module_settle/tpl/settle-confirm.html',
                    controller:'SettleController'
                })
                //提前结清减免确认入账
                .state('app.loantask.process.settle-remission-confirm', {
                    url: '/settley-remission-confirm/:workflowKey/:procInstId/:taskId/:businessKey/:appId',
                    templateUrl:'module_settle/tpl/settle-remission-confirm.html',
                    controller:'SettleController'
                })
                //变更还款日审批
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
                //退款审批
                .state('app.loantask.process.refund-approve', {
                    url: '/refund-approve/:workflowKey/:procInstId/:taskId/:businessKey/:appId',
                    templateUrl:'module_refund/tpl/refund-approve.html',
                    controller:'RefundController'
                })
                //退款财务确认
                .state('app.loantask.process.refund-confirm', {
                    url: '/refund-confirm/:workflowKey/:procInstId/:taskId/:businessKey/:appId',
                    templateUrl:'module_refund/tpl/refund-confirm.html',
                    controller:'RefundController'
                })
                //减免审批
                .state('app.loantask.process.remission-approve', {
                    url: '/remission-approve/:workflowKey/:procInstId/:taskId/:businessKey/:appId',
                    templateUrl:'module_remission/tpl/remission-approve.html',
                    controller:'RemissionController'
                })
                //展期审批
                .state('app.loantask.process.extendperiod-approve', {
                    url: '/extendperiod-approve/:workflowKey/:procInstId/:taskId/:businessKey/:appId',
                    templateUrl:'module_extendperiod/tpl/extendperiod-approve.html',
                    controller:'ExtendPeriodController'
                })
                //展期申请确认
                .state('app.loantask.process.extendperiod-apply-confirm', {
                    url: '/extendperiod-apply-confirm/:workflowKey/:procInstId/:taskId/:businessKey/:appId',
                    templateUrl:'module_extendperiod/tpl/extendperiod-apply-confirm.html',
                    controller:'ExtendPeriodController'
                })
                //展期申请减免审批
                .state('app.loantask.process.extendperiod-remission-approve', {
                    url: '/extendperiod-remission-approve/:workflowKey/:procInstId/:taskId/:businessKey/:appId',
                    templateUrl:'module_extendperiod/tpl/extendperiod-remission-approve.html',
                    controller:'ExtendPeriodController'
                })
                //展期财务确认
                .state('app.loantask.process.extendperiod-confirm', {
                    url: '/extendperiod-confirm/:workflowKey/:procInstId/:taskId/:businessKey/:appId',
                    templateUrl:'module_extendperiod/tpl/extendperiod-confirm.html',
                    controller:'ExtendPeriodController'
                })
                //其他费用审批
                .state('app.loantask.process.otherfee-approve', {
                    url: '/otherfee-approve/:workflowKey/:procInstId/:taskId/:businessKey/:appId',
                    templateUrl:'module_otherfee/tpl/otherfee-approve.html',
                    controller:'OtherFeeController'
                })
                //保险续保
                .state('app.loantask.process.insurance-continue', {
                    url: '/insurance-continue/:workflowKey/:procInstId/:taskId/:businessKey/:appId',
                    templateUrl:'module_assetsmanage/tpl/insurance-continue.html',
                    controller:'InsManageController'
                })
                //贷后历史任务查询
                .state('app.loantask.history', {
                    url: '/history',
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
                    url: '/alterrepaydate',
                    templateUrl:'module_alterrepaydate/tpl/alterrepaydatee-task-history.html',
                    controller:'AlterRepayDateController'
                })
                //退款任务查询
                .state('app.loantask.history.refund', {
                    url: '/refund',
                    templateUrl:'module_refund/tpl/refund-task-history.html',
                    controller:'RefundController'
                })
                //减免任务查询
                .state('app.loantask.history.remission', {
                    url: '/remission',
                    templateUrl:'module_remission/tpl/remission-task-history.html',
                    controller:'RemissionController'
                })
                //展期任务查询
                .state('app.loantask.history.extendperiod', {
                    url: '/extendperiod',
                    templateUrl:'module_extendperiod/tpl/extendperiod-task-history.html',
                    controller:'ExtendPeriodController'
                })
                //其他费用任务查询
                .state('app.loantask.history.otherfee', {
                    url: '/otherfee',
                    templateUrl:'module_otherfee/tpl/otherfee-task-history.html',
                    controller:'OtherFeeController'
                })
                //人手报盘任务查询
                .state('app.loantask.history.offer', {
                    url: '/offer',
                    templateUrl:'module_offer/tpl/offer-task-history.html',
                    controller:'OfferController'
                })
                //催收任务查询
                .state('app.loantask.history.collection', {
                    url: '/collection',
                    templateUrl:'module_assetsmanage/tpl/collection-task-history.html',
                    controller:'CollectionController'
                })
                .state('app.loantask.detail', {
                    url: '/process',
                    abstract: true,
                    template:'<div ui-view=""></div>',
                    controller:'ApplyController'
                })
                //对公还款任务明细查询
                .state('app.loantask.detail.publicrepay', {
                    url: '/publicrepay/:id/:appId',
                    templateUrl:'module_publicrepay/tpl/publicrepay-task-detail.html',
                    controller:'PublicRepayController'
                })
        }
    ]
);