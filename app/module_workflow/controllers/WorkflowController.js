'use strict';

/* Controllers */
angular.module("pu.workflow.controllers")
    .controller("WorkflowController", function ($scope, RestApi, $state, $rootScope, modal, toaster) {

        $scope.initList = function () {
            $scope.items = CarCreditRestangular.all("/workflow/getUserTasks").getList().$object;
        };
    })
;