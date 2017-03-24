'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .config(
    ['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                //报表管理
                .state('app.report', {
                    abstract: true,
                    url: '/report',
                    template: '<div ui-view=""></div>'
                })
                //报表列表
                .state('app.report.list', {
                    url: '/list',
                    templateUrl:'module_report/tpl/report-list.html',
                    controller: 'ReportController'
                })
                //征信报表
                .state('app.report.credit', {
                    url: '/credit',
                    templateUrl: 'module_report/tpl/credit_report.html',
                    controller: 'ReportController',
                })

        }
    ]
);