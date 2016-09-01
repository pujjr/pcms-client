'use strict';

/* Controllers */
angular.module("pu.workflow.controllers")
    .controller("WorkflowController", function ($scope, RestApi, $state, $rootScope,$uibModal, modal, toaster,ToolsService,$window,WorkflowService) {
        $scope.init= function () {
            WorkflowService.queryWorkflowTypes().then(function(response){
                $scope.workflowTypes=ToolsService.convertArrayToTree(response, {
                    idKey: 'id',
                    parentKey: 'parentTypeId',
                    childrenKey: 'children'
                });
            });

        };
        $scope.$on("nodeClicked", function (event) {
            $scope.selType=event.targetScope.treeData;
            $scope.workflowDefines = WorkflowService.queryWorkflowDefines($scope.selType.id).$object;
        });
        $scope.createWorkflowDefine=function(){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_workflow/tpl/dialog-create-workflowdefine.html',
                controller:function($scope,RestApi){
                    $scope.workflowDefine={};
                    $scope.workflowTyps =  WorkflowService.queryWorkflowTypes().$object;
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
                    $scope.workflowDefines =  WorkflowService.queryWorkflowDefines($scope.selType.id).$object;
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
        };
        $scope.queryProcessAllNodes = function(){
            $scope.nodeItems = WorkflowService.queryProcessAllNodes($state.params.id).$object;
        };
        $scope.queryProcessGlobalParams = function(){
            $scope.globalParam = WorkflowService.queryProcessGlobalParams($state.params.id).$object;
        };
        $scope.saveWorkflowGlobalParam = function(){
            WorkflowService.saveWorkflowGlobalParam($state.params.id,$scope.globalParam).then(function(){
                toaster.pop('success', '操作提醒', '保存全局参数成功');
                $scope.queryProcessGlobalParams();
            })
        };
        $scope.saveWorkflowNodeForms = function(){
            WorkflowService.saveWorkflowNodeForms($state.params.id,$scope.userTaskFormItems).then(function(){
                toaster.pop('success', '操作提醒', '保存节点表单成功');
                $scope.queryProcessUserTaskNodes();
            })
        };
        $scope.configNodeParam = function(node){
            var templateHtml = "dialog-normalnode-param.html";
            if(node.nodeType == "userTask"){
                templateHtml = "dialog-usertasknode-param.html";
            }else if(node.nodeType.indexOf("Gateway")!=-1){
                templateHtml = "dialog-gatewaynode-param.html";
            }
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                resolve: {
                    node: function(){
                        return node;
                    }
                },
                templateUrl :'module_workflow/tpl/'+templateHtml,
                controller:function($scope,RestApi,WorkflowService){
                    $scope.node = node;
                    $scope.nodeParam = WorkflowService.queryWorkflowNodeParam(node.workflowVersionId,node.nodeId,node.nodeType).$object;
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                    $scope.save = function(){
                        WorkflowService.saveWorkflowNodeParam($scope.nodeParam.workflowVersionId,node.nodeType,$scope.nodeParam).then(function(){
                            modalInstance.close();
                        })
                    };
                },
                size:'lg'
            });
            modalInstance.result.then(function(){
                toaster.pop('success', '操作提醒', '设置节点参数成功');
                $scope.queryProcessAllNodes();
            })
        }
        $scope.startProcess = function(){
            RestApi.all("/workflow/startProcess/proctest1:1:242514").post().then(function(){
                toaster.pop('success', '操作提醒', '启动流程成功');
            })
        };
        $scope.getWorkflowImgUrl = function(){
            return "http://127.0.0.1:8080/gpsserver/service/workflow/config/img/"+$state.params.id;
        }
    })
;