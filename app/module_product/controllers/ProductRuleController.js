'use strict';

/* Controllers */
// signin controllers
angular.module("pu.product.controllers")
    .controller('ProductRuleController',function ($scope, $rootScope, $state, toaster,$uibModal,modal,ProductService,ToolsService){
        $scope.init = function () {
            $scope.queryProductRuleList();
        };
        $scope.queryProductRuleList = function(){
            $scope.productRuleList = ProductService.queryProductRuleList().$object;
        }
        $scope.pageChanged = function(){
            $scope.queryProductRuleList();
        }
        $scope.addProductRule = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                size:'lg',
                templateUrl :'module_product/tpl/dialog-productrule-add.html',
                controller:function($scope,RestApi){
                    $scope.item={};
                    $scope.serviceFeeTplList = ProductService.getProductServiceFeeTemplateList().$object;
                    $scope.ok=function(){
                        ProductService.addProductRule($scope.item).then(function(){
                            modalInstance.close('增加产品规则成功');
                        })
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                toaster.pop('success', '操作提醒', response);
                $scope.queryProductRuleList();
            })
        };
        $scope.editProductRule = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                size:'lg',
                resolve: {
                    item: function(){
                        return item;
                    }
                },
                templateUrl :'module_product/tpl/dialog-productrule-edit.html',
                controller:function($scope,RestApi){
                    $scope.item=item;
                    $scope.serviceFeeTplList = ProductService.getProductServiceFeeTemplateList().$object;
                    $scope.ok=function(){
                        ProductService.modifyProductRule($scope.item).then(function(){
                            modalInstance.close('修改产品规则类别');
                        })
                    };
                    $scope.delete = function(){
                        modal.confirm("删除确认","是否删除"+$scope.item.ruleName).then(function(){
                            ProductService.deleteProductRule($scope.item.id).then(function(){
                                modalInstance.close('删除产品规则成功');
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
                $scope.queryProductRuleList();
            })
        };

        $scope.addProduct = function(selNode){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                size:'lg',
                resolve: {
                    selNode: function(){
                        return selNode;
                    }
                },
                templateUrl :'module_product/tpl/dialog-product-add.html',
                controller:function($scope,RestApi){
                    $scope.selNode = selNode;
                    $scope.item={};
                    $scope.item.productTypeId = $scope.selNode.id;
                    $scope.productTypeList = ProductService.queryProductTypeList().$object;
                    $scope.fktjList = SysDictService.queryDictDataByTypeCode("fktj").$object;
                    $scope.hkfsList = SysDictService.queryDictDataByTypeCode("hkfs").$object;
                    $scope.ok=function(){
                        ProductService.addProduct($scope.item).then(function(){
                            modalInstance.close('增加产品成功');
                        })
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                toaster.pop('success', '操作提醒', response);
                $scope.queryProductListByProductTypeId($scope.selNode.id);
            })
        };
        $scope.editProduct = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                size:'lg',
                resolve: {
                    item: function(){
                        return item;
                    }
                },
                templateUrl :'module_product/tpl/dialog-product-edit.html',
                controller:function($scope,RestApi){
                    $scope.item=item;
                    $scope.productTypeList = ProductService.queryProductTypeList().$object;
                    $scope.fktjList = SysDictService.queryDictDataByTypeCode("fktj").$object;
                    $scope.hkfsList = SysDictService.queryDictDataByTypeCode("hkfs").$object;
                    $scope.ok=function(){
                        ProductService.modifyProduct($scope.item).then(function(){
                            modalInstance.close('修改产品信息成功');
                        })
                    };
                    $scope.delete = function(){
                        modal.confirm("删除确认","是否删除"+item.productName).then(function(){
                            ProductService.deleteProduct(item.id).then(function(){
                                modalInstance.close('删除产品信息成功');
                            })
                        })
                    }
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                toaster.pop('success', '操作提醒',response );
                $scope.queryProductListByProductTypeId($scope.selNode.id);
            })
        }
    })
;