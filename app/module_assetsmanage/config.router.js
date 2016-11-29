'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .config(
    ['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                //电话催收
                .state('app.loantask.process.phone-collection', {
                    url: '/phone-collection/:workflowKey/:procInstId/:taskId/:businessKey/:appId',
                    templateUrl:'module_assetsmanage/tpl/phone-collection.html',
                    controller:'CollectionController'
                })
        }
    ]
);