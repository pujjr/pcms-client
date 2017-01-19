'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .config(
    ['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                //催收
                .state('app.loantask.process.collection', {
                    url: '/collection/:workflowKey/:procInstId/:taskId/:businessKey/:appId',
                    templateUrl:'module_assetsmanage/tpl/collection.html',
                    controller:'CollectionController'
                })
                //审批新增催收申请
                .state('app.loantask.process.collection-approve', {
                    url: '/collection-approve/:workflowKey/:procInstId/:taskId/:businessKey/:appId',
                    templateUrl:'module_assetsmanage/tpl/collection-approve.html',
                    controller:'CollectionController'
                })
                //审批新增催收申请
                .state('app.loantask.process.recover-collection-approve', {
                    url: '/recover-collection-approve/:workflowKey/:procInstId/:taskId/:businessKey/:appId',
                    templateUrl:'module_assetsmanage/tpl/recover-collection-approve.html',
                    controller:'CollectionController'
                })
                //人收分单
                .state('app.loantask.process.collection-assignee', {
                    url: '/collection-assignee/:workflowKey/:procInstId/:taskId/:businessKey/:appId',
                    templateUrl:'module_assetsmanage/tpl/collection-assignee.html',
                    controller:'CollectionController'
                })
                //人手结案审批
                .state('app.loantask.process.collection-settle-approve', {
                    url: '/collection-handle-approve/:workflowKey/:procInstId/:taskId/:businessKey/:appId',
                    templateUrl:'module_assetsmanage/tpl/collection-settle-approve.html',
                    controller:'CollectionController'
                })
                //电话回访
                .state('app.loantask.process.tel-interview', {
                    url: '/tel-interview/:workflowKey/:procInstId/:taskId/:businessKey/:appId',
                    templateUrl:'module_assetsmanage/tpl/tel-interview.html',
                    controller:'TelInterviewController'
                })
                //已放款档案归档
                .state('app.loantask.process.loan-archive-log', {
                    url: '/loan-archive-log/:workflowKey/:procInstId/:taskId/:businessKey/:appId',
                    templateUrl:'module_assetsmanage/tpl/loan-archive-log.html',
                    controller:'ArchiveController'
                })
                //催收档案归档
                .state('app.loantask.process.collection-archive-log', {
                    url: '/collection-archive-log/:workflowKey/:procInstId/:taskId/:businessKey/:appId',
                    templateUrl:'module_assetsmanage/tpl/collection-archive-log.html',
                    controller:'ArchiveController'
                })
                //补充归档资料
                .state('app.loantask.process.archive-supply', {
                    url: '/archive-supply/:workflowKey/:procInstId/:taskId/:businessKey/:appId',
                    templateUrl:'module_assetsmanage/tpl/archive-supply.html',
                    controller:'ArchiveController'
                })
                //已放款档案归档（补充）
                .state('app.loantask.process.archive-log-supply', {
                    url: '/archive-log-supply/:workflowKey/:procInstId/:taskId/:businessKey/:appId',
                    templateUrl:'module_assetsmanage/tpl/archive-log-supply.html',
                    controller:'ArchiveController'
                })
                //保险管理
                .state('app.insurancemanage',{
                    abstract:true,
                    url:'/insurancemanage',
                    template: '<div ui-view=""></div>'
                })
                //保险理赔
                .state('app.insurancemanage.claims',{
                    url:'/claims/:appId/:insuranceId/:insuranceType',
                    templateUrl: 'module_assetsmanage/tpl/insurance-claims.html',
                    controller:'InsManageController'
                })

                //档案管理
                .state('app.archive',{
                    abstract:true,
                    url:'/archive',
                    template: '<div ui-view=""></div>'
                })
                //档案整理
                .state('app.archive.clear',{
                    url:'/clear',
                    templateUrl: 'module_assetsmanage/tpl/archive-clear-list.html',
                    controller:'ArchiveController'
                })
                //档案管理
                .state('app.archive.list',{
                    url:'/list',
                    templateUrl: 'module_assetsmanage/tpl/archive-list.html',
                    controller:'ArchiveController'
                })
                //申请档案借阅
                .state('app.archive.borrow',{
                    url:'/borrow/:appId',
                    templateUrl: 'module_assetsmanage/tpl/archive-borrow.html',
                    controller:'ArchiveController'
                })
                //申请档案审批
                .state('app.loantask.process.archive-borrow-approve', {
                    url: '/archive-borrow-approve/:workflowKey/:procInstId/:taskId/:businessKey/:appId',
                    templateUrl:'module_assetsmanage/tpl/archive-borrow-approve.html',
                    controller:'ArchiveController'
                })
                //档案借阅归还
                .state('app.loantask.process.archive-borrow-return', {
                    url: '/archive-borrow-return/:workflowKey/:procInstId/:taskId/:businessKey/:appId',
                    templateUrl:'module_assetsmanage/tpl/archive-borrow-return.html',
                    controller:'ArchiveController'
                })
                //档案借阅退回
                .state('app.loantask.process.archive-borrow-back', {
                    url: '/archive-borrow-back/:workflowKey/:procInstId/:taskId/:businessKey/:appId',
                    templateUrl:'module_assetsmanage/tpl/archive-borrow-back.html',
                    controller:'ArchiveController'
                })
                //电话来电记录管理
                .state('app.telincome',{
                    abstract:true,
                    url:'/telincome',
                    template: '<div ui-view=""></div>'
                })
                //来电记录列表查询
                .state('app.telincome.list',{
                    url:'/list',
                    templateUrl: 'module_assetsmanage/tpl/tel-income-list.html',
                    controller:'TelInterviewController'
                })
                //来电记录查看详细
                .state('app.telincome.detail',{
                    url:'/detail/:appId',
                    templateUrl: 'module_assetsmanage/tpl/tel-income-detail.html',
                    controller:'TelInterviewController'
                })
                //新增来电记录
                .state('app.telincome.add',{
                    url:'/add/:appId',
                    templateUrl: 'module_assetsmanage/tpl/tel-income-add.html',
                    controller:'TelInterviewController'
                })
        }
    ]
);