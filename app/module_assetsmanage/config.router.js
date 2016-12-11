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
                //人手结案
                .state('app.loantask.process.collection-handle-approve', {
                    url: '/collection-handle-approve/:workflowKey/:procInstId/:taskId/:businessKey/:appId',
                    templateUrl:'module_assetsmanage/tpl/collection-handle-approve.html',
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
                //电话记录
                .state('app.telincome',{
                    abstract:true,
                    url:'/telincome',
                    template: '<div ui-view=""></div>'
                })
                //保险理赔
                .state('app.telincome.add',{
                    url:'/add/:appId',
                    templateUrl: 'module_assetsmanage/tpl/tel-income-add.html',
                    controller:'TelInterviewController'
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
        }
    ]
);