angular.module('pu.workflow.services')
    .service("WorkflowService",function($window,RestApi){
        this.showWorkflowEditor=function(modelId){
            $window.open("http://127.0.0.1:8080/gpsserver/modeler.html?modelId="+modelId);
        };
        this.setMainVersionAct = function(workflowDefineId,versionId){
            return RestApi.one("/workflow",workflowDefineId).one("/setActivateVersion",versionId).get();
        };
        this.queryVersionListByDefineId = function(workflowDefineId){
            return RestApi.all("/workflowVersion/list").getList({"defineId":workflowDefineId});
        };
        this.queryProcessUserTaskNodes = function(workflowVersionId){
            return RestApi.all("/workflow/config/"+workflowVersionId+"/nodeforms").getList();
        }
    });
