angular.module('pu.assetsmanage.services')
    .service("AlterCustInfoService",function($window,RestApi,$uibModal,toaster,modal){
        this.alterTenantInfo = function(params){
            return RestApi.all("/altercustinfo/alterTenantInfo").post(params);
        };
        this.alterColesseeInfo = function(params){
            return RestApi.all("/altercustinfo/alterColesseeInfo").post(params);
        };
        this.alterLinkmanInfo = function(params){
            return RestApi.all("/altercustinfo/alterLinkmanInfo").post(params);
        };
        this.alterBankInfo = function(params){
            return RestApi.all("/altercustinfo/alterBankInfo").post(params);
        };
        this.getAlterBankInfoHisList = function(appId){
            return RestApi.all("/altercustinfo/getAlterBankInfoHisList").all(appId).getList();
        }
        this.getAlterInfoLogList = function(appId){
            return RestApi.all("/altercustinfo/getAlterInfoLogList").all(appId).getList();
        }
        this.getAlterInfoDetailList = function(logId){
            return RestApi.all("/altercustinfo/getAlterInfoDetailList").all(logId).getList();
        }
        this.doAlterTenantInfo = function(appId,applyInfo){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop: 'static',
                size: 'lg',
                templateUrl: 'module_assetsmanage/tpl/dialog-alter-tenant.html',
                controller: function ($scope, RestApi, SysDictService,modal,UnitInfoService,AlterCustInfoService,SysAreaService) {
                    $scope.appId = appId;
                    $scope.applyInfo = {};
                    $scope.newApplyInfo = {};
                    angular.copy(applyInfo,$scope.applyInfo);
                    //复制原值到新对象
                    $scope.newApplyInfo.appId = appId;
                    $scope.newApplyInfo.mobile1 = applyInfo.tenant.mobile;
                    $scope.newApplyInfo.mobile2 = applyInfo.tenant.mobile2;
                    $scope.newApplyInfo.addrProvince = applyInfo.tenant.addrProvince;
                    $scope.newApplyInfo.addrCity = applyInfo.tenant.addrCity;
                    $scope.newApplyInfo.addrCounty = applyInfo.tenant.addrCounty;
                    $scope.newApplyInfo.addrExt = applyInfo.tenant.addrExt;
                    $scope.newApplyInfo.qq = applyInfo.tenant.qq;
                    $scope.newApplyInfo.weixin = applyInfo.tenant.weixin;
                    $scope.newApplyInfo.houseOwner = applyInfo.tenant.houseOwner;
                    //可选省份
                    $scope.provinceList = SysAreaService.queryProvinceList().$object;
                    //可选市
                    SysAreaService.queryCityList($scope.applyInfo.tenant.addrProvince).then(function(response){
                        $scope.tenantCityList = response;
                        $scope.newTenantCityList = response;
                    });
                    //可选区
                    SysAreaService.queryCountyList($scope.applyInfo.tenant.addrProvince,$scope.applyInfo.tenant.addrCity).then(function(response){
                        $scope.tenantCountyList = response;
                        $scope.newTenantCountyList = response;
                    });
                    //省市变化刷新处理
                    $scope.addressCtrl = {
                        //承租人现详细地址省
                        onTenantProvinceChange : function(){
                            $scope.newApplyInfo.addrCity="";
                            $scope.newTenantCityList = SysAreaService.queryCityList($scope.newApplyInfo.addrProvince).$object;
                            $scope.newApplyInfo.addrCounty="";
                        },
                        //承租人现详细地址市
                        onTenantCityChange:function(){
                            $scope.newApplyInfo.addrCounty="";
                            $scope.newTenantCountyList = SysAreaService.queryCountyList($scope.newApplyInfo.addrProvince,$scope.newApplyInfo.addrCity).$object;
                        }
                    }
                    //住所权属可选项
                    $scope.houseOwnerList = SysDictService.queryDictDataByTypeCode("zsqs").$object;
                    $scope.ok = function () {
                        modal.confirm("操作提醒", "确认提交变更？").then(function () {
                            AlterCustInfoService.alterTenantInfo($scope.newApplyInfo).then(function () {
                                modalInstance.close();
                            })
                        })
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            return modalInstance.result;
        }
        this.doAlterColesseeInfo = function(appId,applyInfo){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop: 'static',
                size: 'lg',
                templateUrl: 'module_assetsmanage/tpl/dialog-alter-colessee.html',
                controller: function ($scope, RestApi, SysDictService,modal,UnitInfoService,AlterCustInfoService) {
                    $scope.appId = appId;
                    $scope.applyInfo = {};
                    $scope.newApplyInfo = {};
                    angular.copy(applyInfo,$scope.applyInfo);
                    //复制原值到新对象
                    $scope.newApplyInfo.appId = appId;
                    if(applyInfo.colessee!=undefined){
                        $scope.newApplyInfo.mobile = applyInfo.cloessee.mobile;
                        $scope.newApplyInfo.qq = applyInfo.cloessee.qq;
                        $scope.newApplyInfo.weixin = applyInfo.cloessee.weixin;
                    }
                    $scope.ok = function () {
                        modal.confirm("操作提醒", "确认提交变更?").then(function () {
                            AlterCustInfoService.alterColesseeInfo($scope.newApplyInfo).then(function () {
                                modalInstance.close();
                            })
                        })
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            return modalInstance.result;
        }
        this.doAlterLinkmanInfo = function(appId,applyInfo){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop: 'static',
                size: 'lg',
                templateUrl: 'module_assetsmanage/tpl/dialog-alter-linkman.html',
                controller: function ($scope, RestApi, SysDictService,modal,UnitInfoService,AlterCustInfoService) {
                    $scope.appId = appId;
                    $scope.applyInfo = {};
                    $scope.newApplyInfo = {};
                    $scope.tmpApplyInfo = {};
                    angular.copy(applyInfo,$scope.applyInfo);
                    angular.copy(applyInfo,$scope.tmpApplyInfo);
                    //复制原值到新对象
                    $scope.newApplyInfo.appId = appId;
                    //与本人关系可选项
                    $scope.relateList = SysDictService.queryDictDataByTypeCode("gx").$object;
                    $scope.ok = function () {
                        modal.confirm("操作提醒", "确认提交变更？").then(function () {
                            $scope.newApplyInfo.linkmans = $scope.tmpApplyInfo.linkmans;
                            AlterCustInfoService.alterLinkmanInfo($scope.newApplyInfo).then(function () {
                                modalInstance.close();
                            })
                        })
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            return modalInstance.result;
        }
        this.doAlterBankInfo = function(appId){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop: 'static',
                size: 'lg',
                templateUrl: 'module_assetsmanage/tpl/dialog-alter-bankinfo.html',
                controller: function ($scope, RestApi, SysDictService,modal,UnitInfoService,AlterCustInfoService,BankService,TaskService) {
                    $scope.appId = appId;
                    $scope.unionPayBankList = BankService.queryUnionPayBankInfoList().$object;
                    $scope.newInfo = {};
                    $scope.newInfo.appId = appId;
                    TaskService.querySignInfo(appId).then(function(response){
                        $scope.signContractVo = response;
                        $scope.newInfo.repayBankId = response.repayBankId;
                        $scope.newInfo.repayAcctNo = response.repayAcctNo;
                    });
                    $scope.bankInfoHisList = AlterCustInfoService.getAlterBankInfoHisList(appId).$object;
                    $scope.setDefault = function(item){
                        modal.confirm("操作提醒", "确认提交变更？").then(function () {
                            $scope.newInfo.repayBankId = item.repayBankId;
                            $scope.newInfo.repayAcctNo = item.repayAcctNo;
                            AlterCustInfoService.alterBankInfo($scope.newInfo).then(function () {
                                modalInstance.close();
                            })
                        })
                    }
                    $scope.ok = function () {
                        modal.confirm("操作提醒", "确认提交变更？").then(function () {
                            AlterCustInfoService.alterBankInfo($scope.newInfo).then(function () {
                                modalInstance.close();
                            })
                        })
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            return modalInstance.result;
        }
        this.showAlterCustInfoLogDetail = function(logId){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop: false,
                size: 'lg',
                templateUrl: 'module_assetsmanage/tpl/dialog-alter-custinfo-his-detail.html',
                controller: function ($scope, RestApi, SysDictService,modal,UnitInfoService,AlterCustInfoService,BankService,TaskService) {
                    $scope.logId = logId;
                    $scope.alterDetailList = AlterCustInfoService.getAlterInfoDetailList($scope.logId).$object;
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            return modalInstance.result;
        }
    });
