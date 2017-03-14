'use strict';

/* Controllers */
// signin controllers
angular.module("pu.product.controllers")
    .controller('ProductServiceRuleController',function ($scope, $rootScope, $state, toaster,$uibModal,modal,ProductService,SysDictService,ToolsService,TemplateService,FormService){
        $scope.init = function () {
            $scope.tplList = ProductService.getProductServiceFeeTemplateList().$object;
        };
        $scope.addServiceFeeTemplate = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                size:'md',
                templateUrl :'module_product/tpl/dialog-product-servicefee-template-add.html',
                controller:function($scope,RestApi){
                    $scope.item={};
                    $scope.ok=function(){
                        ProductService.addProductServiceFeeTemplate($scope.item).then(function(){
                            modalInstance.close('增加服务费规则模板成功');
                        })
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                toaster.pop('success', '操作提醒', response);
                $scope.init();
            })
        };
        $scope.editServiceFeeTemplate = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                size:'md',
                templateUrl :'module_product/tpl/dialog-product-servicefee-template-edit.html',
                controller:function($scope,RestApi){
                    $scope.item=item;
                    $scope.ok=function(){
                        ProductService.modifyProductServiceFeeTemplate($scope.item).then(function(){
                            modalInstance.close('修改服务费规则模板成功');
                        })
                    };
                    $scope.delete = function(){
                        modal.confirm("删除确认","是否删除"+$scope.item.tplName).then(function(){
                            ProductService.deleteProductServiceFeeTemplate($scope.item.id).then(function(){
                                modalInstance.close('删除服务费规则模板成功');
                            })
                        })
                    }
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                toaster.pop('success', '操作提醒', response);
                $scope.init();
            })
        };
        $scope.editServiceFeeRule = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                size:'lg',
                templateUrl :'module_product/tpl/dialog-product-servicefee-rule-config.html',
                controller:function($scope,RestApi){
                    $scope.item=item;
                    //查询模板现有规则
                    $scope.ruleList = ProductService.getProductServiceFeeRuleListByTplId($scope.item.id).$object;
                    $scope.ok=function(){
                        ProductService.addProductServiceFeeRule($scope.item.id,$scope.ruleList).then(function(){
                            modalInstance.close('修改服务费规则模板成功');
                        })
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                    $scope.addDetail = function(){
                        $scope.showRuleDetail().then(function(response){
                            $scope.ruleList.push(response);
                        })
                    };

                    $scope.removeDetailItem = function(index){
                        $scope.ruleList.splice(index,1);
                    }
                    $scope.showRuleDetail = function(){
                        var modalInstance = $uibModal.open({
                            animation: false,
                            backdrop: 'static',
                            size: 'md',
                            templateUrl: 'module_product/tpl/dialog-rule-detail-add.html',
                            controller: function ($scope, RestApi, modal, SysDictService) {
                                $scope.item = {};
                                $scope.ok = function () {
                                    modalInstance.close($scope.item);
                                };
                                $scope.cancel = function () {
                                    modalInstance.dismiss('cancel');
                                };
                            }
                        });
                        return modalInstance.result;
                    };
                }
            });
            modalInstance.result.then(function(response){
                toaster.pop('success', '操作提醒', response);
                $scope.init();
            })
        };

    })
;