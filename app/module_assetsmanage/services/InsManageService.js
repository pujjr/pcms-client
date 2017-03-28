angular.module('pu.assetsmanage.services')
    .service("InsManageService",function($window,RestApi,$uibModal,toaster,ChargeService){
        this.getInsuranceHisList = function(appId){
            return RestApi.all("/insmanage/getInsuranceHisList").all(appId).getList();
        };
        this.createInsuranceContinueTask = function(appId){
            return RestApi.all("/insmanage/createInsuranceContinueTask").all(appId).post();
        };
        this.addInsurance = function(appId,signId,insType,params,files){
            return RestApi.all("/insmanage/addInsurance").all(appId).all(signId).all(insType).withHttpConfig({transformRequest: angular.identity})
                .post(files, params, {'Content-Type': undefined});
        };
        this.commitInsuranceContinue = function(taskId){
            return RestApi.all("/insmanage/commitInsuranceContinue").all(taskId).post();
        };
        this.getInsuranceHisById = function(id){
            return RestApi.one("/insmanage/getInsuranceHisById",id).get();
        };
        this.addInsuranceClaims = function(appId,insuranceId,params){
            return RestApi.all("/insmanage/addInsuranceClaims").all(appId).all(insuranceId).post(params);
        }
        this.updateInsuranceHisInfo = function(param){
            return RestApi.all("/insmanage/updateInsuranceHisInfo").all(param.id).customPUT(param);
        }
        this.deleteInsuranceHisInfo = function(id){
            return RestApi.one("/insmanage/deleteInsuranceHisInfo",id).remove();
        }
        this.addBusinessInsurance = function(appId,signId,insType){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop: 'static',
                size: 'lg',
                templateUrl: 'module_assetsmanage/tpl/dialog-insurance-add.html',
                controller: function ($scope, RestApi, SysDictService,modal,InsManageService,InsuranceService) {
                    $scope.appId = appId;
                    $scope.signId = signId;
                    $scope.insType = insType;
                    //获取保险公司
                    $scope.insuranceCompanyList = InsuranceService.queryInsuranceCompanyList(true).$object;
                    $scope.applyVo = {};
                    $scope.attachment={};
                    $scope.ok = function () {
                        modal.confirm("操作提醒", "确认提交？").then(function () {
                            var filedata = new FormData();
                            angular.forEach($scope.attachment.files,function(item){
                                filedata.append('file', item);
                            })
                            InsManageService.addInsurance($scope.appId,$scope.signId,$scope.insType, $scope.applyVo,filedata).then(function () {
                                modalInstance.close();
                            })
                        })
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                    $scope.openInsuranceUrl = function(){
                        var key =$scope.applyVo.insCompanyId;
                        var url="";
                        for(var i = 0 ;i<$scope.insuranceCompanyList.length;i++){
                            if(key == $scope.insuranceCompanyList[i].id){
                                url = $scope.insuranceCompanyList[i].url;
                                break;
                            }
                        }
                        if(url=="")
                            return;
                        window.open(url);
                    };

                }
            });
            return modalInstance.result;
        };
        this.editSYX = function(item){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop: 'static',
                size: 'lg',
                templateUrl: 'module_assetsmanage/tpl/dialog-syx-edit.html',
                controller: function ($scope, RestApi, SysDictService,modal,InsManageService,InsuranceService) {
                    $scope.applyVo={};
                    angular.copy(item,$scope.applyVo);
                    //获取保险公司
                    $scope.insuranceCompanyList = InsuranceService.queryInsuranceCompanyList(true).$object;
                    $scope.attachment={};
                    $scope.ok = function () {
                        modal.confirm("操作提醒", "确认提交？").then(function () {
                            var filedata = new FormData();
                            InsManageService.updateInsuranceHisInfo($scope.applyVo).then(function () {
                                modalInstance.close("修改保险信息成功");
                            })
                        })
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                    $scope.openInsuranceUrl = function(){
                        var key =$scope.applyVo.insCompanyId;
                        var url="";
                        for(var i = 0 ;i<$scope.insuranceCompanyList.length;i++){
                            if(key == $scope.insuranceCompanyList[i].id){
                                url = $scope.insuranceCompanyList[i].url;
                                break;
                            }
                        }
                        if(url=="")
                            return;
                        window.open(url);
                    };

                }
            });
            return modalInstance.result;
        };
        this.addJQX = function(appId,signId,insType){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop: 'static',
                size: 'lg',
                templateUrl: 'module_assetsmanage/tpl/dialog-jqx-add.html',
                controller: function ($scope, RestApi, SysDictService,modal,InsManageService,InsuranceService) {
                    $scope.appId = appId;
                    $scope.signId = signId;
                    $scope.insType = insType;
                    //获取保险公司
                    $scope.insuranceCompanyList = InsuranceService.queryInsuranceCompanyList(true).$object;
                    $scope.applyVo = {};
                    $scope.attachment={};
                    $scope.ok = function () {
                        modal.confirm("操作提醒", "确认提交？").then(function () {
                            var filedata = new FormData();
                            InsManageService.addInsurance($scope.appId,$scope.signId,$scope.insType, $scope.applyVo,filedata).then(function () {
                                modalInstance.close();
                            })
                        })
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                    $scope.openInsuranceUrl = function(){
                        var key =$scope.applyVo.insCompanyId;
                        var url="";
                        for(var i = 0 ;i<$scope.insuranceCompanyList.length;i++){
                            if(key == $scope.insuranceCompanyList[i].id){
                                url = $scope.insuranceCompanyList[i].url;
                                break;
                            }
                        }
                        if(url=="")
                            return;
                        window.open(url);
                    };

                }
            });
            return modalInstance.result;
        };
        this.editJQX = function(item){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop: 'static',
                size: 'lg',
                templateUrl: 'module_assetsmanage/tpl/dialog-jqx-edit.html',
                controller: function ($scope, RestApi, SysDictService,modal,InsManageService,InsuranceService) {
                    $scope.applyVo={};
                    angular.copy(item,$scope.applyVo);
                    //获取保险公司
                    $scope.insuranceCompanyList = InsuranceService.queryInsuranceCompanyList(true).$object;
                    $scope.attachment={};
                    $scope.ok = function () {
                        modal.confirm("操作提醒", "确认提交？").then(function () {
                            var filedata = new FormData();
                            InsManageService.updateInsuranceHisInfo($scope.applyVo).then(function () {
                                modalInstance.close("修改保险信息成功");
                            })
                        })
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                    $scope.delete = function(){
                        modal.confirm("操作提醒","确认删除保险信息？").then(function(){
                            InsManageService.deleteInsuranceHisInfo($scope.applyVo.id).then(function(){
                                modalInstance.close("删除保险信息成功");
                            })
                        })
                    }
                    $scope.openInsuranceUrl = function(){
                        var key =$scope.applyVo.insCompanyId;
                        var url="";
                        for(var i = 0 ;i<$scope.insuranceCompanyList.length;i++){
                            if(key == $scope.insuranceCompanyList[i].id){
                                url = $scope.insuranceCompanyList[i].url;
                                break;
                            }
                        }
                        if(url=="")
                            return;
                        window.open(url);
                    };

                }
            });
            return modalInstance.result;
        };
        this.addLYX = function(appId,signId,insType){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop: 'static',
                size: 'lg',
                templateUrl: 'module_assetsmanage/tpl/dialog-lyx-add.html',
                controller: function ($scope, RestApi, SysDictService,modal,InsManageService,InsuranceService) {
                    $scope.appId = appId;
                    $scope.signId = signId;
                    $scope.insType = insType;
                    //获取保险公司
                    $scope.insuranceCompanyList = InsuranceService.queryInsuranceCompanyList(true).$object;
                    $scope.applyVo = {};
                    $scope.attachment={};
                    $scope.ok = function () {
                        modal.confirm("操作提醒", "确认提交？").then(function () {
                            var filedata = new FormData();
                            InsManageService.addInsurance($scope.appId,$scope.signId,$scope.insType, $scope.applyVo,filedata).then(function () {
                                modalInstance.close();
                            })
                        })
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                    $scope.openInsuranceUrl = function(){
                        var key =$scope.applyVo.insCompanyId;
                        var url="";
                        for(var i = 0 ;i<$scope.insuranceCompanyList.length;i++){
                            if(key == $scope.insuranceCompanyList[i].id){
                                url = $scope.insuranceCompanyList[i].url;
                                break;
                            }
                        }
                        if(url=="")
                            return;
                        window.open(url);
                    };

                }
            });
            return modalInstance.result;
        };
        this.editLYX = function(item){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop: 'static',
                size: 'lg',
                templateUrl: 'module_assetsmanage/tpl/dialog-lyx-edit.html',
                controller: function ($scope, RestApi, SysDictService,modal,InsManageService,InsuranceService) {
                    $scope.applyVo={};
                    angular.copy(item,$scope.applyVo);
                    //获取保险公司
                    $scope.insuranceCompanyList = InsuranceService.queryInsuranceCompanyList(true).$object;
                    $scope.attachment={};
                    $scope.ok = function () {
                        modal.confirm("操作提醒", "确认提交？").then(function () {
                            var filedata = new FormData();
                            InsManageService.updateInsuranceHisInfo($scope.applyVo).then(function () {
                                modalInstance.close("修改保险信息成功");
                            })
                        })
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                    $scope.delete = function(){
                        modal.confirm("操作提醒","确认删除保险信息？").then(function(){
                            InsManageService.deleteInsuranceHisInfo($scope.applyVo.id).then(function(){
                                modalInstance.close("删除保险信息成功");
                            })
                        })
                    }
                    $scope.openInsuranceUrl = function(){
                        var key =$scope.applyVo.insCompanyId;
                        var url="";
                        for(var i = 0 ;i<$scope.insuranceCompanyList.length;i++){
                            if(key == $scope.insuranceCompanyList[i].id){
                                url = $scope.insuranceCompanyList[i].url;
                                break;
                            }
                        }
                        if(url=="")
                            return;
                        window.open(url);
                    };

                }
            });
            return modalInstance.result;
        };
        this.showInsuranceClaimsHis = function(insuranceId){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop: 'static',
                size: 'lg',
                templateUrl: 'module_assetsmanage/tpl/dialog-insurance-claims-his.html',
                controller: function ($scope, RestApi, SysDictService,modal,InsManageService,InsuranceService) {
                    $scope.claimsList = InsManageService.getInsuranceClaimHisByInsuranceId(insuranceId).$object;
                    $scope.showDetail = function(item){
                        InsManageService.showInsuranceClaimsDetail(item);
                    }
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
        };
        this.showInsuranceClaimsDetail = function(claimsVo){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop: 'static',
                size: 'lg',
                templateUrl: 'module_assetsmanage/tpl/dialog-insurance-claims-detail.html',
                controller: function ($scope, RestApi, SysDictService,modal,InsManageService,InsuranceService,SysAreaService) {
                    $scope.claimsVo  = claimsVo;
                    //可选省份
                    $scope.provinceList = SysAreaService.queryProvinceList().$object;
                    $scope.tenantCityList = SysAreaService.queryCityList($scope.claimsVo.acciAddrProvince).$object;
                    $scope.tenantCountyList = SysAreaService.queryCountyList($scope.claimsVo.acciAddrProvince,$scope.claimsVo.acciAddrCity).$object;
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
        }
        this.getInsuranceClaimHisByInsuranceId = function(insuranceId){
            return RestApi.all("/insmanage/getInsuranceClaimHisByInsuranceId").all(insuranceId).getList();
        }

    });
