'use strict';

/* Controllers */
angular.module("pu.assetsmanage.controllers")
    .controller('InsManageController',function ($scope, $rootScope, $state,$stateParams, toaster,modal, $uibModal,InsManageService,LoanQueryService,SysDictService) {
        $scope.initInsuranceContinue = function(){
            $scope.appId= $stateParams.appId;
            $scope.insHisList = InsManageService.getInsuranceHisList($scope.appId).$object;
        }
    })
;