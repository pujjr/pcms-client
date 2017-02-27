angular.module('pu.remission.services')
    .service("RemissionService",function($window,RestApi,$uibModal,toaster) {
        this.commitApplyRemissionTask = function (appId, params) {
            return RestApi.all("/remission/commitApplyRemissionTask").all(appId).post(params);
        };
        this.getApplyRemissionTaskById = function (id) {
            return RestApi.one("/remission/getApplyRemissionTaskById", id).get();
        };
        this.commitApproveRemissionTask = function (taskId, params) {
            return RestApi.all("/remission/commitApproveRemissionTask").all(taskId).post(params);
        };
        this.getApplyRemissionTaskList = function () {
            return RestApi.all("/remission/getApplyRemissionTaskList").getList();
        };
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
                    //最小结清可选日期为当前日期
                    ToolsService.getServerDateTime().then(function(response){
                        $scope.applyVo.remissionDate = ToolsService.convertStr82Date(response);
                    })
                    LoanQueryService.getLoanCustNeedRepayInfo($scope.appId).then(function(response){
                        $scope.applyVo.feeItem = response;
                    })
                    $scope.ok = function () {
                        modal.confirm("操作提醒", "确认提交申请").then(function () {
                            RemissionService.commitApplyRemissionTask($scope.appId, $scope.applyVo).then(function () {
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
        this.showRemissionTaskDetail = function(item){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop:'static',
                resolve:{
                    item:function(){
                        return item;
                    }
                },
                size:'lg',
                templateUrl :'module_remission/tpl/dialog-remission-task-detail.html',
                controller:function($scope,RestApi,RemissionService,ToolsService,modal,QueryService,item,$uibModalInstance,LoanQueryService,$rootScope){
                    $scope.businessKey = item.id;
                    $scope.appId = item.appId;
                    $scope.procDefId = item.procDefId;
                    $scope.procInstId = item.procInstId;
                    $scope.baseInfoVo = LoanQueryService.getLoanCustApplyInfo($scope.appId).$object;
                    $scope.applyVo = RemissionService.getApplyRemissionTaskById($scope.businessKey).$object;
                    LoanQueryService.getLoanCustNeedRepayInfo($scope.appId).then(function(response){
                        $scope.applyVo.feeItem = response;
                    })
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