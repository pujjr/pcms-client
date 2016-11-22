angular.module('pu.remission.services')
    .service("RemissionService",function($window,RestApi,$uibModal,toaster) {
        this.getRefundFeeItem = function (appId) {
            return RestApi.one("/refund/getRefundFeeItem", appId).get();
        };
        this.commitApplyRefundTask = function (appId, params) {
            return RestApi.all("/refund/commitApplyRefundTask").all(appId).post(params);
        };
        this.getApplyRefundTaskById = function (id) {
            return RestApi.one("/refund/getApplyRefundTaskById", id).get();
        };
        this.commitApproveRefundTask = function (taskId, params) {
            return RestApi.all("/refund/commitApproveRefundTask").all(taskId).post(params);
        };
        this.getApplyRefundTaskList = function () {
            return RestApi.all("/refund/getApplyRefundTaskList").getList();
        };
        this.commitConfirmRefundTask = function(taskId){
            return RestApi.all("/refund/commitConfirmRefundTask").all(taskId).post();
        }
        this.addRemissionApply = function (appId) {
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop: 'static',
                size: 'lg',
                templateUrl: 'module_remission/tpl/dialog-remission-add.html',
                controller: function ($scope, RestApi, RemissionService, ToolsService, modal, LoanQueryService) {
                    $scope.appId = appId;
                    $scope.applyVo = {};
                    $scope.baseInfoVo = LoanQueryService.getLoanCustApplyInfo($scope.appId).$object;
                    $scope.applyVo.refundDate = (new Date()).getTime();
                    RefundService.getRefundFeeItem($scope.appId).then(function(response){
                        $scope.applyVo.stayAmount = response.stayAmount;
                    });
                    LoanQueryService.getLoanCustNeedRepayInfo($scope.appId).then(function(response){
                        
                    })
                    $scope.ok = function () {
                        modal.confirm("操作提醒", "确认提交申请").then(function () {
                            RefundService.commitApplyRefundTask($scope.appId, $scope.applyVo).then(function () {
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