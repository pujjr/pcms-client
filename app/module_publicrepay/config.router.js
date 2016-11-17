'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .config(
    ['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                //节假日管理
                .state('app.publicrepay', {
                    abstract: true,
                    url: '/publicrepay',
                    template: '<div ui-view=""></div>'
                })
                //节假日设置
                .state('app.publicrepay.list', {
                    url: '/list',
                    templateUrl:'module_holiday/tpl/holiday-setting.html',
                    controller: 'PublicRepayController'
                })

        }
    ]
);