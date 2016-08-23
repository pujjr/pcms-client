'use strict';

/* Controllers */
angular.module("pu.workflow.controllers")
    .controller("WorkflowController", function ($scope, RestApi, $state, $rootScope, modal, toaster,ToolsService,LxDialogService,$window) {
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
        $scope.showCreateWorkflowDefineDlg=function(){
            $scope.workflowDefine={};
            RestApi.all("/workflowtype").getList().then(function(response){
                $scope.workflowTypesSels=response;
            })
            LxDialogService.open("dlgCreateWorkflowDefine");
        };
        $scope.createWorkflowDefine = function(){
            RestApi.all("/workflow/create").post($scope.workflowDefine).then(function(response){
                toaster.pop('success', '操作提醒', '增加流程成功');
                $scope.workflowDefines = RestApi.all("/workflow/list").getList({"workflow_type_id":$scope.workflowDefine.workflowTypeId}).$object;
            })
        };
        $scope.editWorkflow = function(modelId){
            $window.open("http://127.0.0.1:8080/gpsserver/modeler.html?modelId="+modelId);
        };
        $scope.showVersions = function(defineId){
            $scope.workflowVersions = RestApi.all("/workflowVersion/list").getList({"defineId":defineId}).$object;
            LxDialogService.open("dlgWorkflowVersions");
        };
        $scope.setVersionAct = function(defineId,versionId){
            RestApi.one("/workflow",defineId).one("/setActivateVersion",versionId).get().then(function(){
                toaster.pop('success', '操作提醒', '设置主版本成功');
                $scope.workflowVersions = RestApi.all("/workflowVersion/list").getList({"defineId":defineId}).$object;
            })
        }
    })
;