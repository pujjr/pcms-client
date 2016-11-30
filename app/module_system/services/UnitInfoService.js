angular.module('pu.system.services')
    .service("UnitInfoService",function($window,RestApi){
        this.getUnitInfoList = function(enabled,unitType){
            return RestApi.all("/unitinfo").getList({'enabled':enabled,'unitType':unitType});
        };
        this.addUnitInfo = function(item){
            return RestApi.all("/unitinfo").post(item);
        };
        this.modifyUnitInfo = function(item){
            return RestApi.one("/unitinfo",item.id).customPUT(item);
        };
        this.deleteUnitInfo = function(id){
            return RestApi.one("/unitinfo",id).remove();
        };
    });
