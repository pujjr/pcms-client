angular.module('pu.workflow.services')
    .service("WorkflowService",function($window,RestApi){
        this.queryWorkflowTypes = function(){
            return RestApi.all("/workflowtype").getList();
        };
        this.addWorkflowType = function(item){
            return RestApi.all("/workflowtype").post(item);
        };
        this.modifyWorkflowType = function(item){
            return RestApi.one("/workflowtype",item.id).customPUT(item);
        }
        this.queryWorkflowDefines = function(workflowTypeId){
            return RestApi.all("/workflow/list").all(workflowTypeId).getList();
        };
        this.showWorkflowEditor=function(modelId){
            var token = window.localStorage.Authorization;
            $window.open(SERVER_URL.WORKFLOW_EDITOR_URL+modelId+"&token="+token);
        };
        this.getWorkflowImageUrl = function (id){
            return SERVER_URL.WORKFLOW_IMG_URL+id;
        }
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
        this.queryWorkflowNodeParam = function(workflowVersionId,nodeId,nodeType){
            if(nodeType.indexOf("Gateway")!=-1){
                return RestApi.one("/workflow/config/gatewayparam/"+workflowVersionId,nodeId).get();
            }else{
                return RestApi.one("/workflow/config/nodeparam/"+workflowVersionId,nodeId).get();
            }

        };
        this.saveWorkflowNodeParam = function(workflowVersionId,nodeType,params){
            if(nodeType.indexOf("Gateway")!=-1){
                return RestApi.all("/workflow/config/gatewayparam/").all(workflowVersionId).post(params);
            }else{
                return RestApi.all("/workflow/config/nodeparam/").all(workflowVersionId).post(params);
            }
        };
        this.queryWorkflowBaseInfo = function(workflowVersionId){
            return RestApi.one("/workflow/config/baseinfo/",workflowVersionId).get();
        };
        this.queryWorkflowNodeAssignee = function(workflowVersionId){
            return RestApi.all("/workflow/config/assignee").all(workflowVersionId).getList();
        };
        this.saveWorkflowNodeAssignee = function(workflowVersionId,params){
            return RestApi.all("/workflow/config/assignee").all(workflowVersionId).post(params);
        }
    });
