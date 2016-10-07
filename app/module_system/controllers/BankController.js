'use strict';

/* Controllers */
// signin controllers
angular.module("pu.system.controllers")
    .controller('BankController',function ($scope, $rootScope, $state, toaster, $uibModal,BankService) {
        $scope.init = function () {
            $scope.queryBankInfoList();
        };
        $scope.queryBankInfoList = function(){
            $scope.bankInfoList= BankService.queryBankInfoList(false).$object;
        }
        $scope.addBankInfo = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_system/tpl/dialog-bankinfo-add.html',
                controller:function($scope,RestApi){
                    $scope.item={};
                    $scope.ok=function(){
                        modalInstance.close($scope.item);
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                BankService.addBankInfo(response).then(function(){
                    toaster.pop('success', '操作提醒', '增加银行参数成功');
                    $scope.queryBankInfoList();
                })
            })
        };
        $scope.editBankInfo = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_system/tpl/dialog-bankinfo-edit.html',
                controller:function($scope,RestApi){
                    $scope.item=item;
                    $scope.ok=function(){
                        BankService.modifyBankInfo($scope.item).then(function(){
                            modalInstance.close('修改成功');
                        })
                    };
                    $scope.delete = function(){
                        BankService.deleteBankInfo(item.id).then(function(){
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
                $scope.queryBankInfoList();
            })
        };
    })
;