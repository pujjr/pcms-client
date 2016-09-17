angular.module('pu.system.services')
    .service("GpsService",function($window,RestApi){
        this.queryAllGpsLvlList = function(){
            return RestApi.all("/gps").getList();
        }
    });
