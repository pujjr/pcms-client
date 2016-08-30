'use strict';

/* Controllers */
angular.module("pu.workflow.controllers")
    .controller("WorkflowController", function ($scope, RestApi, $state, $rootScope,$uibModal, modal, toaster,ToolsService,$window,WorkflowService) {
        $scope.init= function () {
            RestApi.all("/workflowtype").getList().then(function(response){
                $scope.workflowTypes=ToolsService.convertArrayToTree(response, {
                    idKey: 'id',
                    parentKey: 'parentTypeId',
                    childrenKey: 'children'
                });
            })
        };
        $scope.$on("nodeClicked", function (event) {
            $scope.selType=event.targetScope.treeData;
            $scope.workflowDefines = RestApi.all("/workflow/list").getList({"workflow_type_id":$scope.selType.id}).$object;
        });
        $scope.createWorkflowDefine=function(){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_workflow/tpl/dialog-create-workflowdefine.html',
                controller:function($scope,RestApi){
                    $scope.workflowDefine={};
                    $scope.workflowTyps = RestApi.all("/workflowtype").getList().$object;
                    $scope.ok=function(){
                        modalInstance.close($scope.workflowDefine);
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                RestApi.all("/workflow/create").post(response).then(function(response){
                    toaster.pop('success', '操作提醒', '增加流程成功');
                    $scope.workflowDefines = RestApi.all("/workflow/list").getList({"workflow_type_id":$scope.selType.id}).$object;
                })
            })
        };
        $scope.editWorkflow = function(modelId){
            WorkflowService.showWorkflowEditor(modelId);
        };
        $scope.showWorkflowVersionsList = function(defineId){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                resolve: {
                    defineId: function () {
                        return defineId;
                    }
                },
                templateUrl :'module_workflow/tpl/dialog-workflow-versions.html',
                controller:function($scope,RestApi,WorkflowService){
                    $scope.workflowVersions = RestApi.all("/workflowVersion/list").getList({"defineId":defineId}).$object;
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                    $scope.editWorkflow = function(modelId){
                        WorkflowService.showWorkflowEditor(modelId);
                    };
                    $scope.setMainVersionAct = function(defineId,versionId){
                        WorkflowService.setMainVersionAct(defineId,versionId).then(function(){
                            toaster.pop('success', '操作提醒', '设置主版本成功');
                            $scope.workflowVersions = WorkflowService.queryVersionListByDefineId(defineId).$object;
                        })
                    };
                    $scope.configWorkflow = function(workflowVersionId)
                    {
                        modalInstance.dismiss('cancel');
                        $state.go('app.workflow.config',{id:workflowVersionId});
                    }
                },
                size:'lg'
            });
        };
        $scope.configWorkflow = function(workflowVersionId) {
            $state.go('app.workflow.config',{id:workflowVersionId});
        };
        $scope.queryProcessUserTaskNodes = function(){
            $scope.userTaskFormItems = WorkflowService.queryProcessUserTaskNodes($state.params.id).$object;
        }
    })
;