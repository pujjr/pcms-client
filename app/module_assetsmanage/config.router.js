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
        }
    ]
);