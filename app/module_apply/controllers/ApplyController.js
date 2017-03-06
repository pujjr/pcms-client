'use strict';

/* Controllers */
// signin controllers
angular.module("pu.apply.controllers")
    .controller('ApplyController',function ($scope, $rootScope, $state,$stateParams, toaster, $uibModal,GpsService,ToolsService,SysAreaService,TaskService,modal,
                                            SysDictService,ProductService,CarService,ApplyService,CalService,FileUploader,FileService,RestApi) {
        $scope.initApplyAdd = function () {
            //申请信息初始化一些选项
            $scope.applyInfo = {};
            $scope.totalFinanceAmt = 0.00;
            $scope.totalLoanAmt = 0.00;
            $scope.monthRent = 0.00;
            $scope.applyInfo.finances = [];
            $scope.applyInfo.tenant={};
            $scope.applyInfo.tenant.tenantHouses = [];
            $scope.applyInfo.tenant.tenantCars = [];
            $scope.applyInfo.linkmans = [];
            $scope.initWatchProduct();
            //再选择产品后再启动相关监控
            $scope.initFinances($scope.applyInfo.finances);
            $scope.initWatchTotalFinance();
            $scope.initTenantHouses($scope.applyInfo.tenant.tenantHouses);
            $scope.initTenantCars($scope.applyInfo.tenant.tenantCars);
            $scope.initLinkmans($scope.applyInfo.linkmans);
            $scope.initSelectList("add");
            $scope.initWatchDebitInfo();
        };
        $scope.refreshFormRequiredMap = function(){
            $scope.requiredMap = ProductService.queryProductFormRequiredMap($scope.applyInfo.product.id).$object;
        };
        /**一堆watch变量**/
        var watchFinance1Gps;
        var watchFinance1;
        var watchFinance2Gps ;
        var watchFinance2;
        var watchFinance3Gps ;
        var watchFinance3;
        var watchTotalFinance;
        var watchDebitAmount;
        var watchProduct;
        $scope.initWatchFinance1 = function(){
            //监视融资信息变化查询GPS档位
            watchFinance1Gps = $scope.$watchGroup(['finance1.salePrice','finance1.initPayPercent'],function(newVal,oldVal){
                $scope.finance1.gpsLvlList = GpsService.queryEnableGpsLvlList($scope.applyInfo.appId,$scope.finance1.salePrice,$scope.finance1.initPayPercent,$scope.applyInfo.product).$object;
            },true);
            watchFinance1 = $scope.$watch('finance1',function(newVal,oldVal){
                var product = $scope.applyInfo.product;
                if($scope.applyInfo.product!=undefined)
                {
                    //计算融资金额如果为全款再融
                    if( $scope.applyInfo.product.productRule.isTotalRefinance){
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
                    //购置税
                    if($scope.finance1.isPurchaseTax){
                        if(parseFloat($scope.finance1.carStyle.displacement)>1.6){
                            $scope.finance1.purchaseTax = Math.round(parseFloat($scope.finance1.salePrice/1.17*0.1).toFixed(2));
                        }else{
                            $scope.finance1.purchaseTax = Math.round(parseFloat($scope.finance1.salePrice/1.17*0.1*0.75).toFixed(2));
                        }
                    };
                    //取融资手续费
                    var financeFee = 0;
                    for(var i = 0 ; i<product.productPeriodList.length;i++){
                        if($scope.applyInfo.period==product.productPeriodList[i].period){
                            financeFee = Math.round(($scope.finance1.financeAmount/10000)*product.productPeriodList[i].financeFee);
                            break;
                        }
                    }
                    //判断产品是否二手车，如果是则评估价/售价=裸车价
                    if($scope.applyInfo.product.productRule.carType=='clly02'){
                        $scope.finance1.assessPrice = $scope.finance1.salePrice;
                    }
                    $scope.finance1.financeFee=financeFee;
                }

            },true);
        };

        $scope.initWatchFinance2 = function(){
            //监视融资信息变化查询GPS档位
            watchFinance2Gps = $scope.$watchGroup(['finance2.salePrice','finance2.initPayPercent'],function(newVal,oldVal){
                $scope.finance2.gpsLvlList = GpsService.queryEnableGpsLvlList($scope.applyInfo.appId,$scope.finance2.salePrice,$scope.finance2.initPayPercent,$scope.applyInfo.product).$object;
            },true);
            watchFinance2 = $scope.$watch('finance2',function(newVal,oldVal){
                var product = $scope.applyInfo.product;

                //计算融资金额，如果为全款再融
                if($scope.applyInfo.product!=undefined)
                {
                    if( $scope.applyInfo.product.productRule.isTotalRefinance){
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
                    //购置税
                    if($scope.finance2.isPurchaseTax){
                        if(parseFloat($scope.finance2.carStyle.displacement)>1.6){
                            $scope.finance2.purchaseTax = Math.round(parseFloat($scope.finance2.salePrice/1.17*0.1).toFixed(2));
                        }else{
                            $scope.finance2.purchaseTax = Math.round(parseFloat($scope.finance2.salePrice/1.17*0.1*0.75).toFixed(2));
                        }
                    };
                    //取融资手续费
                    var financeFee = 0;

                    for(var i = 0 ; i<product.productPeriodList.length;i++){
                        if($scope.applyInfo.period==product.productPeriodList[i].period){
                            financeFee =  Math.round(($scope.finance2.financeAmount/10000)*product.productPeriodList[i].financeFee);
                            break;
                        }
                    }
                    //判断产品是否二手车，如果是则评估价/售价=裸车价
                    if($scope.applyInfo.product.productRule.carType=='clly02'){
                        $scope.finance2.assessPrice = $scope.finance2.salePrice;
                    }
                    $scope.finance2.financeFee=financeFee;
                }
            },true);
        };

        $scope.initWatchFinance3 = function(){
            //监视融资信息变化查询GPS档位
            watchFinance3Gps = $scope.$watchGroup(['finance3.salePrice','finance3.initPayPercent'],function(newVal,oldVal){
                $scope.finance3.gpsLvlList = GpsService.queryEnableGpsLvlList($scope.applyInfo.appId,$scope.finance3.salePrice,$scope.finance3.initPayPercent,$scope.applyInfo.product).$object;
            },true);
            watchFinance3 = $scope.$watch('finance3',function(newVal,oldVal){
                var product = $scope.applyInfo.product;
                //计算融资金额，如果为全款再融
                if($scope.applyInfo.product!=undefined)
                {
                    if( $scope.applyInfo.product.productRule.isTotalRefinance){
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
                    //购置税
                    if($scope.finance3.isPurchaseTax){
                        if(parseFloat($scope.finance3.carStyle.displacement)>1.6){
                            $scope.finance3.purchaseTax = Math.round(parseFloat($scope.finance3.salePrice/1.17*0.1).toFixed(2));
                        }else{
                            $scope.finance3.purchaseTax = Math.round(parseFloat($scope.finance3.salePrice/1.17*0.1*0.75).toFixed(2));
                        }
                    };
                    //取融资手续费
                    var financeFee = 0;
                    for(var i = 0 ; i<product.productPeriodList.length;i++){
                        if($scope.applyInfo.period==product.productPeriodList[i].period){
                            financeFee =  Math.round(($scope.finance3.financeAmount/10000)*product.productPeriodList[i].financeFee);
                            break;
                        }
                    }
                    //判断产品是否二手车，如果是则评估价/售价=裸车价
                    if($scope.applyInfo.product.productRule.carType=='clly02'){
                        $scope.finance3.assessPrice = $scope.finance3.salePrice;
                    }
                    $scope.finance3.financeFee=financeFee;
                }

            },true);
        };
        //监视产品变化
        $scope.initWatchProduct = function(){
            watchProduct = $scope.$watch('applyInfo.product',function(newVal,oldVal){
                if(newVal == oldVal || newVal ==undefined){
                    return;
                }
                //关闭watch
                if(watchFinance1Gps!=undefined)
                    watchFinance1Gps();
                if(watchFinance1!=undefined)
                    watchFinance1();
                if(watchFinance2Gps!=undefined)
                    watchFinance2Gps() ;
                if(watchFinance2!=undefined)
                    watchFinance2();
                if(watchFinance3Gps!=undefined)
                    watchFinance3Gps() ;
                if(watchFinance3!=undefined)
                    watchFinance3();
                if(watchTotalFinance!=undefined)
                    watchTotalFinance();
                $scope.applyInfo.finances=[];
                for(var i = 1 ;i<=3; i++){
                    if(i==1){
                        var finance1={};
                        var finance1 = {seq:1,select:true,
                            gpsFee:0, isFinanceGps:false,
                            purchaseTax:0,isPurchaseTax:false,
                            serviceFee:0,isServiceFee:false,
                            insuranceFee:0,isInsuranceFee:false,
                            delayInsuranceFee:0,isDelayInsuranceFee:false,
                            transferFee:0,isTransferFee:false,
                            addonFee:0,isAddonFee:false,
                            assessPrice:0,collateral:0,financeAmount:0,financeFee:0};
                        //选择产品后如果为二手车则评估价为300
                        if($scope.applyInfo.product.productRule.enableAssessFee==true){
                            finance1.assessFee = 300;
                        }else{
                            finance1.assessFee = 0;
                        }
                        $scope.applyInfo.finances.push(finance1);
                    }
                    if(i==2){
                        var finance2={};
                        var finance2 = {seq:2,select:false,
                            gpsFee:0, isFinanceGps:false,
                            purchaseTax:0,isPurchaseTax:false,
                            serviceFee:0,isServiceFee:false,
                            insuranceFee:0,isInsuranceFee:false,
                            delayInsuranceFee:0,isDelayInsuranceFee:false,
                            transferFee:0,isTransferFee:false,
                            addonFee:0,isAddonFee:false,
                            assessFee:0,
                            assessPrice:0,collateral:0,financeAmount:0,financeFee:0};
                        $scope.applyInfo.finances.push(finance2);
                    }
                    if(i==3){
                        var finance3={};
                        var finance3 = {seq:3,select:false,
                            gpsFee:0, isFinanceGps:false,
                            purchaseTax:0,isPurchaseTax:false,
                            serviceFee:0,isServiceFee:false,
                            insuranceFee:0,isInsuranceFee:false,
                            delayInsuranceFee:0,isDelayInsuranceFee:false,
                            transferFee:0,isTransferFee:false,
                            addonFee:0,isAddonFee:false,
                            assessFee:0,
                            assessPrice:0,collateral:0,financeAmount:0,financeFee:0};
                        $scope.applyInfo.finances.push(finance3);
                    }
                }
                //放入scope
                for(var i = 0 ;i<3;i++){
                    if(i == 0){
                        $scope.finance1 =$scope.applyInfo.finances[0];
                    }
                    if(i==1){
                        $scope.finance2 =$scope.applyInfo.finances[1]
                    }
                    if(i==2){
                        $scope.finance3 =$scope.applyInfo.finances[2]
                    }
                }
                //启动watch操作
                for(var i = 1 ;i<=$scope.applyInfo.finances.length;i++){
                    if($scope.applyInfo.finances[i-1].select == true){
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
                $scope.initWatchTotalFinance();
            })
        }
        //计算还款月租金，需根据融资金额，期数，产品进行计算， 放款金额=融资金额-GPS费用-评估费-融资手续费 应watch这些变量
        $scope.initWatchTotalFinance = function(){
            watchTotalFinance = $scope.$watchGroup([
                'finance1.financeAmount',
                'finance2.financeAmount',
                'finance3.financeAmount',
                'finance1.gpsFee',
                'finance2.gpsFee',
                'finance3.gpsFee',
                'finance1.assessFee',
                'finance2.assessFee',
                'finance3.assessFee',
                'finance1.financeFee',
                'finance2.financeFee',
                'finance3.financeFee',
                'applyInfo.period'
            ],function(newVal,oldVal){
                //获取总的融资金额,没选产品直接返回
                if($scope.applyInfo.product==undefined){
                    return;
                }
                var monthRate = $scope.applyInfo.product.yearRate/12;
                var period = $scope.applyInfo.period;
                var repayMode = $scope.applyInfo.product.repayMode;
                //初始化放款总金额
                $scope.applyInfo.totalLoanAmt = 0.00;
                //初始化融资总金额
                $scope.applyInfo.totalFinanceAmt = 0.00;
                for(var i = 0 ;i<$scope.applyInfo.finances.length;i++){
                    var item = $scope.applyInfo.finances[i];
                    if(isNaN(item.financeAmount))
                        item.financeAmount=0.00;
                    if(isNaN(item.gpsFee))
                        item.gpsFee=0.00;
                    if(isNaN(parseFloat(item.assessFee)))
                        item.assessFee=0.00;
                    if(isNaN(item.financeFee))
                        item.financeFee=0.00;
                    $scope.applyInfo.totalLoanAmt += item.financeAmount - item.gpsFee - parseFloat(item.assessFee) - item.financeFee;
                    $scope.applyInfo.totalFinanceAmt += item.financeAmount;
                    /**产品信息变化重新计算融资手续费**/
                    var product = $scope.applyInfo.product;
                    for(var j = 0 ; j<product.productPeriodList.length;j++){
                        if($scope.applyInfo.period==product.productPeriodList[j].period){
                            $scope.applyInfo.finances[i].financeFee = Math.round((($scope.applyInfo.finances[i].financeAmount/10000)*product.productPeriodList[j].financeFee).toFixed(2));
                            break;
                        }
                    }
                }
                //月租金
                $scope.applyInfo.monthRent = CalService.calMonthRent($scope.applyInfo.totalFinanceAmt,period,monthRate,repayMode);
            });
        }
        /**监视负债信息计算总金额**/
        $scope.initWatchDebitInfo = function(){
            watchDebitAmount = $scope.$watchGroup(
                [
                    'applyInfo.familyDebt.bankLoanAmount',
                    'applyInfo.familyDebt.pettyLoanAmout',
                    'applyInfo.familyDebt.creditLoanAmount',
                    'applyInfo.familyDebt.relativeLoanAmount',
                    'applyInfo.familyDebt.friendLoanAmount',
                    'applyInfo.familyDebt.bankLoanYhk',
                    'applyInfo.familyDebt.pettyLoanYhk',
                    'applyInfo.familyDebt.creditLoanYhk',
                    'applyInfo.familyDebt.relativeLoanYhk',
                    'applyInfo.familyDebt.friendLoanYhk'
                ],function(newVal,oldVal){
                    if($scope.applyInfo.familyDebt.bankLoanAmount==undefined || $scope.applyInfo.familyDebt.bankLoanAmount == null || isNaN($scope.applyInfo.familyDebt.bankLoanAmount))
                        $scope.applyInfo.familyDebt.bankLoanAmount = 0.00;
                    if($scope.applyInfo.familyDebt.pettyLoanAmout==undefined || $scope.applyInfo.familyDebt.pettyLoanAmout == null || isNaN($scope.applyInfo.familyDebt.pettyLoanAmout))
                        $scope.applyInfo.familyDebt.pettyLoanAmout = 0.00;
                    if($scope.applyInfo.familyDebt.creditLoanAmount==undefined || $scope.applyInfo.familyDebt.creditLoanAmount == null || isNaN($scope.applyInfo.familyDebt.creditLoanAmount))
                        $scope.applyInfo.familyDebt.creditLoanAmount = 0.00;
                    if($scope.applyInfo.familyDebt.relativeLoanAmount==undefined || $scope.applyInfo.familyDebt.relativeLoanAmount == null || isNaN($scope.applyInfo.familyDebt.relativeLoanAmount))
                        $scope.applyInfo.familyDebt.relativeLoanAmount = 0.00;
                    if($scope.applyInfo.familyDebt.friendLoanAmount==undefined || $scope.applyInfo.familyDebt.friendLoanAmount == null || isNaN($scope.applyInfo.familyDebt.friendLoanAmount))
                        $scope.applyInfo.familyDebt.friendLoanAmount = 0.00;
                    if($scope.applyInfo.familyDebt.bankLoanYhk==undefined || $scope.applyInfo.familyDebt.bankLoanYhk == null || isNaN($scope.applyInfo.familyDebt.bankLoanYhk))
                        $scope.applyInfo.familyDebt.bankLoanYhk = 0.00;
                    if($scope.applyInfo.familyDebt.pettyLoanYhk==undefined || $scope.applyInfo.familyDebt.pettyLoanYhk == null || isNaN($scope.applyInfo.familyDebt.pettyLoanYhk))
                        $scope.applyInfo.familyDebt.pettyLoanYhk = 0.00;
                    if($scope.applyInfo.familyDebt.creditLoanYhk==undefined || $scope.applyInfo.familyDebt.creditLoanYhk == null || isNaN($scope.applyInfo.familyDebt.creditLoanYhk))
                        $scope.applyInfo.familyDebt.creditLoanYhk = 0.00;
                    if($scope.applyInfo.familyDebt.relativeLoanYhk==undefined || $scope.applyInfo.familyDebt.relativeLoanYhk == null || isNaN($scope.applyInfo.familyDebt.relativeLoanYhk))
                        $scope.applyInfo.familyDebt.relativeLoanYhk = 0.00;
                    if($scope.applyInfo.familyDebt.friendLoanYhk==undefined || $scope.applyInfo.familyDebt.friendLoanYhk == null || isNaN($scope.applyInfo.familyDebt.friendLoanYhk))
                        $scope.applyInfo.familyDebt.friendLoanYhk = 0.00;
                    $scope.applyInfo.familyDebt.loanTotal = $scope.applyInfo.familyDebt.bankLoanAmount+
                        $scope.applyInfo.familyDebt.pettyLoanAmout+
                        $scope.applyInfo.familyDebt.creditLoanAmount+
                        $scope.applyInfo.familyDebt.relativeLoanAmount+
                        $scope.applyInfo.familyDebt.friendLoanAmount;
                    $scope.applyInfo.familyDebt.loanYhkTotal =  $scope.applyInfo.familyDebt.bankLoanYhk+
                        $scope.applyInfo.familyDebt.pettyLoanYhk+
                        $scope.applyInfo.familyDebt.creditLoanYhk+
                        $scope.applyInfo.familyDebt.relativeLoanYhk+
                        $scope.applyInfo.familyDebt.friendLoanYhk
                });
        }

        //增加融资信息
        $scope.activeFinance = function(item){
            item.select=true;
            if(item.seq ==2){
                $scope.initWatchFinance2();
            }else{
                $scope.initWatchFinance3();
            }
            //激活车辆后产品如果为二手车则评估价为300
            if($scope.applyInfo.product.productRule.enableAssessFee==true){
                item.assessFee = 300;
            }else{
                item.assessFee = 0;
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
                        assessFee:0,
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
                        assessFee:0,
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
        $scope.familySelect = function(item){
            console.log(item);
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
            var tmpStr = idNo.substring(6, 14);
            tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6);
            tmpStr = tmpStr.replace(/-/g,"/");
            var date = new Date(tmpStr );
            $scope.applyInfo.tenant.birthday = date.getTime();
            //驾照发放最小可选日期
            $scope.driverLicenseDateOptions.minDate = new Date(ToolsService.addYear(date,18));
        };
        //共组人身份证输入完毕如果与配偶为同一人则自动同步配偶信息到共租人
        $scope.inputCloesseeIdNoComplete = function(){
            if($scope.applyInfo.cloessee.idNo == $scope.applyInfo.spouse.idNo){
                $scope.applyInfo.cloessee.mobile = $scope.applyInfo.spouse.mobile;
                $scope.applyInfo.cloessee.unitName = $scope.applyInfo.spouse.unitName;
                $scope.applyInfo.cloessee.unitType = $scope.applyInfo.spouse.unitType;
                $scope.applyInfo.cloessee.unitIndustry = $scope.applyInfo.spouse.unitIndustry;
                $scope.applyInfo.cloessee.unitTel = $scope.applyInfo.spouse.unitTel;
                $scope.cloesseeRankList = SysDictService.getUnitCanSelRank($scope.applyInfo.cloessee.unitType);
                $scope.applyInfo.cloessee.rank = $scope.applyInfo.spouse.rank;
                $scope.applyInfo.cloessee.rankName = $scope.applyInfo.spouse.rankName;
                $scope.applyInfo.cloessee.monthIncome = $scope.applyInfo.spouse.monthIncome;
                $scope.applyInfo.cloessee.yearIncome = $scope.applyInfo.spouse.yearIncome;
                $scope.applyInfo.cloessee.unitAddrProvince = $scope.applyInfo.spouse.unitAddrProvince;
                $scope.applyInfo.cloessee.unitAddrCity = $scope.applyInfo.spouse.unitAddrCity;
                $scope.applyInfo.cloessee.unitAddrCounty = $scope.applyInfo.spouse.unitAddrCounty;
                $scope.applyInfo.cloessee.unitAddrExt = $scope.applyInfo.spouse.unitAddrExt;
                $scope.cloesseeUnitCountyList = SysAreaService.queryCountyList($scope.applyInfo.cloessee.unitAddrProvince,$scope.applyInfo.cloessee.unitAddrCity).$object;
                $scope.cloesseeUnitCityList = SysAreaService.queryCityList($scope.applyInfo.cloessee.unitAddrProvince).$object;
            }
        }
        $scope.addressCtrl = {
            onEditRefresh : function(){
                SysAreaService.queryCityList($scope.applyInfo.tenant.addrProvince).then(function(response){
                    $scope.tenantCityList = response;
                });
                SysAreaService.queryCountyList($scope.applyInfo.tenant.addrProvince,$scope.applyInfo.tenant.addrCity).then(function(response){
                    $scope.tenantCountyList = response;
                });
                SysAreaService.queryCityList($scope.applyInfo.tenant.unitAddrProvince).then(function(response){
                    $scope.tenantUnitCityList = response;
                });
                SysAreaService.queryCountyList($scope.applyInfo.tenant.unitAddrProvince,$scope.applyInfo.tenant.unitAddrCity).then(function(response){
                    $scope.tenantUnitCountyList = response;
                });
                SysAreaService.queryCityList($scope.applyInfo.spouse.unitAddrProvince).then(function(response){
                    $scope.spouseUnitCityList = response;
                });
                SysAreaService.queryCountyList($scope.applyInfo.spouse.unitAddrProvince,$scope.applyInfo.spouse.unitAddrCity).then(function(response){
                    $scope.spouseUnitCountyList = response;
                });
                SysAreaService.queryCityList($scope.applyInfo.cloessee.unitAddrProvince).then(function(response){
                    $scope.cloesseeUnitCityList = response;
                });
                SysAreaService.queryCountyList($scope.applyInfo.cloessee.unitAddrProvince,$scope.applyInfo.cloessee.unitAddrCity).then(function(response){
                    $scope.cloesseeUnitCountyList = response;
                });
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
        };
        //单位类型可选职级
        $scope.unitRankCtrl = {
            onEditRefresh:function(){
                if($scope.applyInfo.tenant.unitType !=''&& $scope.applyInfo.tenant.unitType!=undefined){
                  $scope.tenantRankList = SysDictService.getUnitCanSelRank($scope.applyInfo.tenant.unitType);
                };
                if($scope.applyInfo.cloessee.unitType !=''&& $scope.applyInfo.cloessee.unitType!=undefined){
                    $scope.cloesseeRankList = SysDictService.getUnitCanSelRank($scope.applyInfo.cloessee.unitType);
                };
                if($scope.applyInfo.spouse.unitType !=''&& $scope.applyInfo.spouse.unitType!=undefined){
                    $scope.spouseRankList = SysDictService.getUnitCanSelRank($scope.applyInfo.spouse.unitType);
                };
            },
            //承租人单位查询职级
            onTenantUnitTypeChange:function(){
                $scope.tenantRankList = SysDictService.getUnitCanSelRank($scope.applyInfo.tenant.unitType);
            },
            //共租人单位查询职级
            onCloesseeUnitTypeChange:function(){
                $scope.cloesseeRankList = SysDictService.getUnitCanSelRank($scope.applyInfo.cloessee.unitType);
            },
            //配偶单位查询职级
            onSpouseUnitTypeChange:function(){
                $scope.spouseRankList = SysDictService.getUnitCanSelRank($scope.applyInfo.spouse.unitType);
            }
        }
        $scope.initSelectList = function(model){
            //可选产品
            if(model=="add"){
                $scope.productList = ProductService.queryBranchEnableProductList().$object;
            }else{
                //编辑的时候不让修改产品
                //$scope.productList = ProductService.queryBranchEnableProductListByBranchCode($scope.applyInfo.createBranchCode).$object;
                $scope.productList = [];
                $scope.productList.push($scope.applyInfo.product);
            }

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
            //与本人关系可选项
            $scope.relateList = SysDictService.queryDictDataByTypeCode("gx").$object;
            //是否知道购车可选项
            $scope.isKnowBuyCarList = SysDictService.queryDictDataByTypeCode("sfzdgc").$object;
            //可选省份
            $scope.provinceList = SysAreaService.queryProvinceList().$object;
            //名族
            $scope.nationList = SysDictService.queryDictDataByTypeCode("mz").$object;
            //驾照类型
            $scope.driverLicenseTypeList = SysDictService.queryDictDataByTypeCode("jzlx").$object;
            //共租人类型
            $scope.cloesseeTypeList = SysDictService.queryDictDataByTypeCode("gzrlx").$object;
            //车辆类型
            $scope.carTypeList = SysDictService.queryDictDataByTypeCode("cllx").$object;
            //初始化最小驾照日期
            try{
                var tmpStr = $scope.applyInfo.tenant.idNo.substring(6, 14);
                tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6);
                tmpStr = tmpStr.replace(/-/g,"/");
                var date = new Date(tmpStr );
                //驾照发放最小可选日期
                $scope.driverLicenseDateOptions.minDate = new Date(ToolsService.addYear(date,18));
            }catch(e){

            }

        }
        //选择车辆
        $scope.selectCar = function(item){
            CarService.selectCar(item.appId,$scope.applyInfo.product.isLcv).then(function(response){
                item.carStyle={};
                angular.copy(response,item.carStyle);
                item.carType = item.carStyle.carSerial.carSerialGroup;
                //判断产品是否二手车，如果不是则评估价/售价=车辆指导价
                if($scope.applyInfo.product.productRule.carType!='clly02'){
                    item.assessPrice = response.guidePrice;
                };
                item.salePrice = undefined;
                item.initPayPercent = undefined;
            });
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
                        var finance1={};
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
            ApplyService.queryApplyInfoByAppId(appId).then(function(response) {
                $scope.applyInfo = response;
                if ($scope.applyInfo.finances == undefined) {
                    $scope.applyInfo.finances = [];
                }
                if ($scope.applyInfo.tenant == undefined) {
                    $scope.applyInfo.tenant = {};
                    if ($scope.applyInfo.tenant.tenantHouses == undefined) {
                        $scope.applyInfo.tenant.tenantHouses = [];
                    }
                    if ($scope.applyInfo.tenant.tenantCars == undefined) {
                        $scope.applyInfo.tenant.tenantCars = [];
                    }
                }
                if ($scope.applyInfo.linkmans == undefined) {
                    $scope.applyInfo.linkmans = [];
                }
                $scope.initFinances($scope.applyInfo.finances);
                $scope.initTenantHouses($scope.applyInfo.tenant.tenantHouses);
                $scope.initTenantCars($scope.applyInfo.tenant.tenantCars);
                $scope.initLinkmans($scope.applyInfo.linkmans);
                $scope.initSelectList("add");
                $scope.addressCtrl.onEditRefresh();
                $scope.unitRankCtrl.onEditRefresh();
                $scope.initWatchTotalFinance();
                $scope.initWatchProduct();
                $scope.refreshFormRequiredMap();
            })
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
                $scope.initSelectList("edit");
                $scope.addressCtrl.onEditRefresh();
                $scope.unitRankCtrl.onEditRefresh();
                $scope.initWatchTotalFinance();
                $scope.initWatchProduct();
                $scope.refreshFormRequiredMap();
            })
        };
        $scope.doInitApplyReadOnly = function(appId){
            // 获取订单数据
            ApplyService.queryApplyInfoByAppId(appId).then(function(response){
                $scope.applyInfo =  response;
                //启动融资金额watch  GPS档位操作
                for(var i = 1 ;i<=$scope.applyInfo.finances.length;i++){
                    if($scope.applyInfo.finances[i-1].select == true){
                        if(i == 1){
                            $scope.finance1={};
                            $scope.finance1 =$scope.applyInfo.finances[0];
                            $scope.$watchGroup(['finance1.salePrice','finance1.initPayPercent'],function(newVal,oldVal){
                                $scope.finance1.gpsLvlList = GpsService.queryEnableGpsLvlList($scope.applyInfo.appId,$scope.finance1.salePrice,$scope.finance1.initPayPercent,$scope.applyInfo.product).$object;
                            },true);
                        }
                        if(i==2){
                            $scope.finance2 =$scope.applyInfo.finances[1];
                            $scope.$watchGroup(['finance2.salePrice','finance2.initPayPercent'],function(newVal,oldVal){
                                $scope.finance2.gpsLvlList = GpsService.queryEnableGpsLvlList($scope.applyInfo.appId,$scope.finance2.salePrice,$scope.finance2.initPayPercent,$scope.applyInfo.product).$object;
                            },true);
                        }
                        if(i==3){
                            $scope.finance3 =$scope.applyInfo.finances[2];
                            $scope.$watchGroup(['finance3.salePrice','finance3.initPayPercent'],function(newVal,oldVal){
                                $scope.finance3.gpsLvlList = GpsService.queryEnableGpsLvlList($scope.applyInfo.appId,$scope.finance3.salePrice,$scope.finance3.initPayPercent,$scope.applyInfo.product).$object;
                            },true);
                        }
                    }
                }
                $scope.initTenantHouses($scope.applyInfo.tenant.tenantHouses);
                $scope.initTenantCars($scope.applyInfo.tenant.tenantCars);
                $scope.initLinkmans($scope.applyInfo.linkmans);
                $scope.initSelectList("edit");
                $scope.addressCtrl.onEditRefresh();
                $scope.unitRankCtrl.onEditRefresh();
            })
        }
        $scope.refreshApplyInfoFromServer= function (appId){
            //关闭watch
            if(watchFinance1Gps!=undefined)
                watchFinance1Gps();
            if(watchFinance1!=undefined)
                watchFinance1();
            if(watchFinance2Gps!=undefined)
                watchFinance2Gps() ;
            if(watchFinance2!=undefined)
                watchFinance2();
            if(watchFinance3Gps!=undefined)
                watchFinance3Gps() ;
            if(watchFinance3!=undefined)
                watchFinance3();
            if(watchTotalFinance!=undefined)
                watchTotalFinance();
            if(watchDebitAmount !=undefined)
                watchDebitAmount();
            if(watchProduct !=undefined)
                watchProduct();
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
                $scope.addressCtrl.onEditRefresh();
                $scope.initWatchTotalFinance();
                $scope.initWatchDebitInfo();
                $scope.initWatchProduct();
            })
        };
        //保存申请信息
        $scope.saveApplyInfo = function(){
            modal.confirm("操作提醒","确认保存？").then(function(){
                $scope.saving = ApplyService.saveApplyInfo($scope.applyInfo).then(function(response){
                    console.log(response.appId);
                    $scope.refreshApplyInfoFromServer(response.appId);
                    toaster.pop('success', '操作提醒','保存申请信息成功');
                });
            })
        };
        //提交申请信息
        $scope.commitApplyTask = function(){
            modal.confirm("操作提醒","确认提交申请？").then(function(response){
                $scope.saving =  TaskService.commitApplyTask($scope.applyInfo).then(function(response){
                    $state.go('app.apply.list');
                    toaster.pop('success', '操作提醒','提交申请信息成功')
                });
            });
        };
        $scope.initApplyFileManage=function(){
            $scope.applyFileInterface.init($scope.applyInfo.appId,'apply');
        };
        $scope.initApplyFileComponent = function(fileInterface){
            $scope.applyFileInterface = fileInterface;
        };
        $scope.pageChanged = function(){
            $scope.initQueryUnCommitApplyInfoList();
        };
        //驾照发放最大日期
        $scope.driverLicenseDateOptions={
                maxDate : new Date()
            };
    })
;