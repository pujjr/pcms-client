'use strict';

/* ∂Ã–≈π‹¿ÌControllers */
angular.module("pu.sms.controllers")
    .controller('SmsController',function ($scope, $rootScope, $state, toaster, $uibModal,SmsService) {
        $scope.templateManage = function(){
            $state.go('app.sms.template');
        };
        $scope.historyManage = function(){
            $state.go('app.sms.history');
        };
    })
;