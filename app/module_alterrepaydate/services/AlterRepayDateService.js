angular.module('pu.alterrepaydate.services')
    .service("AlterRepayDateService",function($window,RestApi,$uibModal,toaster) {
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
        }
        this.addAlterRepayDateApply = function (appId) {
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop: 'static',
                size: 'lg',
                templateUrl: 'module_alterrepaydate/tpl/dialog-alterrepaydate-add.html',
                controller: function ($scope, RestApi, SettleService, ToolsService, modal, LoanQueryService) {
                    $scope.appId = appId;
                    $scope.applyVo = {};
                    $scope.baseInfoVo = LoanQueryService.getLoanCustApplyInfo($scope.appId).$object;
                    $scope.dateOptions = {
                    };
                    LoanQueryService.getCurrentPeriodRepayPlan($scope.appId).then(function(response){
                        $scope.applyVo.newClosingDate = response.closingDate;
                        $scope.dateOptions.minDate = response.closingDate;
                        $scope.dateOptions.maxDate = ToolsService.addNumberMonth(response.closingDate,1);
                        $scope.applyVo.oldClosingDate = response.closingDate;
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
                    modalInstance.result.then(function (response) {
                        toaster.pop('success', '操作提醒', "提交任务成功");
                    })
                }
            });
        }
    });