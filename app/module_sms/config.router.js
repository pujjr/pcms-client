'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .config(
    ['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                //短信管理
                .state('app.sms',{
                    url:'/sms',
                    templateUrl:'module_sms/tpl/sms-manage.html',
                    controller:'SmsController'
                })
                //短信模板管理
                .state('app.sms.template',{
                    url:'/template',
                    templateUrl:'module_sms/tpl/template-list.html',
                    controller: 'SmsTemplateController'
                })
                //短信历史记录查询
                .state('app.sms.history',{
                    url:'/history',
                    templateUrl:'module_sms/tpl/history-list.html',
                    controller: 'SmsHistoryController'
                })
        }
    ]
);