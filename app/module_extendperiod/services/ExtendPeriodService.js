angular.module('pu.extendperiod.services')
    .service("ExtendPeriodService",function($window,RestApi,$uibModal,toaster) {
        this.getExtendPeriodFeeItem = function (appId,extendPeriod) {
            return RestApi.one("/extendperiod/getExtendPeriodFeeItem", appId).get({'extendPeriod': extendPeriod});
        };
        this.commitApplyExtendPeriodTask = function (appId, params) {
            return RestApi.all("/extendperiod/commitApplyExtendPeriodTask").all(appId).post(params);
        };
        this.getApplyExtendPeriodTaskById = function (id) {
            return RestApi.one("/extendperiod/getApplyExtendPeriodTaskById", id).get();
        };
        this.commitApproveExtendPeriodTask = function (taskId, params) {
            return RestApi.all("/extendperiod/commitApproveExtendPeriodTask").all(taskId).post(params);
        };
        this.commitApproveRemissionTask = function(taskId,params){
            return RestApi.all("/extendperiod/commitApproveRemissionTask").all(taskId).post(params);
        }
        this.getApplyExtendPeriodTaskList = function () {
            return RestApi.all("/extendperiod/getApplyExtendPeriodTaskList").getList();
        };
        this.commitApplyConfirmExtendPeriodTask = function(taskId,params){
            return RestApi.all("/extendperiod/commitApplyConfirmExtendPeriodTask").all(taskId).post(params);
        };
        this.commitConfirmExtendPeriodTask = function(taskId){
            return RestApi.all("/extendperiod/commitConfirmExtendPeriodTask").all(taskId).post();
        };
        this.addExtendPeriodApply = function (appId) {
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop: 'static',
                size: 'lg',
                templateUrl: 'module_extendperiod/tpl/dialog-extendperiod-add.html',
                controller: function ($scope, RestApi, ExtendPeriodService, ToolsService, modal, LoanQueryService,ProductService,SysDictService) {
                    $scope.appId = appId;
                    $scope.applyVo = {};
                    $scope.applyVo.newRepayMode = "hkfs01";

                    //获取还款方式
                    $scope.repayModeList  = SysDictService.queryDictDataByTypeCode('hkfs').$object;
                    //获取基本信息
                    LoanQueryService.getLoanCustApplyInfo($scope.appId).then(function(response){
                         $scope.baseInfoVo = response;
                        //获取展期可选期数
                        $scope.extendPeriods = ProductService.getProductExtendPeriodList(response.productCode,response.period).$object;
                    });
                    //获取申请有效截止日期
                    LoanQueryService.getCurrentPeriodRepayPlan($scope.appId).then(function(response){
                        $scope.applyVo.applyEndDate  = response.closingDate - 24*60*60*1000;
                    });
                    //监控选择新融资期限
                    $scope.$watch('applyVo.newPeriod', function (newVal, oldVal) {
                        if (newVal == oldVal || newVal == undefined)
                            return;
                        //计算展期间隔期数
                        var extendPeriod = parseInt(newVal)-parseInt($scope.baseInfoVo.period);
                        $scope.applyVo.extendPeriod = extendPeriod;
                        //计算展期费用
                        ExtendPeriodService.getExtendPeriodFeeItem($scope.appId,extendPeriod).then(function(response){
                            $scope.applyVo.feeItem = response;
                        });
                    });
                    $scope.ok = function () {
                        modal.confirm("操作提醒", "确认提交申请").then(function () {
                            ExtendPeriodService.commitApplyExtendPeriodTask($scope.appId,  $scope.applyVo).then(function () {
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
    });