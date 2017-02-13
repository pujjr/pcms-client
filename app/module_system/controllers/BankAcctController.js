'use strict';

/* Controllers */
// signin controllers
angular.module("pu.system.controllers")
    .controller('BankAcctController',function ($scope, $rootScope, $state, toaster, $uibModal,BankService,SysDictService) {
        $scope.init = function () {
            $scope.queryBankAcctInfoList();
        };
        $scope.queryBankAcctInfoList = function(){
            $scope.bankAcctInfoList= BankService.getBankAcctInfoList("",false).$object;
        }
        $scope.addBankAcctInfo = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_system/tpl/dialog-bankacctinfo-add.html',
                controller:function($scope,RestApi){
                    $scope.item={};
                    $scope.bankList = BankService.queryBankInfoList(false).$object;
                    $scope.acctPurposeList = SysDictService.queryDictDataByTypeCode("yhzhyt").$object;
                    $scope.ok=function(){
                        modalInstance.close($scope.item);
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                BankService.addBankAcctInfo(response).then(function(){
                    toaster.pop('success', '操作提醒', '增加银行账号成功');
                    $scope.queryBankAcctInfoList();
                })
            })
        };
        $scope.editBankAcctInfo = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_system/tpl/dialog-bankacctinfo-edit.html',
                controller:function($scope,RestApi){
                    $scope.item=item;
                    $scope.bankList = BankService.queryBankInfoList(false).$object;
                    $scope.acctPurposeList = SysDictService.queryDictDataByTypeCode("yhzhyt").$object;
                    $scope.ok=function(){
                        BankService.modifyBankAcctInfo($scope.item).then(function(){
                            modalInstance.close('修改成功');
                        })
                    };
                    $scope.delete = function(){
                        BankService.deleteBankAcctInfo(item.id).then(function(){
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
                $scope.queryBankAcctInfoList();
            })
        };
    })
;