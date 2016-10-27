'use strict';

/* Controllers */
// signin controllers
angular.module("pu.query.controllers")
    .controller('QueryApplyController',function ($scope, $rootScope, $state, toaster, $uibModal,QueryService) {
        $scope.queryParam ={};
        $scope.init = function () {
            $scope.queryApplyList();
        };
        $scope.queryApplyList = function(){
            $scope.applyList= QueryService.queryApplyList($scope.queryParam).$object;
        };
    })
;