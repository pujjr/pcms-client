angular.module('pu.settle.services')
    .service("SettleService",function($window,RestApi,$uibModal,toaster) {
        this.getAllSettleFeeItem = function (appId, settleEffectDate) {
            return RestApi.one("/settle/getAllSettleFeeItem", appId).get({'settleEffectDate': settleEffectDate});
        };
        this.commitApplySettleTask = function (appId, settleType, params) {
            return RestApi.all("/settle/commitApplySettleTask").all(appId).all(settleType).post(params);
        };
        this.getApplySettleInfo = function (id) {
            return RestApi.one("/settle/getApplySettleInfo", id).get();
        };
        this.commitApproveSettleTask = function (taskId, params) {
            return RestApi.all("/settle/commitApproveSettleTask").all(taskId).post(params);
        };
        this.getApplySettleTaskList = function (settleType) {
            return RestApi.all("/settle/getApplySettleTaskList").getList({"settleType":settleType});
        };
        this.commitApplyConfirmSettleTask = function(taskId,params){
            return RestApi.all("/settle/commitApplyConfirmSettleTask").all(taskId).post(params);
        };
        this.commitRemissionApprove = function(taskId,params){
            return RestApi.all("/settle/commitApproveRemissionTask").all(taskId).post(params);
        };
        this.commitConfirmSettleTask = function(taskId,params){
            return RestApi.all("/settle/commitConfirmSettleTask").all(taskId).post(params);
        }
        this.getPartSettleFeeItem = function(appId,beginPeriod,endPeriod,settleEffectDate){
            return RestApi.one("/settle/getPartSettleFeeItem", appId).get({'beginPeriod':beginPeriod,'endPeriod':endPeriod,'settleEffectDateStr': settleEffectDate});
        };
        this.genPartSettleRepayPlan = function(appId,settleCapital,settlePeriod,settleEffectDate){
            return RestApi.all("/settle/refreshRepayPlan/select").all(appId).getList({'settleCapital':settleCapital,'settlePeriod':settlePeriod,'settleEffectDateStr': settleEffectDate})
        }

        this.addSettleApply = function (appId) {
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop: 'static',
                size: 'lg',
                templateUrl: 'module_settle/tpl/dialog-settle-add.html',
                controller: function ($scope, RestApi, SettleService, ToolsService, modal, LoanQueryService) {
                    $scope.appId = appId;
                    $scope.applyVo = {};
                    $scope.baseInfoVo = LoanQueryService.getLoanCustApplyInfo($scope.appId).$object;
                    LoanQueryService.getAfterCurrentPeriodRemainPeroidList($scope.appId).then(function (response) {
                        $scope.applyVo.beginPeriod = response[0];
                        $scope.applyVo.endPeriod = response[response.length - 1];
                    });
                    $scope.dateOptions = {};
                    //最小结清可选日期为当前日期
                    ToolsService.getServerDateTime().then(function(response){
                        $scope.dateOptions.minDate = ToolsService.convertStr82Date(response);
                    })
                    //最大结清可选日期为当期结账日
                    LoanQueryService.getCurrentPeriodRepayPlan($scope.appId).then(function(response){
                        $scope.dateOptions.maxDate = new Date(parseInt(response.closingDate));
                    });
                    $scope.$watch('applyVo.applyEffectDate', function (newVal, oldVal) {
                        if (newVal == oldVal || newVal == undefined)
                            return;
                        SettleService.getAllSettleFeeItem($scope.appId, $scope.applyVo.applyEffectDate).then(function (response) {
                            $scope.applyVo.feeItem = response;
                        })
                    });
                    $scope.ok = function () {
                        modal.confirm("操作提醒", "确认提交申请").then(function () {
                            SettleService.commitApplySettleTask($scope.appId, 'jqlx01', $scope.applyVo).then(function () {
                                modalInstance.close();
                            })
                        })
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function (response) {
                toaster.pop('success', '操作提醒', "提交任务成功");
            })
        }
        this.addPartSettleApply = function (appId) {
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop: 'static',
                size: 'lg',
                templateUrl: 'module_settle/tpl/dialog-partsettle-add.html',
                controller: function ($scope, RestApi, SettleService, ToolsService, modal, LoanQueryService) {
                    $scope.appId = appId;
                    $scope.applyVo = {};
                    //基本申请信息
                    $scope.baseInfoVo = LoanQueryService.getLoanCustApplyInfo($scope.appId).$object;
                    //可选期数
                    LoanQueryService.getAfterCurrentPeriodRemainPeroidList($scope.appId).then(function (response) {
                        $scope.applyVo.beginPeriod = response[0];
                        $scope.applyVo.endPeriod = response[response.length - 1];
                        /**生成可选截止期数  业务要求直接选择结清期数
                        $scope.canSelSettlePeriod = [];
                        var startIndex = $scope.applyVo.beginPeriod>=3?$scope.applyVo.beginPeriod:3;
                        for(var i = startIndex ; i<=$scope.applyVo.endPeriod;i++){
                            $scope.canSelSettlePeriod.push({'key':i,'name':i+"期"}) ;
                        }**/
                        //生成结清可选期数，以3为倍数
                        $scope.canSelSettlePeriod = [];
                        for(var i = 1,j=1 ;i<=parseInt($scope.applyVo.endPeriod)-parseInt($scope.applyVo.beginPeriod)+1;i=i+3,j++){
                            $scope.canSelSettlePeriod.push({key:j*3,name:j*3+'期'});
                        }
                    });
                    $scope.dateOptions = {};
                    //最小结清可选日期为当前日期
                    ToolsService.getServerDateTime().then(function(response){
                        $scope.dateOptions.minDate = ToolsService.convertStr82Date(response);
                    })
                    //最大结清可选日期为当期结账日
                    LoanQueryService.getCurrentPeriodRepayPlan($scope.appId).then(function(response){
                        $scope.dateOptions.maxDate = new Date(parseInt(response.closingDate));
                        $scope.applyVo.applyEffectDate =  $scope.dateOptions.maxDate;
                    });
                    //监视选择日期动作
                    $scope.$watchGroup(['applyVo.applyEffectDate','applyVo.settlePeriod'], function (newVal, oldVal) {
                        if (newVal == oldVal || newVal == undefined)
                            return;
                        if($scope.applyVo.applyEffectDate == undefined || $scope.applyVo.settlePeriod == undefined)
                            return;
                        $scope.applyVo.endPeriod = parseInt($scope.applyVo.beginPeriod + $scope.applyVo.settlePeriod)-1;
                        SettleService.getPartSettleFeeItem($scope.appId,$scope.applyVo.beginPeriod,$scope.applyVo.endPeriod, $scope.applyVo.applyEffectDate).then(function (response) {
                            $scope.applyVo.feeItem = response;
                            //保存总的剩余结清本金=结清本金+结清剩余本金
                            $scope.totalSettleCaptial=parseFloat((response.settleCapital+response.settleAfterAmount).toFixed(2));
                            if(watchSettleCapital != undefined){
                                watchSettleCapital();
                            }
                            $scope.initWatchSettleCapital();
                        })
                    });
                    //监视输入新的结清本金处理
                    var watchSettleCapital;
                    $scope.initWatchSettleCapital = function(){
                        watchSettleCapital = $scope.$watch('applyVo.feeItem.settleCapital',function(newVal,oldVal){
                            //更新结清后剩余本金
                            $scope.applyVo.feeItem.settleAfterAmount =parseFloat(( $scope.totalSettleCaptial-$scope.applyVo.feeItem.settleCapital).toFixed(2));
                            //更新结清金额合计 = 逾期本金 + 逾期利息 + 逾期罚息 + 其他费用 + 其他费用罚息 + 提前还款违约金 - 挂账金额
                            $scope.applyVo.feeItem.settleTotalAmount =
                                parseFloat(
                                (
                                    $scope.applyVo.feeItem.repayCapital+
                                    $scope.applyVo.feeItem.repayInterest+
                                    $scope.applyVo.feeItem.repayOverdueAmount+
                                    $scope.applyVo.feeItem.otherAmount+
                                    $scope.applyVo.feeItem.otherOverdueAmount-
                                    $scope.applyVo.feeItem.stayAmount+
                                    $scope.applyVo.feeItem.settleCapital+
                                    $scope.applyVo.feeItem.lateFee
                                ).toFixed(2)
                            )
                        })
                    }
                    $scope.ok = function () {
                        modal.confirm("操作提醒", "确认提交申请").then(function () {
                            SettleService.commitApplySettleTask($scope.appId, 'jqlx02', $scope.applyVo).then(function () {
                                modalInstance.close();
                            })
                        })
                    };
                    $scope.genRepayPlan = function(){
                        SettleService.genPartSettleRepayPlan($scope.appId,$scope.applyVo.feeItem.settleCapital,$scope.applyVo.endPeriod,$scope.applyVo.applyEffectDate).then(function(response){
                            $scope.applyVo.repayPlanList = response;
                        })
                    }
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function (response) {
                toaster.pop('success', '操作提醒', "提交任务成功");
            })
        }
    });