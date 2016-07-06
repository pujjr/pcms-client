'use strict';

/* Controllers */
angular.module("pu.workflow.controllers")
    .controller("WorkflowController", function ($scope, RestApi, $state, $rootScope, modal, toaster) {

        $scope.initList = function () {
            $scope.items = RestApi.all("/workflow/getUserTasks").getList().$object;
        };
        $scope.doTask = function(item){
            var formKey = item.formKey;
            var businessKey = item.businessKey;
            var taskId = item.taskId;
            $state.go(formKey,{"taskId":taskId,"businessKey":businessKey});
        };
    })
;