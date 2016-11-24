angular.module('pu.otherfee.services')
    .service("OtherFeeService",function($window,RestApi,$uibModal,toaster) {
        this.commitApplyOtherFeeTask = function (appId, params) {
            return RestApi.all("/otherfee/commitApplyOtherFeeTask").all(appId).post(params);
        };
        this.getApplyOtherFeeTaskById = function (id) {
            return RestApi.one("/otherfee/getApplyOtherFeeTaskById", id).get();
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
        this.addOtherFeeApply = function (appId) {
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop: 'static',
                size: 'lg',
                templateUrl: 'module_otherfee/tpl/dialog-otherfee-add.html',
                controller: function ($scope, RestApi, OtherFeeService, ToolsService, modal, LoanQueryService) {
                    $scope.appId = appId;
                    $scope.applyVo = {};
                    $scope.baseInfoVo = LoanQueryService.getLoanCustApplyInfo($scope.appId).$object;
                    $scope.applyVo.detailList = [];
                    $scope.applyVo.feeTotalAmount = 0.00;
                    $scope.$watchCollection('applyVo.detailList',function(){
                        var tmp  = 0.00;
                        angular.forEach($scope.applyVo.detailList,function(item){
                            tmp += item.itemAmount;
                        })
                        $scope.applyVo.feeTotalAmount=parseFloat(tmp.toFixed(2));
                    })
                    $scope.ok = function () {
                        modal.confirm("操作提醒", "确认提交申请").then(function () {
                            OtherFeeService.commitApplyOtherFeeTask($scope.appId, $scope.applyVo).then(function () {
                                modalInstance.close();
                            })
                        })
                    };
                    $scope.removeDetailItem = function(index){
                        $scope.applyVo.detailList.splice(index,1);
                    }
                    $scope.addDetail = function(){
                        OtherFeeService.addOtherFeeDetail().then(function(response){
                            $scope.applyVo.detailList.push(response);
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
        this.addOtherFeeDetail = function(){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop: 'static',
                size: 'md',
                templateUrl: 'module_otherfee/tpl/dialog-otherfee-add-detail.html',
                controller: function ($scope, RestApi, modal, SysDictService) {
                    $scope.item = {};
                    $scope.feeItemNameList = SysDictService.queryDictDataByTypeCode("qtfyxm").$object;
                    $scope.ok = function () {
                        var feeItem = {};
                        feeItem.itemName = $scope.feeItemType.dictDataCode;
                        feeItem.itemNameDesc = $scope.feeItemType.dictDataName;
                        feeItem.itemAmount = $scope.item.itemAmount;
                        modalInstance.close(feeItem);
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            return modalInstance.result;
        }
    });