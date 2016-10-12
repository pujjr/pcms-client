angular.module('pu.system.services')
    .service("SysAreaService",function($window,RestApi){
        this.querySysAreaList = function(){
            return RestApi.all("/sysarea").getList();
        };
        this.addSysArea = function(item){
            return RestApi.all("/sysarea").post(item);
        }
        this.querySysAreaListByParentId = function(parentId){
            return RestApi.one("/sysarea",parentId).all("/subsysarea").getList();
        };
        this.modifySysArea = function(item){
            return RestApi.one("/sysarea",item.id).customPUT(item);
        };
        this.deleteSysArea = function(id){
            return RestApi.one("/sysarea",id).remove();
        };
        this.queryProvinceList = function(){
            return RestApi.all("/sysarea/province").getList();
        };
        this.queryCityList = function(provinceId){
            if(provinceId==null || provinceId ==undefined){
                return null;
            }
            return RestApi.one("/sysarea/province",provinceId).all("city").getList();
        };
        this.queryCountyList = function(provinceId,cityId){
            if(provinceId==null || provinceId ==undefined||cityId== null || cityId==undefined || provinceId==''||cityId==''){
                return  null;
            }
            return RestApi.one("/sysarea/province",provinceId).one("/city",cityId).all("county").getList();
        }
    });
