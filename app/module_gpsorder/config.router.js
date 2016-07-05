'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .config(
    ['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                //GPS订单采购
                .state('app.order', {
                    abstract: true,
                    url: '/order',
                    template: '<div ui-view=""></div>',
                    controller: 'OrderController'
                })
                //GPS订单采购-订单管理
                .state('app.order.list', {
                    url: '/list',
                    templateUrl: 'module_gpsorder/tpl/order-list.html'
                })

        }
    ]
);