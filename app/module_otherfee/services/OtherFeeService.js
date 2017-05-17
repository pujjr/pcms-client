angular.module('pu.otherfee.services')
    .service("OtherFeeService",function($window,RestApi,$uibModal,toaster) {
        this.commitApplyOtherFeeTask = function (appId, params) {
            return RestApi.all("/otherfee/commitApplyOtherFeeTask").all(appId).post(params);
        };
        this.getApplyOtherFeeTaskById = function (id) {
            return RestApi.one("/otherfee/getApplyOtherFeeTaskById", id).get();
        };
        this.commitApproveOtherFeeTask = function (taskId, params) {
            return RestApi.all("/otherfee/commitApproveOtherFeeTask").all(taskId).post(params);
        };
        this.getApplyOtherFeeTaskList = function () {
            return RestApi.all("/otherfee/getApplyOtherFeeTaskList").getList();
        };
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
                        if($scope.applyVo.detailList.length==0){
                            modal.error("未录入费用明细")
                        }else{
                            modal.confirm("操作提醒", "确认提交申请").then(function () {
                                OtherFeeService.commitApplyOtherFeeTask($scope.appId, $scope.applyVo).then(function () {
                                    modalInstance.close();
                                })
                            })
                        }
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
        };
        this.showOtherFeeTaskDetail = function(item){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop:'static',
                resolve:{
                    item:function(){
                        return item;
                    }
                },
                size:'lg',
                templateUrl :'module_otherfee/tpl/dialog-otherfee-task-detail.html',
                controller:function($scope,RestApi,OtherFeeService,ToolsService,modal,QueryService,item,$uibModalInstance,LoanQueryService,$rootScope){
                    $scope.businessKey = item.id;
                    $scope.appId = item.appId;
                    $scope.procDefId = item.procDefId;
                    $scope.procInstId = item.procInstId;
                    $scope.baseInfoVo = LoanQueryService.getLoanCustApplyInfo($scope.appId).$object;
                    $scope.applyVo = OtherFeeService.getApplyOtherFeeTaskById($scope.businessKey).$object
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