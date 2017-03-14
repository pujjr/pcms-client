angular.module('pu.product.services')
    .service("ProductService",function($window,RestApi,$uibModal,ToolsService){
        this.queryProductTypeList = function(){
            return RestApi.all("/product/producttype").getList();
        };
        this.addProductType = function(item){
            return RestApi.all("/product/producttype").post(item);
        };
        this.modifyProductType = function(item){
            return RestApi.one("/product/producttype",item.id).customPUT(item);
        };
        this.deleteProductType = function(id){
            return RestApi.one("/product/producttype",id).remove();
        }
        this.queryProductListByProductTypeId = function(productTypeId){
            return RestApi.one("/product/producttype",productTypeId).all("/product").getList();
        };
        this.addProduct = function(item){
            return RestApi.all("/product").post(item);
        };
        this.modifyProduct = function(item){
            return RestApi.one("/product",item.id).customPUT(item);
        };
        this.deleteProduct = function(id) {
            return RestApi.one("/product", id).remove();
        };
        this.queryProduct = function(id){
            return RestApi.one("/product", id).get();
        }
        this.queryProductRuleList = function(param){
            return RestApi.all("/product/productrule").getList(param);
        };
        this.addProductRule = function(item){
            return RestApi.all("/product/productrule").post(item);
        };
        this.modifyProductRule = function(item){
            return RestApi.one("/product/productrule",item.id).customPUT(item);
        };
        this.deleteProductRule = function(id){
            return RestApi.one("/product/productrule",id).remove();
        };
        this.queryProductSettleList = function(productId){
            return RestApi.one("/product",productId).all("/productsettle").getList();
        };
        this.saveProductSettleList = function(productId,list){
            return RestApi.one("/product",productId).all("/productsettle").post(list);
        };
        this.queryProductPeriodList = function(productId){
            return RestApi.one("/product",productId).all("/productperiod").getList();
        };
        this.saveProductPeriodList = function(productId,list){
            return RestApi.one("/product",productId).all("/productperiod").post(list);
        }
        this.queryAllEnableProductList = function(){
            return RestApi.all("/product/enable").getList();
        };
        this.queryBranchEnableProductList = function(){
            return RestApi.all("/product/branchenable").getList();
        };
        this.queryBranchEnableProductListByBranchCode = function(branchCode){
            return RestApi.all("/product/branchenable").all(branchCode).getList();
        };
        this.queryProductFormRequiredMap = function(productId){
            return RestApi.one("/product/getProductFormRequiredMap",productId).get();
        };
        this.queryAllProductList = function(){
            return RestApi.all("/product/getAllProductList").getList();
        };
        this.getProductExtendPeriodList = function(productCode,curPeriod){
            return RestApi.all("/product/getProductExtendPeriodList").all(productCode).all(curPeriod).getList();
        };
        this.getProductServiceFeeTemplateList = function(){
            return RestApi.all("/product/getProductServiceFeeTemplateList").getList();
        };
        this.addProductServiceFeeTemplate = function(param){
            return RestApi.all("/product/addProductServiceFeeTemplate").post(param);
        };
        this.modifyProductServiceFeeTemplate = function(item){
            return RestApi.one("/product/modifyProductServiceFeeTemplate",item.id).customPUT(item);
        };
        this.deleteProductServiceFeeTemplate = function(id){
            return RestApi.one("/product/deleteProductServiceFeeTemplate",id).remove();
        };
        this.getProductServiceFeeRuleListByTplId = function(tplId){
            return RestApi.all("/product/getProductServiceFeeRuleListByTplId").all(tplId).getList();
        };
        this.addProductServiceFeeRule = function(tplId,param){
            return RestApi.all("/product/addProductServiceFeeRule").all(tplId).post(param);
        }
    });
