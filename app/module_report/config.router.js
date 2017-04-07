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
                //催收记录
                .state('app.report.collection-log', {
                    url: '/collection-log',
                    templateUrl: 'module_report/tpl/collection-log.html',
                    controller: 'ReportController',
                })
                //逾期催收数据
                .state('app.report.overdue-collection', {
                    url: '/overdue-collection',
                    templateUrl: 'module_report/tpl/overdue-collection.html',
                    controller: 'ReportController',
                })

        }
    ]
);