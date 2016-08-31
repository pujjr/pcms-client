angular.module('pu.workflow.services')
    .service("WorkflowService",function($window,RestApi){
        this.queryWorkflowTypes = function(){
            return RestApi.all("/workflowtype").getList();
        };
        this.queryWorkflowDefines = function(workflowTypeId){
            return RestApi.all("/workflow/list").all(workflowTypeId).getList();
        };
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
            return RestApi.all("/workflow/config/nodeforms/").all(workflowVersionId).getList();
        }
        this.queryProcessAllNodes = function(workflowVersionId){
            return RestApi.all("/workflow/config/nodes/").all(workflowVersionId).getList();
        }
        this.queryProcessGlobalParams = function(workflowVersionId){
            return RestApi.one("/workflow/config/globalparam",workflowVersionId).get();
        }
        this.saveWorkflowGlobalParam = function(workflowVersionId,params){
            return RestApi.all("/workflow/config/globalparam/").all(workflowVersionId).post(params);
        };
        this.saveWorkflowNodeForms = function(workflowVersionId,params){
            return RestApi.all("/workflow/config/nodeforms/").all(workflowVersionId).post(params);
        };
        this.queryWorkflowNodeParam = function(workflowVersionId,nodeId){
            return RestApi.one("/workflow/config/nodeparam/"+workflowVersionId,nodeId).get();
        }
        this.saveWorkflowNodeParam = function(workflowVersionId,params){
            return RestApi.all("/workflow/config/nodeparam/").all(workflowVersionId).post(params);
        }
    });
