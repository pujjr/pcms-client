angular.module('pu.contract.services')
    .service("ContractService",function($window,RestApi){
        this.queryContractInfoList = function(){
            return RestApi.all("/contract/contractinfo").getList();
        };
        this.addContractInfo = function(item){
            return RestApi.all("/contract/contractinfo").post(item);
        };
        this.modifyContractInfo = function(contractId,item){
            return RestApi.one("/contract/contractinfo",contractId).customPUT(item);
        };
        this.deleteContractInfoById = function(contractId){
            return RestApi.one("/contract/contractinfo",contractId).remove();
        };
        this.queryContractTemplateList = function(){
            return RestApi.all("/contract/contracttemplate").getList();
        };
        this.addContractTemplate = function(item){
            return RestApi.all("/contract/contracttemplate").post(item);
        };
        this.modifyContractTemplate = function(templateId,item){
            return RestApi.one("/contract/contracttemplate",templateId).customPUT(item);
        };
        this.deleteContractTemplateById = function(templateId){
            return RestApi.one("/contract/contracttemplate",templateId).remove();
        };
        this.queryContractInfoListByContractTemplateId =function(templateId,enabled){
            return RestApi.all("/contract/getContractInfoListByContractTemplateId").all(templateId).getList({'enabled':enabled});
        };
        this.saveContractTemplateRefContractList = function(templateId,records){
            return RestApi.all("/contract/saveContractTemplateRefContractList").all(templateId).post(records);
        }

    });
