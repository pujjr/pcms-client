'use strict';

/* Controllers */
angular.module("pu.gpsorder.controllers")
    .controller("OrderController", function ($scope, CarCreditRestangular, $state, $rootScope, modal, toaster) {

        //获取已提交订单列表
        $scope.initList = function () {
            $scope.items = CarCreditRestangular.all("/order/getUserOrders").getList().$object;
        };

    })
;