'use strict';

/* Controllers */
angular.module("pu.contract.controllers")
    .controller('ContractTemplateController',function ($scope, $rootScope, $state, toaster, $uibModal,ContractService) {
        $scope.init = function () {
            $scope.queryContractTemplateList();
        };
        $scope.queryContractTemplateList = function(){
            $scope.contractTemplateList= ContractService.queryContractTemplateList(false).$object;
        }
        $scope.addContractTemplate = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_contract/tpl/dialog-contracttemplate-add.html',
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
                ContractService.addContractTemplate(response).then(function(){
                    toaster.pop('success', '操作提醒', '增加成功');
                    $scope.queryContractTemplateList();
                })
            })
        };
        $scope.editContractTemplate = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_contract/tpl/dialog-contracttemplate-edit.html',
                controller:function($scope,RestApi){
                    $scope.item=item;
                    $scope.ok=function(){
                        ContractService.modifyContractTemplate($scope.item).then(function(){
                            modalInstance.close('修改成功');
                        })
                    };
                    $scope.delete = function(){
                        ContractService.deleteContractTemplateById(item.id).then(function(){
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
                $scope.queryContractTemplateList();
            })
        };
        $scope.setTemplateRefContract = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_contract/tpl/dialog-setTemplateRefContract.html',
                controller:function($scope,RestApi){
                    $scope.item=item;
                    $scope.contractInfoList= ContractService.queryContractInfoList().$object;
                    ContractService.queryContractInfoListByContractTemplateId($scope.item.id).then(function(response){
                        $scope.templateContractList = response;
                    })
                    $scope.ok=function(){
                        ContractService.saveContractTemplateRefContractList($scope.item.id,$scope.templateContractList).then(function(){
                            modalInstance.close('设置成功');
                        })
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                toaster.pop('success', '操作提醒', response);
                $scope.queryContractTemplateList();
            })
        }
    })
;