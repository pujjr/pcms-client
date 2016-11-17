angular.module('pu.publicrepay.services')
    .service("PublicRepayService",function($window,RestApi,$uibModal){
        this.getPublicRepayFeeItem = function(appId){
            return RestApi.one("/publicrepay/getPublicRepayFeeItem",appId).get();
        };
        this.commitApplyPublicRepayTask = function(appId,params){
            return RestApi.all("/publicrepay/commitApplyPublicRepayTask").all(appId).post(params);
        }
        this.addPublicRepayApply = function(appId){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop:'static',
                size:'lg',
                templateUrl :'module_publicrepay/tpl/dialog-publicrepay-add.html',
                controller:function($scope,RestApi,PublicRepayService,ToolsService,modal){
                    $scope.appId = appId;
                    $scope.applyPublicRepayVo = {};

                    PublicRepayService.getPublicRepayFeeItem($scope.appId).then(function(response){
                        $scope.applyPublicRepayVo.feeItem = response;
                        $scope.applyPublicRepayVo.totalRepayAmount = response.repayCapital+
                            response.repayInterest+
                            response.repayOverdueAmount+
                            response.otherAmount+
                            response.otherOverdueAmount;
                        ToolsService.getServerDateTime().then(function(response){
                            $scope.applyPublicRepayVo.chargeDate= response;
                        })
                    })
                    $scope.ok=function(){
                        modal.confirm("操作提醒","确认提交申请").then(function(){
                            PublicRepayService.commitApplyPublicRepayTask($scope.appId,$scope.applyPublicRepayVo).then(function(){
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
            })
        }
    });
