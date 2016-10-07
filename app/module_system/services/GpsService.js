angular.module('pu.system.services')
    .service("GpsService",function($window,RestApi){
        this.queryAllGpsLvlList = function(){
            return RestApi.all("/gps").getList();
        };
        this.queryEnableGpsLvlList = function(salePrice,initPayPercent,product){
            var amt =0.00;
            if(product.productRule.isTotalRefinance==true){
                amt = salePrice*(initPayPercent/100);
            }else{
                amt = salePrice*(1-initPayPercent/100);
            }
            if(isNaN(amt)){
                return [];
            }
            return RestApi.one("/gps",'enablegpslvl').all(amt).getList();
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
        }
    });
