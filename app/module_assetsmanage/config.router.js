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
                //人手结案
                .state('app.loantask.process.collection-handle-approve', {
                    url: '/collection-handle-approve/:workflowKey/:procInstId/:taskId/:businessKey/:appId',
                    templateUrl:'module_assetsmanage/tpl/collection-handle-approve.html',
                    controller:'CollectionController'
                })
        }
    ]
);