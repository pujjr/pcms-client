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
                .state('app.holiday', {
                    abstract: true,
                    url: '/holiday',
                    template: '<div ui-view=""></div>'
                })
                //节假日设置
                .state('app.holiday.setting', {
                    url: '/setting',
                    templateUrl:'module_holiday/tpl/holiday-setting.html',
                    controller: 'HolidayController'
                })

        }
    ]
);