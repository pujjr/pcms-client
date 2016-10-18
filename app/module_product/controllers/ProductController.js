'use strict';

/* Controllers */
// signin controllers
angular.module("pu.product.controllers")
    .controller('ProductController',function ($scope, $rootScope, $state, toaster,$uibModal,modal,ProductService,SysDictService,ToolsService,TemplateService,FormService){
        $scope.init = function () {
            $scope.queryProductTypeList();
        };
        $scope.queryProductTypeList = function(){
            ProductService.queryProductTypeList().then(function(response){
                $scope.productTypeTree=ToolsService.convertArrayToTree(response, {
                    idKey: 'id',
                    parentKey: 'parentId',
                    childrenKey: 'children'
                });
            });
        }
        $scope.$on('nodeClicked',function (event) {
            $scope.selNode=event.targetScope.treeData;
            $scope.queryProductListByProductTypeId($scope.selNode.id);
        });
        $scope.queryProductListByProductTypeId = function(productTypeId){
            $scope.productList = ProductService.queryProductListByProductTypeId($scope.selNode.id).$object;
        }
        $scope.addProductType = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_product/tpl/dialog-producttype-add.html',
                controller:function($scope,RestApi){
                    $scope.item={};
                    $scope.productTypeList = ProductService.queryProductTypeList().$object;
                    $scope.ok=function(){
                        ProductService.addProductType($scope.item).then(function(){
                            modalInstance.close('增加产品类别');
                        })
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                toaster.pop('success', '操作提醒', response);
                $scope.queryProductTypeList();
            })
        };
        $scope.editProductType = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                resolve: {
                    item: function(){
                        return item;
                    }
                },
                templateUrl :'module_product/tpl/dialog-producttype-edit.html',
                controller:function($scope,RestApi){
                    $scope.item=item;
                    $scope.productTypeList = ProductService.queryProductTypeList().$object;
                    $scope.ok=function(){
                        ProductService.modifyProductType($scope.item).then(function(){
                            modalInstance.close('修改产品类别');
                        })
                    };
                    $scope.delete = function(){
                        modal.confirm("删除确认","是否删除"+item.productTypeName).then(function(){
                            ProductService.deleteProductType($scope.item.id).then(function(){
                                modalInstance.close('删除产品类别成功');
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
                $scope.queryProductTypeList();
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
                    $scope.productRuleList = ProductService.queryProductRuleList().$object;
                    $scope.dirTemplateList = TemplateService.queryTemplateList(true).$object;
                    $scope.formTemplateList = FormService.queryFormFieldTemplateList().$object;
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
                    $scope.productRuleList = ProductService.queryProductRuleList().$object;
                    $scope.dirTemplateList = TemplateService.queryTemplateList(true).$object;
                    $scope.formTemplateList = FormService.queryFormFieldTemplateList().$object;
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
        };
        $scope.configProductSettle = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'true',
                size:'lg',
                resolve: {
                    item: function(){
                        return item;
                    }
                },
                templateUrl :'module_product/tpl/dialog-productsettle-config.html',
                controller:function($scope,RestApi){
                    $scope.item = item;
                    $scope.productSettleList = ProductService.queryProductSettleList($scope.item.id).$object;
                    $scope.ok=function(){
                        ProductService.saveProductSettleList($scope.item.id,$scope.productSettleList).then(function(){
                            modalInstance.close('配置产品贷款期限成功');
                        })
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                toaster.pop('success', '操作提醒', response);
                $scope.queryProductListByProductTypeId(item.id);
            })
        };
        $scope.configProductPeriod = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'true',
                size:'lg',
                resolve: {
                    item: function(){
                        return item;
                    }
                },
                templateUrl :'module_product/tpl/dialog-productperiod-config.html',
                controller:function($scope,RestApi){
                    $scope.item = item;
                    $scope.productPeriodList = ProductService.queryProductPeriodList($scope.item.id).$object;
                    $scope.ok=function(){
                        ProductService.saveProductPeriodList($scope.item.id,$scope.productPeriodList).then(function(){
                            modalInstance.close('配置产品融资期限成功');
                        })
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                toaster.pop('success', '操作提醒', response);
                $scope.queryProductListByProductTypeId(item.id);
            })
        };
    })
;