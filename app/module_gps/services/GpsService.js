angular.module('pu.gps.services')
    .service("GpsService",function($window,RestApi){
        this.queryAllGpsLvlList = function(){
            return RestApi.all("/gps").getList();
        };
        this.addGpsLvl = function(item){
            return RestApi.all("/gps/gpslvl").post(item);
        };
        this.modifyGpsLvl = function(id,item){
            return RestApi.one("/gps/gpslvl",id).customPUT(item);
        };
        this.deleteGpsLvl = function(id){
            return RestApi.one("/gps/gpslvl",id).remove();
        };
        this.queryGpsRuleList = function(){
            return RestApi.all("/gps/gpsrule").getList();
        };
        this.addGpsRule = function(item){
            return RestApi.all("/gps/gpsrule").post(item);
        };
        this.modifyGpsRule = function(item){
            return RestApi.one("/gps/gpsrule",item.id).customPUT(item);
        };
        this.deleteGpsRule = function(id){
            return RestApi.one("/gps/gpsrule",id).remove();
        };

        this.queryEnableGpsLvlList = function(appId,salePrice,initPayPercent,product){
            var amt =0.00;
            if(product.productRule.isTotalRefinance==true){
                amt = salePrice*(initPayPercent/100);
            }else{
                amt = salePrice*(1-initPayPercent/100);
            }
            if(isNaN(amt)){
                return [];
            }
            return RestApi.one("/gps",'enablegpslvl').all(appId).all(amt).getList();
        }

        this.queryGpsSupplierList = function(enabled){
            return RestApi.all("/gps/gpssupplier").getList({'enabled':enabled});
        };
        this.addGpsSupplier = function(item){
            return RestApi.all("/gps/gpssupplier").post(item);
        };
        this.modifyGpsSupplier = function(item){
            return RestApi.one("/gps/gpssupplier",item.id).customPUT(item);
        };
        this.deleteGpsSupplier = function(id){
            return RestApi.one("/gps/gpssupplier",id).remove();
        };
    });
