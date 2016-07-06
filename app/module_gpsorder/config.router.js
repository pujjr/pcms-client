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
                //GPS订单采购-增加订单
                .state('app.order.add', {
                    url: '/add',
                    templateUrl: 'module_gpsorder/tpl/order-add.html'
                })
                //GPS订单采购-编辑订单
                .state('app.order.edit', {
                    url: '/edit',
                    templateUrl: 'module_gpsorder/tpl/order-edit.html'
                })
                //GPS订单采购-审批订单
                .state('app.order.approve', {
                    url: '/approve/:orderId',
                    templateUrl: 'module_gpsorder/tpl/order-approve.html'
                })

        }
    ]
);