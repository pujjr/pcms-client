'use strict';

/* Controllers */
// signin controllers
angular.module("pu.charge.controllers")
    .controller('ChargeController',function ($scope, $rootScope, $state, toaster, $uibModal,ChargeService,MerchantService) {
        $scope.goWaitingCharge = function(){
            $state.go('app.charge.waitingcharge');
        };
        $scope.goFileCharge = function(){
            $state.go('app.charge.file');
        };
        $scope.goRealtimeCharge = function(){
            $state.go('app.charge.realtime');
        };
        $scope.initWaitingCharge = function(){
            $scope.enableChargeList = ChargeService.getEnableChargeList().$object;
        }
        $scope.setAllToFileCharge = function(){
            ChargeService.setChargeMode(null,"kkfs01").then(function(response){
                toaster.pop('success', '操作提醒',"加入批量文件报盘成功");
                $scope.initWaitingCharge();
            })
        };
        $scope.initFileCharge = function(){
            $scope.manualOfferList = ChargeService.getWatingOfferChargeList("kkfs01").$object;
        };
        $scope.initRealtimeCharge = function(){
            $scope.realtimeOfferList = ChargeService.getWatingOfferChargeList("kkfs02").$object;
        };
        $scope.confirmManualOffer = function(){
            MerchantService.selectMerchant().then(function(response){
                ChargeService.confirmManualOffer(response.merchantNo).then(function(response){

                })
            })

        }
    })
;