angular.module('pu.sms.services')
    .service("SmsService",function($window,RestApi,$uibModal,toaster){
        this.getSmsTemplateList = function(){
            return RestApi.all("/sms/template").getList();
        };
        this.addSmsTemplate = function(item){
            return RestApi.all("/sms/template").post(item);
        };
        this.modifySmsTemplate = function(item){
            return RestApi.one("/sms/template",item.id).customPUT(item);
        };
        this.getSmsHistoryList = function(){
            return RestApi.all("/sms/history").getList();
        };
        this.genPostLoanSms = function(tplKey,appId){
            return RestApi.all("/postloansms/genPostLoanSms").one(appId,tplKey).get();
        };
        this.sendMessage = function(appId,type,param){
            return RestApi.all("/sms/sendMessage").all(appId).all(type).post(param);
        };
        this.resend = function(hisId){
            return RestApi.all("/sms/resend").all(hisId).post();
        }
        this.sendSms = function(appId) {
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop: false,
                size: 'lg',
                templateUrl: 'module_sms/tpl/dialog-sendsms.html',
                controller: function ($scope, RestApi, ToolsService, modal,SmsService,toaster) {
                    $scope.appId = appId;
                    $scope.$watch("tplKey",function(newVal,oldVal){
                        if(newVal == undefined || newVal =="")
                            return;
                        $scope.messageVo = SmsService.genPostLoanSms($scope.tplKey,$scope.appId).$object;
                    });
                    $scope.ok = function () {
                        modal.confirm("操作提醒", "确认发送？").then(function () {
                            SmsService.sendMessage($scope.appId, $scope.tplKey,$scope.messageVo).then(function () {
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
                toaster.pop('success', '操作提醒', "发送短信成功");
            })
        };
    });
