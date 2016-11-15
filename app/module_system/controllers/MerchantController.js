'use strict';

/* Controllers */
// signin controllers
angular.module("pu.system.controllers")
    .controller('MerchantController',function ($scope, $rootScope, $state, toaster, $uibModal,MerchantService,BankService) {
        $scope.init = function () {
            $scope.queryMerchantList();
        };
        $scope.queryMerchantList = function(){
            $scope.merchantList= MerchantService.queryMerchantList(false).$object;
        }
        $scope.addMerchant = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_system/tpl/dialog-merchant-add.html',
                controller:function($scope,RestApi){
                    $scope.item={};
                    $scope.bankList = BankService.queryBankInfoList(false).$object;
                    $scope.ok=function(){
                        modalInstance.close($scope.item);
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                MerchantService.addMerchant(response).then(function(){
                    toaster.pop('success', '操作提醒', '增加商户成功');
                    $scope.queryMerchantList();
                })
            })
        };
        $scope.editMerchant = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_system/tpl/dialog-merchant-edit.html',
                controller:function($scope,RestApi){
                    $scope.item=item;
                    $scope.bankList = BankService.queryBankInfoList(false).$object;
                    $scope.ok=function(){
                        MerchantService.modifyMerchant($scope.item).then(function(){
                            modalInstance.close('修改成功');
                        })
                    };
                    $scope.delete = function(){
                        MerchantService.deleteMerchant(item.id).then(function(){
                            modalInstance.close('删除成功');
                        })
                    }
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                toaster.pop('success', '操作提醒', response);
                $scope.queryMerchantList();
            })
        };
    })
;