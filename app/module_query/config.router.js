'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .config(
    ['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                //查询管理
                .state('app.query',{
                    abstract:true,
                    url:'/query',
                    template: '<div ui-view=""></div>',
                    controller:'QueryController'
                })
                //查询申请单列表
                .state('app.query.applylist',{
                    url:'/applylist',
                    templateUrl:'module_query/tpl/apply-list.html',
                    controller: 'QueryApplyController'
                })
                //经销商查询申请单列表
                .state('app.query.applylist-dealer',{
                    url:'/applylist-dealer',
                    templateUrl:'module_query/tpl/apply-list-dealer.html',
                    controller: 'QueryApplyController'
                })
                //查询申请单详细信息
                .state('app.query.apply',{
                    abstract:true,
                    url:'/apply',
                    template: '<div ui-view=""></div>',
                    controller: 'ApplyController'
                })
                //查询申请信息
                .state('app.query.apply.detail',{
                    url:'/detail/:appId',
                    templateUrl:'module_query/tpl/apply-detail.html',
                    controller: 'QueryApplyController'
                })
                //经销商查询申请信息
                .state('app.query.apply.detail-dealer',{
                    url:'/detail-dealer/:appId',
                    templateUrl:'module_query/tpl/apply-detail-dealer.html',
                    controller: 'QueryApplyController'
                })
        }
    ]
);