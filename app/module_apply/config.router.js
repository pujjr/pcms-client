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
                //新增申请单
                .state('app.apply.add',{
                    url:'/add',
                    templateUrl:'module_apply/tpl/apply-add.html',
                    controller:'ApplyController'
                })
                //编辑申请单
                .state('app.apply.edit',{
                    url:'/edit/:appId',
                    templateUrl:'module_apply/tpl/apply-edit.html',
                    controller:'ApplyController'
                })
                //分单
                .state('app.apply.taskassignee',{
                    url:'/taskassignee',
                    templateUrl:'module_apply/tpl/apply-handleassignee.html',
                    controller:'ApplyController'
                })
                //审核
                .state('app.apply.check',{
                    url:'/check/:id',
                    templateUrl:'module_apply/tpl/apply-check.html',
                    controller:'ApplyController'
                })
                //一级审批
                .state('app.apply.approvelvl1',{
                    url:'/approvelvl1/:id',
                    templateUrl:'module_apply/tpl/apply-approvelvl1.html',
                    controller:'ApplyController'
                })
        }
    ]
);