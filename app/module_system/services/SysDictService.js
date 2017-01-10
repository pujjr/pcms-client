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
        };
        this.getUnitCanSelRank = function(dictTypeCode){
            var zwjb01={'dictDataCode':'zwjb01','dictDataName':'自由职业'};
            var zwjb02={'dictDataCode':'zwjb02','dictDataName':'自雇人士'};
            var zwjb03={'dictDataCode':'zwjb03','dictDataName':'普通员工'};
            var zwjb04={'dictDataCode':'zwjb04','dictDataName':'经营者'};
            var zwjb05={'dictDataCode':'zwjb05','dictDataName':'中层管理者'};
            var zwjb06={'dictDataCode':'zwjb06','dictDataName':'高管'};
            var zwjb07={'dictDataCode':'zwjb07','dictDataName':'法人/股东'};
            switch(dictTypeCode)
            {
                //自由职业
                case 'dwlx01':
                    return [zwjb01];
                //自雇人士
                case 'dwlx02':
                    return [zwjb02];
                //个体
                case 'dwlx03':
                    return [zwjb03,zwjb04];
                //私企
                case 'dwlx04':
                    return [zwjb03,zwjb05,zwjb06,zwjb07];
                //国家机关/事业单位/国企
                case 'dwlx05':
                    return [zwjb03,zwjb05,zwjb06];
                //外资/合资企业/上市企业
                case 'dwlx06':
                    return [zwjb03,zwjb05,zwjb06,zwjb07];
                //学校/教育机构
                case 'dwlx07':
                    return [zwjb03,zwjb05,zwjb06];
            }
        }
    });
