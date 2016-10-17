'use strict';

/* Controllers */
// signin controllers
angular.module("pu.gps.controllers")
    .controller('GpsController',function ($scope, $rootScope, $state, toaster, $uibModal,GpsService) {
        $scope.gpslvlManage = function(){
            $state.go('app.gps.gpslvl');
        };
        $scope.gpsSupplierManage = function(){
            $state.go('app.gps.gpssupplier');
        };
        $scope.gpsRuleManage = function(){
            $state.go('app.gps.gpsrule');
        }
    })
;