'use strict';

/* Controllers */
angular.module("pu.assetsmanage.controllers")
    .controller('CollectionController',function ($scope, $rootScope, $state,$stateParams, toaster, $uibModal,CollectionService,LoanQueryService,SysDictService) {
        $scope.initCollectionData = function(){
            $scope.procInstId = $stateParams.procInstId;
            $scope.taskId = $stateParams.taskId;
            $scope.businessKey = $stateParams.businessKey;
            $scope.appId = $stateParams.appId;
            $scope.workflowKey = $stateParams.workflowKey;
            $scope.applyVo = {};
            $scope.doInitApplyEdit($stateParams.appId);
            $scope.task = LoanQueryService.getTaskByTaskId($stateParams.taskId,$stateParams.workflowKey).$object;
            $scope.baseInfoVo = LoanQueryService.getLoanCustApplyInfo($scope.appId).$object;
            $scope.collectionStatusList = SysDictService.queryDictDataByTypeCode("cszt").$object;
            $scope.overdueReasonList  =  SysDictService.queryDictDataByTypeCode("yqyy").$object;
            $scope.recoverStatusList = SysDictService.queryDictDataByTypeCode("sczt").$object;
            $scope.refundStatusList = SysDictService.queryDictDataByTypeCode("thzt").$object;
            $scope.disposeStatusList = SysDictService.queryDictDataByTypeCode("czzt").$object;
            $scope.lawsuitStatusList = SysDictService.queryDictDataByTypeCode("sszt").$object;
        };
        $scope.initPhoneCollection = function(){
            $scope.initCollectionData();
        };
        $scope.saveCollectionLog =function(){
            CollectionService.saveCollectionLog($scope.taskId,$scope.applyVo).then(function(response){
                toaster.pop('success', '操作提醒', '保存日志成功 ');
            })
        };
        $scope.getImportantCollectionLog = function(){
            $scope.importanCollectionLogList = CollectionService.getImportanCollectionLogInfo($scope.appId).$object;
        };
        $scope.getCollectionLog = function(taskType){
            $scope.collectionLogList = CollectionService.getCollectionLogInfo($scope.appId,taskType).$object;
        };
    })
;