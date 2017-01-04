'use strict';

/* Controllers */
// signin controllers
angular.module("pu.apply.controllers")
    .controller('PrintApplyController1',function ($uibModalInstance, item) {
       $scope.appId = appId;
        console.log($scope);
        $scope.ok = function(){
            console.log($scope);
        }

    })
;