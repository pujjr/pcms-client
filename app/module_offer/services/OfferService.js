angular.module('pu.offer.services')
    .service("OfferService",function($window,RestApi,$uibModal,toaster){
        this.getOfferFeeItem = function(appId){
            return RestApi.one("/offer/getOfferFeeItem",appId).get();
        };
        this.commitApplyOfferTask = function(appId,params){
            return RestApi.all("/offer/commitApplyOfferTask").all(appId).post(params);
        };
        this.getApplyOfferInfo = function(id){
            return RestApi.one("/offer/getApplyOfferInfo",id).get();
        };
        this.commitApproveOfferTask = function(appId,params){
            return RestApi.all("/offer/commitApproveOfferTask").all(appId).post(params);
        };
        this.getApplyOfferTaskList = function(){
            return RestApi.all("/offer/getApplyOfferTaskList").getList();
        }
        this.addOfferApply = function(appId){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop:'static',
                size:'lg',
                templateUrl :'module_offer/tpl/dialog-offer-add.html',
                controller:function($scope,RestApi,OfferService,ToolsService,modal){
                    $scope.appId = appId;
                    $scope.applyOfferVo = {};

                    OfferService.getOfferFeeItem($scope.appId).then(function(response){
                        $scope.applyOfferVo.feeItem = response;
                        $scope.applyOfferVo.totalRepayAmount = ($scope.applyOfferVo.feeItem.repayCapital+
                        $scope.applyOfferVo.feeItem.repayInterest+
                        $scope.applyOfferVo.feeItem.repayOverdueAmount+
                        $scope.applyOfferVo.feeItem.otherAmount+
                        $scope.applyOfferVo.feeItem.otherOverdueAmount).toFixed(2);
                    })
                    $scope.ok=function(){
                        modal.confirm("操作提醒","确认提交申请").then(function(){
                            OfferService.commitApplyOfferTask($scope.appId,$scope.applyOfferVo).then(function(){
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
        };
        this.showOfferTaskDetail = function(item){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop:'static',
                resolve:{
                    item:function(){
                        return item;
                    }
                },
                size:'lg',
                templateUrl :'module_offer/tpl/dialog-offer-task-detail.html',
                controller:function($scope,RestApi,OfferService,ToolsService,modal,QueryService,item,$uibModalInstance,$rootScope){
                    $scope.businessKey = item.id;
                    $scope.appId = item.appId;
                    $scope.procDefId = item.procDefId;
                    $scope.procInstId = item.procInstId;
                    OfferService.getApplyOfferInfo($scope.businessKey).then(function(response){
                        $scope.applyOfferVo = response;
                        $scope.applyOfferVo.totalRepayAmount = ($scope.applyOfferVo.feeItem.repayCapital+
                        $scope.applyOfferVo.feeItem.repayInterest+
                        $scope.applyOfferVo.feeItem.repayOverdueAmount+
                        $scope.applyOfferVo.feeItem.otherAmount+
                        $scope.applyOfferVo.feeItem.otherOverdueAmount).toFixed(2);
                    });
                    $scope.getWorkflowProcessResultByProcInstId = function(){
                        $scope.workflowProcessResultList = QueryService.getWorkflowProcessResultByProcInstId($scope.procInstId).$object;
                    };
                    $scope.openWorkflowDiagram = function(taskId ) {
                        var processDefinitionId = $scope.procDefId;
                        var processInstanceId = $scope.procInstId;
                        window.open(BASE_URL + "/diagram-viewer/index.html?processDefinitionId=" + processDefinitionId + "&processInstanceId=" + processInstanceId + "&token=" + $rootScope.Authorization);
                    }
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
        }
    });
