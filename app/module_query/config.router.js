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
                //经销商申请单查询
                .state('app.query.applylist',{
                    url:'/applylist',
                    templateUrl:'module_query/tpl/apply-list.html',
                    controller: 'QueryApplyController'
                })

        }
    ]
);