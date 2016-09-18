'use strict';

/* Controllers */
// signin controllers
angular.module("pu.apply.controllers")
    .controller('ApplyController',function ($scope, $rootScope, $state, toaster, $uibModal,GpsService,
                                            SysDictService,ProductService,CarService) {
        $scope.initApplyAdd = function () {
            //申请信息
            $scope.applyInfo = {};
            $scope.finance1 = {seq:1,select:true,salePrice:0,initPayPercent:0,gpsFee:0,purchaseTax:0,serviceFee:0,insuranceFee:0,delayInsuranceFee:0,transferFee:0,addonFee:0,assessPrice:0,collateral:0,financeAmount:0,financeFee:0};
            $scope.finance2 ={seq:2,select:false,salePrice:0,initPayPercent:0,gpsFee:0,purchaseTax:0,serviceFee:0,insuranceFee:0,delayInsuranceFee:0,transferFee:0,addonFee:0,assessPrice:0,collateral:0,financeAmount:0,financeFee:0};
            $scope.finance3 ={seq:3,select:false,salePrice:0,initPayPercent:0,gpsFee:0,purchaseTax:0,serviceFee:0,insuranceFee:0,delayInsuranceFee:0,transferFee:0,addonFee:0,assessPrice:0,collateral:0,financeAmount:0,financeFee:0};
            $scope.applyInfo.finances = [
                $scope.finance1,
                $scope.finance2,
                $scope.finance3
            ];
            $scope.applyInfo.linkmans = [{seq:1,select:true},{seq:2,select:false}];
            $scope.initSelectList();
            $scope.initWatchFinance1();
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
                    $scope.finance1.financeAmount = parseFloat($scope.finance1.salePrice)*parseFloat($scope.finance1.initPayPercent)/100+
                        parseFloat($scope.finance1.gpsFee)+parseFloat($scope.finance1.purchaseTax)+parseFloat($scope.finance1.serviceFee)+
                        parseFloat($scope.finance1.insuranceFee)+parseFloat($scope.finance1.delayInsuranceFee)+parseFloat($scope.finance1.transferFee)
                        +parseFloat($scope.finance1.addonFee);
                }else{
                    $scope.finance1.financeAmount = parseFloat($scope.finance1.salePrice)*(1-parseFloat($scope.finance1.initPayPercent)/100)+
                        parseFloat($scope.finance1.gpsFee)+parseFloat($scope.finance1.purchaseTax)+parseFloat($scope.finance1.serviceFee)+
                        parseFloat($scope.finance1.insuranceFee)+parseFloat($scope.finance1.delayInsuranceFee)+parseFloat($scope.finance1.transferFee)
                        +parseFloat($scope.finance1.addonFee);
                }
            },true);
        };

        var watchFinance2Gps ;
        var watchFinance2;
        $scope.initWatchFinance2 = function(){
            //监视融资信息变化查询GPS档位
            var watchFinance2Gps = $scope.$watchGroup(['finance2.salePrice','finance2.initPayPercent'],function(newVal,oldVal){
                $scope.finance2.gpsLvlList = GpsService.queryEnableGpsLvlList($scope.finance2.salePrice,$scope.finance2.initPayPercent,$scope.applyInfo.product).$object;
            },true);
            var watchFinance2 = $scope.$watch('finance2',function(newVal,oldVal){
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
                    $scope.finance2.financeAmount = parseFloat($scope.finance2.salePrice)*parseFloat($scope.finance2.initPayPercent)/100+
                        parseFloat($scope.finance2.gpsFee)+parseFloat($scope.finance2.purchaseTax)+parseFloat($scope.finance2.serviceFee)+
                        parseFloat($scope.finance2.insuranceFee)+parseFloat($scope.finance2.delayInsuranceFee)+parseFloat($scope.finance2.transferFee)
                        +parseFloat($scope.finance2.addonFee);
                }else{
                    $scope.finance2.financeAmount = parseFloat($scope.finance2.salePrice)*(1-parseFloat($scope.finance2.initPayPercent)/100)+
                        parseFloat($scope.finance2.gpsFee)+parseFloat($scope.finance2.purchaseTax)+parseFloat($scope.finance2.serviceFee)+
                        parseFloat($scope.finance2.insuranceFee)+parseFloat($scope.finance2.delayInsuranceFee)+parseFloat($scope.finance2.transferFee)
                        +parseFloat($scope.finance2.addonFee);
                }
            },true);
        };
        var watchFinance3Gps ;
        var watchFinance3;
        $scope.initWatchFinance3 = function(){
            //监视融资信息变化查询GPS档位
            var watchFinance3Gps = $scope.$watchGroup(['finance3.salePrice','finance3.initPayPercent'],function(newVal,oldVal){
                $scope.finance3.gpsLvlList = GpsService.queryEnableGpsLvlList($scope.finance3.salePrice,$scope.finance3.initPayPercent,$scope.applyInfo.product).$object;
            },true);
            var watchFinance3 = $scope.$watch('finance3',function(newVal,oldVal){
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
                    $scope.finance3.financeAmount = parseFloat($scope.finance3.salePrice)*parseFloat($scope.finance3.initPayPercent)/100+
                        parseFloat($scope.finance3.gpsFee)+parseFloat($scope.finance3.purchaseTax)+parseFloat($scope.finance3.serviceFee)+
                        parseFloat($scope.finance3.insuranceFee)+parseFloat($scope.finance3.delayInsuranceFee)+parseFloat($scope.finance3.transferFee)
                        +parseFloat($scope.finance3.addonFee);
                }else{
                    $scope.finance3.financeAmount = parseFloat($scope.finance3.salePrice)*(1-parseFloat($scope.finance3.initPayPercent)/100)+
                        parseFloat($scope.finance3.gpsFee)+parseFloat($scope.finance3.purchaseTax)+parseFloat($scope.finance3.serviceFee)+
                        parseFloat($scope.finance3.insuranceFee)+parseFloat($scope.finance3.delayInsuranceFee)+parseFloat($scope.finance3.transferFee)
                        +parseFloat($scope.finance3.addonFee);
                }
            },true);
        };
        $scope.activeFinance = function(item){
            item.select=true;
            if(item.seq ==2){
                $scope.initWatchFinance2();

            }else{
                $scope.initWatchFinance3();
            }
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
        }
        $scope.selectCar = function(item){
            CarService.selectCar(item).then(function(response){
                item.carStyle={};
                angular.copy(response,item.carStyle);
            });
        };
        $scope.onIsFinanceGpsClick = function(item){

        };

        $scope.printVar = function(){
            console.log($scope.applyInfo);
        }
    })
;