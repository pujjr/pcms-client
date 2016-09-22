'use strict';

/* Controllers */
// signin controllers
angular.module("pu.apply.controllers")
    .controller('ApplyController',function ($scope, $rootScope, $state,$stateParams, toaster, $uibModal,GpsService,ToolsService,SysAreaService,TaskService,modal,
                                            SysDictService,ProductService,CarService,ApplyService) {
        $scope.initApplyAdd = function () {
            //申请信息初始化一些选项
            $scope.applyInfo = {};
            $scope.applyInfo.finances = [];
            $scope.applyInfo.tenant={};
            $scope.applyInfo.tenant.tenantHouses = [];
            $scope.applyInfo.tenant.tenantCars = [ ];
            $scope.applyInfo.linkmans = [];
            $scope.initFinances($scope.applyInfo.finances);
            $scope.initTenantHouses($scope.applyInfo.tenant.tenantHouses);
            $scope.initTenantCars($scope.applyInfo.tenant.tenantCars);
            $scope.initLinkmans($scope.applyInfo.linkmans);
            $scope.initSelectList();
        };
        $scope.initWatchFinance1 = function(){
            //监视融资信息变化查询GPS档位
            var watchFinance1Gps = $scope.$watchGroup(['finance1.salePrice','finance1.initPayPercent'],function(newVal,oldVal){
                $scope.finance1.gpsLvlList = GpsService.queryEnableGpsLvlList($scope.finance1.salePrice,$scope.finance1.initPayPercent,$scope.applyInfo.product).$object;
            },true);
            var watchFinance1 = $scope.$watch('finance1',function(newVal,oldVal){
                //取融资手续费
                var financeFee = 0;
                var product = $scope.applyInfo.product;
                for(var i = 0 ; i<product.productPeriodList.length;i++){
                    if($scope.applyInfo.period==product.productPeriodList[i].period){
                        financeFee = product.productPeriodList[i].financeFee;
                    }
                }
                $scope.finance1.financeFee=financeFee;
                //如果为全款再融
                if($scope.applyInfo.product.isTotalRefinance){
                    $scope.finance1.financeAmount = Math.round((parseFloat($scope.finance1.salePrice)*parseFloat($scope.finance1.initPayPercent)/100+
                        parseFloat($scope.finance1.gpsFee)+parseFloat($scope.finance1.purchaseTax)+parseFloat($scope.finance1.serviceFee)+
                        parseFloat($scope.finance1.insuranceFee)+parseFloat($scope.finance1.delayInsuranceFee)+parseFloat($scope.finance1.transferFee)
                        +parseFloat($scope.finance1.addonFee)).toFixed(2));
                }else{
                    $scope.finance1.financeAmount = Math.round((parseFloat($scope.finance1.salePrice)*(1-parseFloat($scope.finance1.initPayPercent)/100)+
                        parseFloat($scope.finance1.gpsFee)+parseFloat($scope.finance1.purchaseTax)+parseFloat($scope.finance1.serviceFee)+
                        parseFloat($scope.finance1.insuranceFee)+parseFloat($scope.finance1.delayInsuranceFee)+parseFloat($scope.finance1.transferFee)
                        +parseFloat($scope.finance1.addonFee)).toFixed(2));
                };
                if($scope.finance1.isPurchaseTax){
                    if(parseFloat($scope.finance1.carStyle.displacement)>1.6){
                        $scope.finance1.purchaseTax = Math.round(parseFloat($scope.finance1.salePrice/1.17*0.1*(1-$scope.finance1.initPayPercent/100)).toFixed(2));
                    }else{
                        $scope.finance1.purchaseTax = Math.round(parseFloat($scope.finance1.salePrice/1.17*0.1*0.5).toFixed(2));
                    }
                }
            },true);
        };

        var watchFinance2Gps ;
        var watchFinance2;
        $scope.initWatchFinance2 = function(){
            //监视融资信息变化查询GPS档位
            watchFinance2Gps = $scope.$watchGroup(['finance2.salePrice','finance2.initPayPercent'],function(newVal,oldVal){
                $scope.finance2.gpsLvlList = GpsService.queryEnableGpsLvlList($scope.finance2.salePrice,$scope.finance2.initPayPercent,$scope.applyInfo.product).$object;
            },true);
            watchFinance2 = $scope.$watch('finance2',function(newVal,oldVal){
                //取融资手续费
                var financeFee = 0;
                var product = $scope.applyInfo.product;
                for(var i = 0 ; i<product.productPeriodList.length;i++){
                    if($scope.applyInfo.period==product.productPeriodList[i].period){
                        financeFee = product.productPeriodList[i].financeFee;
                    }
                }
                $scope.finance2.financeFee=financeFee;
                //如果为全款再融
                if($scope.applyInfo.product.isTotalRefinance){
                    $scope.finance2.financeAmount = Math.round((parseFloat($scope.finance2.salePrice)*parseFloat($scope.finance2.initPayPercent)/100+
                        parseFloat($scope.finance2.gpsFee)+parseFloat($scope.finance2.purchaseTax)+parseFloat($scope.finance2.serviceFee)+
                        parseFloat($scope.finance2.insuranceFee)+parseFloat($scope.finance2.delayInsuranceFee)+parseFloat($scope.finance2.transferFee)
                        +parseFloat($scope.finance2.addonFee)).toFixed(2));
                }else{
                    $scope.finance2.financeAmount = Math.round((parseFloat($scope.finance2.salePrice)*(1-parseFloat($scope.finance2.initPayPercent)/100)+
                        parseFloat($scope.finance2.gpsFee)+parseFloat($scope.finance2.purchaseTax)+parseFloat($scope.finance2.serviceFee)+
                        parseFloat($scope.finance2.insuranceFee)+parseFloat($scope.finance2.delayInsuranceFee)+parseFloat($scope.finance2.transferFee)
                        +parseFloat($scope.finance2.addonFee)).toFixed(2));
                };
                if($scope.finance2.isPurchaseTax){
                    if(parseFloat($scope.finance2.carStyle.displacement)>1.6){
                        $scope.finance2.purchaseTax = Math.round(parseFloat($scope.finance2.salePrice/1.17*0.1*(1-$scope.finance2.initPayPercent/100)).toFixed(2));
                    }else{
                        $scope.finance2.purchaseTax = Math.round(parseFloat($scope.finance2.salePrice/1.17*0.1*0.5).toFixed(2));
                    }
                }
            },true);
        };
        var watchFinance3Gps ;
        var watchFinance3;
        $scope.initWatchFinance3 = function(){
            //监视融资信息变化查询GPS档位
            watchFinance3Gps = $scope.$watchGroup(['finance3.salePrice','finance3.initPayPercent'],function(newVal,oldVal){
                $scope.finance3.gpsLvlList = GpsService.queryEnableGpsLvlList($scope.finance3.salePrice,$scope.finance3.initPayPercent,$scope.applyInfo.product).$object;
            },true);
            watchFinance3 = $scope.$watch('finance3',function(newVal,oldVal){
                //取融资手续费
                var financeFee = 0;
                var product = $scope.applyInfo.product;
                for(var i = 0 ; i<product.productPeriodList.length;i++){
                    if($scope.applyInfo.period==product.productPeriodList[i].period){
                        financeFee = product.productPeriodList[i].financeFee;
                    }
                }
                $scope.finance3.financeFee=financeFee;
                //如果为全款再融
                if($scope.applyInfo.product.isTotalRefinance){
                    $scope.finance3.financeAmount = Math.round((parseFloat($scope.finance3.salePrice)*parseFloat($scope.finance3.initPayPercent)/100+
                        parseFloat($scope.finance3.gpsFee)+parseFloat($scope.finance3.purchaseTax)+parseFloat($scope.finance3.serviceFee)+
                        parseFloat($scope.finance3.insuranceFee)+parseFloat($scope.finance3.delayInsuranceFee)+parseFloat($scope.finance3.transferFee)
                        +parseFloat($scope.finance3.addonFee)).toFixed(2));
                }else{
                    $scope.finance3.financeAmount = Math.round((parseFloat($scope.finance3.salePrice)*(1-parseFloat($scope.finance3.initPayPercent)/100)+
                        parseFloat($scope.finance3.gpsFee)+parseFloat($scope.finance3.purchaseTax)+parseFloat($scope.finance3.serviceFee)+
                        parseFloat($scope.finance3.insuranceFee)+parseFloat($scope.finance3.delayInsuranceFee)+parseFloat($scope.finance3.transferFee)
                        +parseFloat($scope.finance3.addonFee)).toFixed(2));
                };
                if($scope.finance3.isPurchaseTax){
                    if(parseFloat($scope.finance3.carStyle.displacement)>1.6){
                        $scope.finance3.purchaseTax = Math.round(parseFloat($scope.finance3.salePrice/1.17*0.1*(1-$scope.finance3.initPayPercent/100)).toFixed(2));
                    }else{
                        $scope.finance3.purchaseTax = Math.round(parseFloat($scope.finance3.salePrice/1.17*0.1*0.5).toFixed(2));
                    }
                }
            },true);
        };
        //增加融资信息
        $scope.activeFinance = function(item){
            item.select=true;
            if(item.seq ==2){
                $scope.initWatchFinance2();
            }else{
                $scope.initWatchFinance3();
            }
        };
        //清除融资信息
        $scope.deActiveFinance = function(item){
            modal.confirm('操作提醒','是否清除融资信息？').then(function(){
                if(item.seq == 2){
                    var obj = {seq:2,select:false,salePrice:0,initPayPercent:0,
                        gpsFee:0, isFinanceGps:false,
                        purchaseTax:0,isPurchaseTax:false,
                        serviceFee:0,isServiceFee:false,
                        insuranceFee:0,isInsuranceFee:false,
                        delayInsuranceFee:0,isDelayInsuranceFee:false,
                        transferFee:0,isTransferFee:false,
                        addonFee:0,isAddonFee:false,
                        assessPrice:0,collateral:0,financeAmount:0,financeFee:0};
                    angular.copy(obj,item);
                    watchFinance2Gps() ;
                    watchFinance2();
                }
                if(item.seq ==3){
                    var obj = {seq:3,select:false,salePrice:0,initPayPercent:0,
                        gpsFee:0, isFinanceGps:false,
                        purchaseTax:0,isPurchaseTax:false,
                        serviceFee:0,isServiceFee:false,
                        insuranceFee:0,isInsuranceFee:false,
                        delayInsuranceFee:0,isDelayInsuranceFee:false,
                        transferFee:0,isTransferFee:false,
                        addonFee:0,isAddonFee:false,
                        assessPrice:0,collateral:0,financeAmount:0,financeFee:0};
                    angular.copy(obj,item);
                    watchFinance3Gps() ;
                    watchFinance3();
                }
            })
        }
        //根据选择GPS档位计算GPS价格
        $scope.onGpsLvlSelected = function(item){
            if(item.isFinanceGps){
                item.gpsFee = item.gpsLvl.salePrice;
            }else{
                item.gpsFee = 0;
            }
        };
        //选择是否加融GPS费用
        $scope.onIsFinanceGpsCheck = function(item){
            $scope.onGpsLvlSelected(item);
        };
        //输入身份证获取性别和年龄
        $scope.inputIdNoComplete = function(){
            var idNo = $scope.applyInfo.tenant.idNo;
            var len =idNo .length;
            var sex;
            var age=0;
            var birthday = idNo.substring(6,14);
            if(len ==18){
                sex = idNo[len-2];
            }else{
                sex = idNo[len-1];
            };
            ToolsService.getServerDateTime().then(function(response){
                age = ToolsService.getDateDiff(birthday,response.toString())/365;
                $scope.applyInfo.tenant.age=parseInt(age);
            })
            $scope.applyInfo.tenant.sex = sex%2!=0?'xb01':'xb02';
        }
        $scope.addressCtrl = {
            onEditRefresh : function(){
                $scope.tenantCityList = SysAreaService.queryCityList($scope.applyInfo.tenant.addrProvince).$object;
                $scope.tenantCountyList = SysAreaService.queryCountyList($scope.applyInfo.tenant.addrProvince,$scope.applyInfo.tenant.addrCity).$object;
                $scope.tenantUnitCityList = SysAreaService.queryCityList($scope.applyInfo.tenant.unitAddrProvince).$object;
                $scope.tenantUnitCountyList = SysAreaService.queryCountyList($scope.applyInfo.tenant.unitAddrProvince,$scope.applyInfo.tenant.unitAddrCity).$object;
                $scope.spouseUnitCityList = SysAreaService.queryCityList($scope.applyInfo.spouse.unitAddrProvince).$object;
                $scope.spouseUnitCountyList = SysAreaService.queryCountyList($scope.applyInfo.spouse.unitAddrProvince,$scope.applyInfo.spouse.unitAddrCity).$object;
                $scope.cloesseeUnitCityList = SysAreaService.queryCityList($scope.applyInfo.cloessee.unitAddrProvince).$object;
                $scope.cloesseeUnitCountyList = SysAreaService.queryCountyList($scope.applyInfo.cloessee.unitAddrProvince,$scope.applyInfo.cloessee.unitAddrCity).$object;
                //刷新承租人房产地址
                SysAreaService.queryCityList($scope.tenantHouse1.addrProvince).then(function(response){
                    $scope.tenantHouse1.cityList  = response;
                    SysAreaService.queryCountyList($scope.tenantHouse1.addrProvince,$scope.tenantHouse1.addrCity).then(function(response){
                        $scope.tenantHouse1.countyList = response;
                    });
                })
                SysAreaService.queryCityList($scope.tenantHouse2.addrProvince).then(function(response){
                    $scope.tenantHouse2.cityList  = response;
                    SysAreaService.queryCountyList($scope.tenantHouse1.addrProvince,$scope.tenantHouse2.addrCity).then(function(response){
                        $scope.tenantHouse2.countyList = response;
                    });
                })
                //刷新联系人房产地址
                SysAreaService.queryCityList($scope.linkman1.addrProvince).then(function(response){
                    $scope.linkman1.cityList  = response;
                    SysAreaService.queryCountyList($scope.linkman1.addrProvince,$scope.linkman1.addrCity).then(function(response){
                        $scope.linkman1.countyList = response;
                    });
                });
                 SysAreaService.queryCityList($scope.linkman2.addrProvince).then(function(response){
                     $scope.linkman2.cityList  = response;
                     SysAreaService.queryCountyList($scope.linkman2.addrProvince,$scope.linkman2.addrCity).then(function(response){
                         $scope.linkman2.countyList = response;
                     });
                 });

            },
            //承租人现详细地址省
            onTenantProvinceChange : function(){
                $scope.applyInfo.tenant.addrCity="";
                $scope.tenantCityList = SysAreaService.queryCityList($scope.applyInfo.tenant.addrProvince).$object;
                $scope.applyInfo.tenant.addrCounty="";
            },
            //承租人现详细地址市
            onTenantCityChange:function(){
                $scope.applyInfo.tenant.addrCounty="";
                $scope.tenantCountyList = SysAreaService.queryCountyList($scope.applyInfo.tenant.addrProvince,$scope.applyInfo.tenant.addrCity).$object;
            },
            // 承租人单位地址省
            onTenantUnitProvinceChange : function(){
                $scope.applyInfo.tenant.unitAddrCity="";
                $scope.tenantUnitCityList = SysAreaService.queryCityList($scope.applyInfo.tenant.unitAddrProvince).$object;
                $scope.applyInfo.tenant.unitAddrCounty="";
            },
            // 承租人单位地址市
            onTenantUnitCityChange:function(){
                $scope.applyInfo.tenant.unitAddrCounty="";
                $scope.tenantUnitCountyList = SysAreaService.queryCountyList($scope.applyInfo.tenant.unitAddrProvince,$scope.applyInfo.tenant.unitAddrCity).$object;
            },
            //配偶单位地址省
            onSpouseUnitProvinceChange : function(){
                $scope.applyInfo.spouse.unitAddrCity="";
                $scope.spouseUnitCityList = SysAreaService.queryCityList($scope.applyInfo.spouse.unitAddrProvince).$object;
                $scope.applyInfo.spouse.unitAddrCounty="";
            },
            // 配偶单位地址市
            onSpouseUnitCityChange:function(){
                $scope.applyInfo.spouse.unitAddrCounty="";
                $scope.spouseUnitCountyList = SysAreaService.queryCountyList($scope.applyInfo.spouse.unitAddrProvince,$scope.applyInfo.spouse.unitAddrCity).$object;
            },
            //共租人单位地址省
            onCloesseeUnitProvinceChange : function(){
                $scope.applyInfo.cloessee.unitAddrCity="";
                $scope.cloesseeUnitCityList = SysAreaService.queryCityList($scope.applyInfo.cloessee.unitAddrProvince).$object;
                $scope.applyInfo.cloessee.unitAddrCounty="";
            },
            // 共租人单位地址市
            onCloesseeUnitCityChange:function(){
                $scope.applyInfo.cloessee.unitAddrCounty="";
                $scope.cloesseeUnitCountyList = SysAreaService.queryCountyList($scope.applyInfo.cloessee.unitAddrProvince,$scope.applyInfo.cloessee.unitAddrCity).$object;
            },
            //联系人单位地址省
            onCommonProvinceChange : function(item){
                item.addrCity="";
                item.cityList = SysAreaService.queryCityList(item.addrProvince).$object;
                item.addrCounty="";
            },
            // 联系人单位地址市
            onCommonCityChange:function(item){
                item.addrCounty="";
                item.countyList = SysAreaService.queryCountyList(item.addrProvince,item.addrCity).$object;
            }
        }
        $scope.initSelectList = function(){
            //可选产品
            $scope.productList = ProductService.queryBranchEnableProductList().$object;
            //可选还款方式可选项
            $scope.repayModeList  = SysDictService.queryDictDataByTypeCode('hkfs').$object;
            //证件类型可选项
            $scope.idTypeList  = SysDictService.queryDictDataByTypeCode("zjlx").$object;
            //性别可选性
            $scope.sexList = SysDictService.queryDictDataByTypeCode("xb").$object;
            //学历可选项
            $scope.educationList = SysDictService.queryDictDataByTypeCode("xl").$object;
            //婚姻状况可选项
            $scope.marryStatusList = SysDictService.queryDictDataByTypeCode("hyzk").$object;
            //住所权属可选项
            $scope.houseOwnerList = SysDictService.queryDictDataByTypeCode("zsqs").$object;
            //同住人可选项
            $scope.houseMateList = SysDictService.queryDictDataByTypeCode("tzr").$object;
            //户籍所属可选项
            $scope.houseHoldList = SysDictService.queryDictDataByTypeCode("hjss").$object;
            //家庭成员可选项
            $scope.familyMemberList = SysDictService.queryDictDataByTypeCode("jtcy").$object;
            //来本地时长可选项
            $scope.liveTimeList = SysDictService.queryDictDataByTypeCode("lbdsc").$object;
            //房产状态可选项
            $scope.houseStatusList = SysDictService.queryDictDataByTypeCode("fczt").$object;
            //车产状态可选项
            $scope.carStatusList = SysDictService.queryDictDataByTypeCode("cczt").$object;
            //单位类型可选项
            $scope.unitTypeList = SysDictService.queryDictDataByTypeCode("dwlx").$object;
            //行业可选项
            $scope.unitIndustryList =SysDictService.queryDictDataByTypeCode("hy").$object;
            //职位级别可选项
            $scope.rankList = SysDictService.queryDictDataByTypeCode("zwjb").$object;
            //与本人关系可选项
            $scope.relateList = SysDictService.queryDictDataByTypeCode("gx").$object;
            //是否知道购车可选项
            $scope.isKnowBuyCarList = SysDictService.queryDictDataByTypeCode("sfzdgc").$object;
            //可选省份
            $scope.provinceList = SysAreaService.queryProvinceList().$object;
        }
        //选择车辆
        $scope.selectCar = function(item){
            CarService.selectCar(item).then(function(response){
                item.carStyle={};
                angular.copy(response,item.carStyle);
            });
        };
        $scope.printVar = function(){
            console.log($scope.applyInfo);
        };
       //查询未提交申请单列表
        $scope.initQueryUnCommitApplyInfoList = function(){
            $scope.unCommitApplyList = ApplyService.queryUnCommitApplyInfoList().$object;
        };
        //初始化编辑申请单时的融资信息
        $scope.initFinances = function(finances){
            for(var i = 1 ;i<=3; i++){
                if(i>finances.length){
                    if(i==1){
                        var finance1 = {seq:1,select:true,salePrice:0,initPayPercent:0,
                            gpsFee:0, isFinanceGps:false,
                            purchaseTax:0,isPurchaseTax:false,
                            serviceFee:0,isServiceFee:false,
                            insuranceFee:0,isInsuranceFee:false,
                            delayInsuranceFee:0,isDelayInsuranceFee:false,
                            transferFee:0,isTransferFee:false,
                            addonFee:0,isAddonFee:false,
                            assessPrice:0,collateral:0,financeAmount:0,financeFee:0};
                        finances.push(finance1);
                    }
                    if(i==2){
                        var finance2 = {seq:2,select:false,salePrice:0,initPayPercent:0,
                            gpsFee:0, isFinanceGps:false,
                            purchaseTax:0,isPurchaseTax:false,
                            serviceFee:0,isServiceFee:false,
                            insuranceFee:0,isInsuranceFee:false,
                            delayInsuranceFee:0,isDelayInsuranceFee:false,
                            transferFee:0,isTransferFee:false,
                            addonFee:0,isAddonFee:false,
                            assessPrice:0,collateral:0,financeAmount:0,financeFee:0};
                        finances.push(finance2);
                    }
                    if(i==3){
                       var finance3 = {seq:3,select:false,salePrice:0,initPayPercent:0,
                            gpsFee:0, isFinanceGps:false,
                            purchaseTax:0,isPurchaseTax:false,
                            serviceFee:0,isServiceFee:false,
                            insuranceFee:0,isInsuranceFee:false,
                            delayInsuranceFee:0,isDelayInsuranceFee:false,
                            transferFee:0,isTransferFee:false,
                            addonFee:0,isAddonFee:false,
                            assessPrice:0,collateral:0,financeAmount:0,financeFee:0};
                        finances.push(finance3);
                    }
                }
            }
            //放入scope
             for(var i = 0 ;i<3;i++){
                 if(i == 0){
                     $scope.finance1 =finances[0];
                 }
                 if(i==1){
                     $scope.finance2 =finances[1]
                 }
                 if(i==2){
                     $scope.finance3 =finances[2]
                 }
             }
            //启动watch操作
            for(var i = 1 ;i<=finances.length;i++){
                if(finances[i-1].select == true){
                    if(i == 1){
                        $scope.initWatchFinance1();
                    }
                    if(i==2){
                        $scope.initWatchFinance2();
                    }
                    if(i==3){
                        $scope.initWatchFinance3();
                    }
                }
            }
        }
        //初始化编辑申请信息承租人房产信息
        $scope.initTenantHouses = function(tenantHouses){
            for(var i = 1 ; i<=2 ;i++){
                if(i>tenantHouses.length){
                    if(i==1){
                        $scope.tenantHouse1 = {seq:1};
                        tenantHouses.push($scope.tenantHouse1);
                    }
                    if(i==2){
                        $scope.tenantHouse2={seq:2};
                        tenantHouses.push($scope.tenantHouse2);
                    }
                }
            };
            //放入scope
            for(var i = 1 ;i<=2;i++){
                if(i == 1){
                    $scope.tenantHouse1 =tenantHouses[0];
                }
                if(i==2){
                    $scope.tenantHouse2 =tenantHouses[1];
                }
            }
        };
        //初始化编辑申请承租人车产信息
        $scope.initTenantCars = function(tenantCars){
            for(var i = 1 ; i<=2 ;i++){
                if(i>tenantCars.length){
                    if(i==1){
                        $scope.tenantCar1 = {seq:1};
                        tenantCars.push($scope.tenantCar1);
                    }
                    if(i==2){
                        $scope.tenantCar2={seq:2};
                        tenantCars.push($scope.tenantCar2);
                    }
                }
            };
            //放入scope
            for(var i = 1 ;i<=2;i++){
                if(i == 1){
                    $scope.tenantCar1 =tenantCars[0];
                }
                if(i==2){
                    $scope.tenantCar2 =tenantCars[1]
                }
            }
        };
        //初始化编辑申请联系人信息
        $scope.initLinkmans = function(linkmans){
            for(var i = 1 ; i<=2 ;i++){
                if(i>linkmans.length){
                    if(i==1){
                        $scope.linkman1 = {seq:1};
                        linkmans.push($scope.linkman1);
                    }
                    if(i==2){
                        $scope.linkman2 = {seq:2};
                        linkmans.push($scope.linkman2);
                    }
                }
            };
            //放入scope
            for(var i = 1 ;i<=2;i++){
                if(i == 1){
                    $scope.linkman1 =linkmans[0];
                }
                if(i==2){
                    $scope.linkman2 =linkmans[1];
                }
            }
        }
        //初始化编辑申请单
        $scope.initApplyEdit = function(){
            var appId = $stateParams.appId;
            $scope.doInitApplyEdit(appId);
        }
        $scope.doInitApplyEdit = function(appId){

            // 获取订单数据
            ApplyService.queryApplyInfoByAppId(appId).then(function(response){
                $scope.applyInfo =  response;
                if($scope.applyInfo.finances == undefined){
                    $scope.applyInfo.finances=[];
                }
                if($scope.applyInfo.tenant == undefined){
                    $scope.applyInfo.tenant = {};
                    if($scope.applyInfo.tenant.tenantHouses==undefined){
                        $scope.applyInfo.tenant.tenantHouses = [];
                    }
                    if($scope.applyInfo.tenant.tenantCars ==undefined){
                        $scope.applyInfo.tenant.tenantCars = [];
                    }
                }
                if($scope.applyInfo.linkmans == undefined){
                    $scope.applyInfo.linkmans = [];
                }
                $scope.initFinances($scope.applyInfo.finances);
                $scope.initTenantHouses($scope.applyInfo.tenant.tenantHouses);
                $scope.initTenantCars($scope.applyInfo.tenant.tenantCars);
                $scope.initLinkmans($scope.applyInfo.linkmans);
                $scope.initSelectList();
                $scope.addressCtrl.onEditRefresh();
            })
        }
        //保存申请信息
        $scope.saveApplyInfo = function(){
            ApplyService.saveApplyInfo($scope.applyInfo).then(function(response){
                console.log(response);
                toaster.pop('success', '操作提醒','保存申请信息成功');
            });
        };
        //提交申请信息
        $scope.commitApplyTask = function(){
            TaskService.commitApplyTask($scope.applyInfo).then(function(response){
                $state.go('app.apply.list');
                toaster.pop('success', '操作提醒','提交申请信息成功')
            });
            ;
        }

    })
;