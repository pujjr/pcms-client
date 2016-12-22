'use strict';

/* Controllers */
// signin controllers
angular.module("pu.sms.controllers")
    .controller('SmsHistoryController',function ($scope, $rootScope, $state, toaster, $uibModal,SmsService,modal) {
        $scope.init = function () {
            $scope.getSmsHistoryList();
        };
        $scope.getSmsHistoryList = function(){
            $scope.historyList= SmsService.getSmsHistoryList().$object;
        };
        $scope.resend = function(item){
            modal.confirm("操作提醒","确定重发？").then(function(response){
                SmsService.resend(item.id).then(function(){
                    toaster.pop('success', '操作提醒', "发送短信成功");
                    $scope.getSmsHistoryList();
                })
            })
        }
    })
;