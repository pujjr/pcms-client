'use strict';

/* Controllers */
angular.module("pu.gpsorder.controllers")
    .controller("OrderController", function ($scope, RestApi, $state,$stateParams, $rootScope, modal, toaster,LxDialogService) {

        //获取已提交订单列表
        $scope.initList = function () {
            $scope.items = RestApi.all("/order/getUserOrders").getList().$object;
        };
        //初始化订单创建
        $scope.initCreateOrder=function(){
            $scope.order={};
            $scope.order.orderDetails=[];
            RestApi.one("/order/genOrderId").get().then(function(response){
                $scope.order.id=response.id;
            });
        }
        //增加订单明细
        $scope.addOrderDetail = function(){
            $scope.orderDetail={};
            $scope.jxs = RestApi.all("/branchs/list").getList().$object;
            $scope.factory = RestApi.all("/branchs/list").getList().$object;
            LxDialogService.open("detaildlg");
        }
        $scope.$on("lx-dialog__close-start",function(event,dialogId){
            $scope.order.orderDetails.push($scope.orderDetail);
        })
        //初始化编辑订单明细
        $scope.editOrder = function(item){
           RestApi.one("/order",item.id).get().then(function(response){
               $scope.order = response;
               $state.go("app.order.edit");
           })
        }
        //删除订单明细
        $scope.deleteOrder = function(item){
            modal.confirm("操作提醒","确认删除订单"+item.orderTitle).then(function(){
                RestApi.one("/order",item.id).remove().then(function(response){
                    toaster.pop('success', '操作提醒', '删除订单成功');
                    $scope.initList();
                })
            })
        }
        //保存订单
        $scope.saveOrder = function() {
            RestApi.all("/order").post($scope.order).then(function(response){
                toaster.pop('success', '操作提醒', '保存订单成功');
                $state.go("app.order.list");
            })
        }

        //提交订单
        $scope.commitOrder = function(){
            RestApi.all("/order/commit").post($scope.order).then(function(response){
                toaster.pop('success', '操作提醒', '提交订单成功');
                $state.go("app.order.list");
            })
        }
        //初始化审批订单
        $scope.initApproveOrder = function(){
            RestApi.one("/order",item.id).get().then(function(response){
                $scope.order = response;
            })
        }

    })
;