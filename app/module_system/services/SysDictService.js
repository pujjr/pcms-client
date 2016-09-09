angular.module('pu.system.services')
    .service("SysDictService",function($window,RestApi){
        this.querySysDictTypeList = function(){
            return RestApi.all("/sysdict/dicttype").getList();
        };
        this.addSysDictType = function(item){
            return RestApi.all("/sysdict/dicttype").post(item);
        };
        this.queryDictDataListByDictTypeId = function(dictTypeId){
            return RestApi.one("/sysdict/dicttype",dictTypeId).all("/dictdata").getList();
        };
        this.modifySysDictType = function(item){
            return RestApi.one("/sysdict/dicttype",item.id).customPUT(item);
        };
        this.deleteSysDictType = function(id){
            return RestApi.one("/sysdict/dicttype",id).remove();
        }
        this.addSysDictData = function(item){
            return RestApi.all("/sysdict/dictdata").post(item);
        };
        this.deleteSysDictData = function(id){
            return RestApi.one("/sysdict/dictdata",id).remove();
        };
        this.modifySysDictData = function(item){
            return RestApi.one("/sysdict/dictdata",item.id).customPUT(item);
        };
        this.queryDictDataByTypeCode = function(dictTypeCode){
            return RestApi.one("/sysdict/dicttypecode",dictTypeCode).all("dictdata").getList();
        }
    });
