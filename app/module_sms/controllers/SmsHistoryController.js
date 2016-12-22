'use strict';

/* Controllers */
// signin controllers
angular.module("pu.sms.controllers")
    .controller('SmsHistoryController',function ($scope, $rootScope, $state, toaster, $uibModal,SmsService) {
        $scope.init = function () {
            $scope.getSmsHistoryList();
        };
        $scope.getSmsHistoryList = function(){
            $scope.historyList= SmsService.getSmsHistoryList().$object;
        }
    })
;