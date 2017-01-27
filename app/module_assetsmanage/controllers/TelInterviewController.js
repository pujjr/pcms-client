'use strict';

/* Controllers */
angular.module("pu.assetsmanage.controllers")
    .controller('TelInterviewController',function ($scope, $rootScope, $state,$stateParams, toaster,modal, $uibModal,TelInterviewService,LoanQueryService,SysDictService,SysAreaService,QueryService) {
        $scope.initTelInterview = function(){
            $scope.procInstId = $stateParams.procInstId;
            $scope.taskId = $stateParams.taskId;
            $scope.businessKey = $stateParams.businessKey;
            $scope.appId = $stateParams.appId;
            $scope.workflowKey = $stateParams.workflowKey;
            $scope.doInitApplyEdit($stateParams.appId);
            $scope.task = LoanQueryService.getTaskByTaskId($stateParams.taskId,$stateParams.workflowKey).$object;
            $scope.baseInfoVo = LoanQueryService.getLoanCustApplyInfo($scope.appId).$object;
            $scope.telInterviewHisList = TelInterviewService.getTelInterviewHisList($scope.appId).$object;
            $scope.vo = {};
        };
        $scope.addTelInterviewResult = function(){
            TelInterviewService.addTelInterviewResult($scope.appId,$scope.vo).then(function(response){
                toaster.pop('success', '操作提醒', '保存电话回访记录成功 ');
                $scope.vo={};
                $scope.telInterviewHisList = TelInterviewService.getTelInterviewHisList($scope.appId).$object;
            })
        };
        $scope.showTelInterviewDetail = function(item){
            TelInterviewService.showTelInterviewDetail(item);
        };

        $scope.commmitTelInterviewTask = function(){
            TelInterviewService.commmitTelInterviewTask($scope.taskId).then(function(response){
                toaster.pop('success', '操作提醒', '提交任务成功 ');
                $state.go('app.loantask.todolist');
            })
        };
        $scope.initTelIncome = function(){
            $scope.appId = $stateParams.appId;
            $scope.telIncomeHisList = TelInterviewService.getTelIncomeLogList($scope.appId).$object;
        };
        $scope.addTelIncomeInfo = function(){
            TelInterviewService.addTelIncomeInfo($scope.appId).then(function(){
                toaster.pop('success', '操作提醒', '保存来电记录成功 ');
                $scope.telIncomeHisList = TelInterviewService.getTelIncomeLogList($scope.appId).$object;
            })
        };
        $scope.processTelIncomeInfo = function(item){
            TelInterviewService.processTelIncomeInfo(item).then(function(){
                toaster.pop('success', '操作提醒', '更新来电记录状态 ');
                $scope.telIncomeHisList = TelInterviewService.getTelIncomeLogList($scope.appId).$object;
            })
        };
        $scope.initTelIncomeList = function(){
            $scope.loggedTelIncomeList = TelInterviewService.getLoggedTelIncomeCustInfo().$object;
        };
        $scope.pageChangedTelIncomeList = function(){
            $scope.loggedTelIncomeList = TelInterviewService.getLoggedTelIncomeCustInfo().$object;
        };
        $scope.createTelIncome = function(){
            QueryService.selectApply().then(function(response){
                $state.go(
                    'app.telincome.add',
                    {
                        "appId":response
                    }
                )
            })
        }
    })
;