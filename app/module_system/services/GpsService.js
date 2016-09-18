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
            return RestApi.one("/gps",'enablegpslvl').all(amt).getList();
        }
    });
