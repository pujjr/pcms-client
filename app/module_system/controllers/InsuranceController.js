'use strict';

/* Controllers */
// signin controllers
angular.module("pu.system.controllers")
    .controller('InsuranceController',function ($scope, $rootScope, $state, toaster, $uibModal,InsuranceService) {
        $scope.init = function () {
            $scope.queryInsuranceCompanyList();
        };
        $scope.queryInsuranceCompanyList = function(){
            $scope.insuranceCompanyList= InsuranceService.queryInsuranceCompanyList(false).$object;
        }
        $scope.addInsuranceCompany = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_system/tpl/dialog-insurancecompany-add.html',
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
                InsuranceService.addInsuranceCompany(response).then(function(){
                    toaster.pop('success', '操作提醒', '增加成功');
                    $scope.queryInsuranceCompanyList();
                })
            })
        };
        $scope.editInsuranceCompany = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_system/tpl/dialog-insurancecompany-edit.html',
                controller:function($scope,RestApi){
                    $scope.item=item;
                    $scope.ok=function(){
                        InsuranceService.modifyInsuranceCompany($scope.item).then(function(){
                            modalInstance.close('修改成功');
                        })
                    };
                    $scope.delete = function(){
                        InsuranceService.deleteInsuranceCompany(item.id).then(function(){
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
                $scope.queryInsuranceCompanyList();
            })
        };
    })
;