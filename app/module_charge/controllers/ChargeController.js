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
        $scope.goRetoffer = function(){
            $state.go('app.charge.retoffer');
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
                    $scope.initFileCharge();
                    var ossKey = response.ossKey;
                    var link = document.createElement('a');
                    link.href=SERVER_URL.OSS_URL+ossKey;
                    link.click();
                    window.URL.revokeObjectURL(link.href);

                })
            })
        };
        $scope.initRetofferCharge = function(){
            $scope.offerBatchList = ChargeService.getManualOfferHisList().$object;
        };
        $scope.doFileRetOffer = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_charge/tpl/dialog-retoffer-upload.html',
                controller:function($scope,RestApi,$q){
                    var defered = $q.defer();
                    $scope.item={};
                    $scope.ok=function(){

                        modalInstance.close(file.files[0]);
                    };
                    $scope.close=function(){
                        modalInstance.dismiss('cancel');
                    }
                }
            });
            modalInstance.result.then(function(response){
                var filedata = new FormData();
                filedata.append('file', file.files[0]);
                ChargeService.doFileRetOffer(filedata).then(function(response){
                    toaster.pop('success', '操作提醒',"回盘成功");
                    $scope.initRetofferCharge();
                });
            })
        }
    })
;