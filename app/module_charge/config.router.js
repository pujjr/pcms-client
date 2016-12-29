'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .config(
    ['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                //报盘管理
                .state('app.charge',{
                    url:'/charge',
                    templateUrl:'module_charge/tpl/charge-manage.html',
                    controller:'ChargeController'
                })
                //待扣款明细管理
                .state('app.charge.waitingcharge',{
                    url:'/waitingcharge',
                    templateUrl:'module_charge/tpl/waitingcharge-list.html',
                    controller: 'ChargeController'
                })
                //批量文件代扣明细
                .state('app.charge.file',{
                    url:'/file',
                    templateUrl:'module_charge/tpl/filecharge-list.html',
                    controller: 'ChargeController'
                })
                //银联单笔实时代扣明细
                .state('app.charge.realtime',{
                    url:'/realtime',
                    templateUrl:'module_charge/tpl/realtimecharge-list.html',
                    controller: 'ChargeController'
                })
                //文件报盘回盘
                .state('app.charge.retoffer',{
                    url:'/retoffer',
                    templateUrl:'module_charge/tpl/retoffer-list.html',
                    controller: 'ChargeController'
                })

        }
    ]
);