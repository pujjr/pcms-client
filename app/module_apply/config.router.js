'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .config(
    ['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                //申请单录入
                .state('app.apply', {
                    url: '/apply',
                    abstract: true,
                    template:'<div ui-view=""></div>'
                })
                .state('app.apply.list',{
                    url:'/list',
                    templateUrl:'module_apply/tpl/apply-list.html',
                    controller:'ApplyController'
                })
                .state('app.apply.add',{
                    url:'/add',
                    templateUrl:'module_apply/tpl/apply-add.html',
                    controller:'ApplyController'
                })
                //审核
                .state('app.apply.check',{
                    url:'/check/:id',
                    templateUrl:'module_apply/tpl/apply-check.html',
                    controller:'ApplyController'
                })
        }
    ]
);