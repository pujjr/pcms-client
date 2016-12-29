'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .config(
    ['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                //GPS管理
                .state('app.gps',{
                    url:'/gps',
                    templateUrl:'module_gps/tpl/gps-manage.html',
                    controller:'GpsController'
                })
                //GPS供应商参数管理
                .state('app.gps.gpssupplier',{
                    url:'/gpssupplier',
                    templateUrl:'module_gps/tpl/gpssupplier-list.html',
                    controller: 'GpsSupplierController'
                })
                //GPS档位管理
                .state('app.gps.gpslvl',{
                    url:'/gpslvl',
                    templateUrl:'module_gps/tpl/gpslvl-list.html',
                    controller: 'GpsLvlController'
                })
                //GPS档位规则管理
                .state('app.gps.gpsrule',{
                    url:'/gpsrule',
                    templateUrl:'module_gps/tpl/gpsrule-list.html',
                    controller: 'GpsRuleController'
                })

        }
    ]
);