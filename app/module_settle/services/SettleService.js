angular.module('pu.settle.services')
    .service("SettleService",function($window,RestApi,$uibModal,toaster){
        this.getAllSettleFeeItem = function(appId,settleEffectDate){
            return RestApi.one("/settle/getAllSettleFeeItem",appId).get({'settleEffectDate':settleEffectDate});
        };
        this.commitApplySettleTask = function(appId,params){
            return RestApi.all("/settle/commitApplySettleTask").all(appId).post(params);
        };
        this.getApplyPublicRepayInfo = function(id){
            return RestApi.one("/publicrepay/getApplyPublicRepayInfo",id).get();
        };
        this.commitApprovePublicRepayTask = function(appId,params){
            return RestApi.all("/publicrepay/commitApprovePublicRepayTask").all(appId).post(params);
        };
        this.getApplyPublicRepayTaskList = function(){
            return RestApi.all("/publicrepay/getApplyPublicRepayTaskList").getList();
        }
        this.addSettleApply = function(appId){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop:'static',
                size:'lg',
                templateUrl :'module_settle/tpl/dialog-settle-add.html',
                controller:function($scope,RestApi,SettleService,ToolsService,modal,LoanQueryService){
                    $scope.appId = appId;
                    $scope.baseInfoVo = LoanQueryService.getLoanCustApplyInfo($scope.appId).$object;
                    $scope.applyVo = {};
                    $scope.$watch('applyVo.applyEffectDate',function(newVal,oldVal){
                        if(newVal == oldVal || newVal ==undefined)
                            return;
                        SettleService.getAllSettleFeeItem($scope.appId,$scope.applyVo.applyEffectDate).then(function(response){
                            $scope.applyVo.feeItem = response;
                            $scope.applyVo.totalRepayAmount = response.repayCapital+
                                response.repayInterest+
                                response.repayOverdueAmount+
                                response.otherAmount+
                                response.otherOverdueAmount;
                        })
                    })
                    $scope.ok=function(){
                        modal.confirm("操作提醒","确认提交申请").then(function(){
                            SettleService.commitApplySettleTask($scope.appId,$scope.applyVo).then(function(){
                                modalInstance.close();
                            })

                        })
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                toaster.pop('success', '操作提醒', "提交任务成功");
            })
        }
    });
