angular.module('pu.alterrepaydate.services')
    .service("AlterRepayDateService",function($window,RestApi,$uibModal,toaster) {
        this.getAlterRepayDateFeeItem = function (appId, oldClosingDate,newClosingDate) {
            return RestApi.one("/alterrepaydate/getAlterRepayDateFeeItem", appId).get({'oldClosingDate': oldClosingDate,'newClosingDate':newClosingDate});
        };
        this.commitApplyAlterRepayDateTask = function (appId, params) {
            return RestApi.all("/alterrepaydate/commitApplyAlterRepayDateTask").all(appId).post(params);
        };
        this.getApplyAlterRepayDateTaskById = function (id) {
            return RestApi.one("/alterrepaydate/getApplyAlterRepayDateTaskById", id).get();
        };
        this.commitApproveAlterRepayDateTask = function (taskId, params) {
            return RestApi.all("/alterrepaydate/commitApproveAlterRepayDateTask").all(taskId).post(params);
        };
        this.getApplyAlterRepayDateTaskList = function (settleType) {
            return RestApi.all("/alterrepaydate/getApplyAlterRepayDateTaskList").getList();
        };
        this.commitConfirmAlterRepayDateTask = function(taskId){
            return RestApi.all("/alterrepaydate/commitConfirmAlterRepayDateTask").all(taskId).post();
        }
        this.addAlterRepayDateApply = function (appId) {
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop: 'static',
                size: 'lg',
                templateUrl: 'module_alterrepaydate/tpl/dialog-alterrepaydate-add.html',
                controller: function ($scope, RestApi, AlterRepayDateService, ToolsService, modal, LoanQueryService) {
                    $scope.appId = appId;
                    $scope.applyVo = {
                        feeItem:{

                        }
                    };
                    $scope.baseInfoVo = LoanQueryService.getLoanCustApplyInfo($scope.appId).$object;
                    $scope.dateOptions = {
                    };
                    LoanQueryService.getCurrentPeriodRepayPlan($scope.appId).then(function(response){
                        $scope.applyVo.newClosingDate = response.closingDate;
                        $scope.dateOptions.minDate =  new Date(parseInt(response.closingDate));
                        //有效期为当期结账日前一天
                        $scope.applyVo.applyEffectDate = response.closingDate-24*60*60*1000;
                        $scope.dateOptions.maxDate =  new Date(parseInt(ToolsService.addNumberMonth(response.closingDate,1)));
                        $scope.applyVo.oldClosingDate = response.closingDate;
                    });
                    $scope.$watch('applyVo.newClosingDate', function (newVal, oldVal) {
                        if (newVal == oldVal || newVal == undefined  || newVal == $scope.applyVo.oldClosingDate)
                            return;
                        AlterRepayDateService.getAlterRepayDateFeeItem($scope.appId, new Date($scope.applyVo.oldClosingDate),$scope.applyVo.newClosingDate).then(function (response) {
                            $scope.applyVo.feeItem.alterDay = response.alterDay;
                            $scope.applyVo.feeItem.alterInterest = response.alterInterest;
                            $scope.applyVo.feeItem.newRepayPlanList = response.newRepayPlanList;
                        })
                    });
                    $scope.ok = function () {
                        modal.confirm("操作提醒", "确认提交申请").then(function () {
                            AlterRepayDateService.commitApplyAlterRepayDateTask($scope.appId, $scope.applyVo).then(function () {
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
        };
        this.showAlterRepayDateTaskDetail = function(item){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop:'static',
                resolve:{
                    item:function(){
                        return item;
                    }
                },
                size:'lg',
                templateUrl :'module_alterrepaydate/tpl/dialog-alterrepaydate-task-detail.html',
                controller:function($scope,RestApi,AlterRepayDateService,ToolsService,modal,QueryService,item,$uibModalInstance,LoanQueryService){
                    $scope.businessKey = item.id;
                    $scope.appId = item.appId;
                    $scope.procDefId = item.procDefId;
                    $scope.procInstId = item.procInstId;
                    $scope.baseInfoVo = LoanQueryService.getLoanCustApplyInfo($scope.appId).$object;
                    LoanQueryService.getCurrentPeriodRepayPlan($scope.appId).then(function(response){
                        $scope.applyVo.closingDate = response.closingDate;
                    });
                    $scope.applyVo = AlterRepayDateService.getApplyAlterRepayDateTaskById($scope.businessKey).$object
                    $scope.getWorkflowProcessResultByProcInstId = function(){
                        $scope.workflowProcessResultList = QueryService.getWorkflowProcessResultByProcInstId($scope.procInstId).$object;
                    };
                    $scope.openWorkflowDiagram = function(taskId ) {
                        var processDefinitionId = $scope.procDefId;
                        var processInstanceId = $scope.procInstId;
                        window.open(BASE_URL + "/diagram-viewer/index.html?processDefinitionId=" + processDefinitionId + "&processInstanceId=" + processInstanceId + "&token=" + window.localStorage.Authorization);
                    }
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
        }
    });