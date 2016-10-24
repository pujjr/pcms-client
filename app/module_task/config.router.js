'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .config(
    ['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                //任务管理
                .state('app.task', {
                    url: '/task',
                    abstract: true,
                    template:'<div ui-view=""></div>',
                    controller:'TaskController'
                })
                //查询待办任务
                .state('app.task.todolist',{
                    url:'/todo',
                    templateUrl:'module_task/tpl/todotask-list.html',
                    controller:'ToDoTaskController'
                })
                .state('app.task.process', {
                    url: '/process',
                    abstract: true,
                    template:'<div ui-view=""></div>',
                    controller:'ApplyController'
                })
                //重新提交申请
                .state('app.task.process.reapply',{
                    url:'/reapply/:procInstId/:taskId/:businessKey',
                    templateUrl:'module_task/tpl/reapply.html',
                    controller:'ReApplyController'
                })
                //手工分单查看申请信息
                .state('app.task.process.assignee',{
                    url:'/assignee/:procInstId/:taskId/:businessKey',
                    templateUrl:'module_task/tpl/apply-handle-assignee.html',
                    controller:'AssigneeController'
                })
                //补充审核资料
                .state('app.task.process.supplycheckinfo',{
                    url:'/supplycheckinfo/:procInstId/:taskId/:businessKey',
                    templateUrl:'module_task/tpl/apply-supplycheckinfo.html',
                    controller:'SupplyCheckInfoController'
                })
                //初审
                .state('app.task.process.precheck',{
                    url:'/precheck/:procInstId/:taskId/:businessKey',
                    templateUrl:'module_task/tpl/apply-precheck.html',
                    controller:'CheckController'
                })
                //审核
                .state('app.task.process.check',{
                    url:'/check/:procInstId/:taskId/:businessKey',
                    templateUrl:'module_task/tpl/apply-check.html',
                    controller:'CheckController'
                })
                //审批
                .state('app.task.process.approve',{
                    url:'/approve/:procInstId/:taskId/:businessKey',
                    templateUrl:'module_task/tpl/apply-approve.html',
                    controller:'ApproveController'
                })
                //签约
                .state('app.task.process.sign',{
                    url:'/sign/:procInstId/:taskId/:businessKey',
                    templateUrl:'module_task/tpl/apply-sign.html',
                    controller:'SignController'
                })
                //批核签约回访
                .state('app.task.process.callback',{
                    url:'/callback/:procInstId/:taskId/:businessKey',
                    templateUrl:'module_task/tpl/apply-callback.html',
                    controller:'CallBackController'
                })
                //放款复核
                .state('app.task.process.loancheck',{
                    url:'/loancheck/:procInstId/:taskId/:businessKey',
                    templateUrl:'module_task/tpl/apply-loancheck.html',
                    controller:'LoanCheckController'
                })
                //补充放款复核资料
                .state('app.task.process.supplyloancheckinfo',{
                    url:'/supplyloancheckinfo/:procInstId/:taskId/:businessKey',
                    templateUrl:'module_task/tpl/apply-supplyloancheckinfo.html',
                    controller:'SupplyLoanCheckInfoController'
                })
                //放款初审
                .state('app.task.process.prevloanapprove',{
                    url:'/prevloanapprove/:procInstId/:taskId/:businessKey',
                    templateUrl:'module_task/tpl/apply-prevloanapprove.html',
                    controller:'LoanApproveController'
                })
                //放款审批
                .state('app.task.process.loanapprove',{
                    url:'/loanapprove/:procInstId/:taskId/:businessKey',
                    templateUrl:'module_task/tpl/apply-loanapprove.html',
                    controller:'LoanApproveController'
                })
                 //复议申请
                .state('app.task.process.reconsider-apply',{
                    url:'/reconsider-apply/:procInstId/:taskId/:businessKey',
                    templateUrl:'module_task/tpl/apply-reconsider.html',
                    controller:'ReconsiderController'
                })
                //复议审核
                .state('app.task.process.reconsider-approve',{
                    url:'/reconsider-approve/:procInstId/:taskId/:businessKey',
                    templateUrl:'module_task/tpl/apply-reconsider-approve.html',
                    controller:'ReconsiderController'
                })
                //手工分单
                .state('app.task.handleassignee',{
                    url:'/handleassignee',
                    templateUrl:'module_task/tpl/handleassignee-list.html',
                    controller:'AssigneeController'
                })
                //变更申请信息
                .state('app.task.process.changeapplyinfo',{
                    url:'/changeapplyinfo/:procInstId/:taskId/:businessKey',
                    templateUrl:'module_task/tpl/apply-changeinfo.html',
                    controller:'ChangeApplyController'
                })
                //变更申请审批
                .state('app.task.process.approve-changeapplyinfo',{
                    url:'/approve-changeapplyinfo/:procInstId/:taskId/:businessKey',
                    templateUrl:'module_task/tpl/apply-approve-changeinfo.html',
                    controller:'ChangeApplyController'
                })
                //取消申请信息
                .state('app.task.process.cancelapplyinfo',{
                    url:'/cancelapplyinfo/:procInstId/:taskId/:businessKey',
                    templateUrl:'module_task/tpl/apply-cancelinfo.html',
                    controller:'ChangeApplyController'
                })
                //取消申请复核
                .state('app.task.process.approve-cancelapplyinfo',{
                    url:'/approve-cancelapplyinfo/:procInstId/:taskId/:businessKey',
                    templateUrl:'module_task/tpl/apply-approve-cancelinfo.html',
                    controller:'ChangeApplyController'
                })

        }
    ]
);