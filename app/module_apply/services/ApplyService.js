angular.module('pu.apply.services')
    .service("ApplyService",function($window,RestApi,$uibModal,ToolsService){
        this.saveApplyInfo = function(item){
            return RestApi.all("/apply").post(item);
        };
        this.queryApplyInfoByAppId  = function(appId){
            return RestApi.one("/apply",appId).get();
        };
        this.queryUnCommitApplyInfoList = function(){
            return RestApi.all("/apply/unCommit/list").getList();
        }
        this.commitApplyInfo = function(item){
            return RestApi.all("/apply/commit").post(item);
        }
        this.commitApplyTask = function(item){
            return RestApi.all("/apply/commitApplyTask").post(item);
        }
    });
