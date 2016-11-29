angular.module('pu.assetsmanage.services')
    .service("CollectionService",function($window,RestApi){
        this.createPhoneCollectionTask = function(appId,applyComment){
            return RestApi.all("/collection/createPhoneCollectionTask").all(appId).all(applyComment).post();
        }
        this.applyNewCollectionTask = function(taskId,appId,taskType,params){
            return RestApi.all("/collection/applyNewCollectionTask").all(taskId).all(appId).all(taskType).post(params);
        };
        this.reassigneeTaskOperId = function(taskId,newOperId){
            return RestApi.all("/collection/reassigneeTaskOperId").all(taskId).all(newOperId).post();
        };
        this.getCollectionWorkgroupUserIdList = function(taskId){
            return RestApi.all("/collection/getCollectionWorkgroupUserIdList").all(taskId).getList();
        };
        this.commitApproveApplyNewCollectionTask = function(taskId,params){
            return RestApi.all("/collection/commitApproveApplyNewCollectionTask").all(taskId).post(params);
        };
        this.commitSettleLawsuitTask = function(taskId){
            return RestApi.all("/collection/commitSettleLawsuitTask").all(taskId).post();
        };
        this.getCollectionAppyInfo = function(businessKey){
            return RestApi.one("/collection/getCollectionAppyInfo",businessKey).get();
        };
        this.getCollectionLogInfo = function(appId,taskType){
            return RestApi.all("/collection/getCollectionLogInfo").all(appId).all(taskType).getList();
        };
        this.getImportanCollectionLogInfo = function(appId){
            return RestApi.all("/collection/getImportanCollectionLogInfo").all(appId).getList();
        };
        this.saveCollectionLog = function(taskId,params){
            return RestApi.all("/collection/saveCollectionLog").all(taskId).post(params);
        }
    });
