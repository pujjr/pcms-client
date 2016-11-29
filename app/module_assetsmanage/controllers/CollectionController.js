'use strict';

/* Controllers */
angular.module("pu.assetsmanage.controllers")
    .controller('CollectionController',function ($scope, $rootScope, $state,$stateParams, toaster, $uibModal,CollectionService,LoanQueryService) {
        $scope.initCollectionData = function(){
            $scope.procInstId = $stateParams.procInstId;
            $scope.taskId = $stateParams.taskId;
            $scope.businessKey = $stateParams.businessKey;
            $scope.appId = $stateParams.appId;
            $scope.workflowKey = $stateParams.workflowKey;
            $scope.task = LoanQueryService.getTaskByTaskId($stateParams.taskId,$stateParams.workflowKey).$object;
            $scope.baseInfoVo = LoanQueryService.getLoanCustApplyInfo($scope.appId).$object;
        }
    })
;