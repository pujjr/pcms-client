'use strict';

/* Controllers */
// signin controllers
angular.module("pu.extendperiod.controllers")
    .controller('ExtendPeriodController',function ($scope, $rootScope, $state,$stateParams ,toaster, $uibModal,LoanQueryService,ExtendPeriodService,SysDictService,ProductService) {
        $scope.initExtendPeriodHistoryTaskList = function(){
            $scope.taskList = ExtendPeriodService.getApplyExtendPeriodTaskList().$object;
        };
        $scope.showExtendPeriodTaskDetail = function(item){
            ExtendPeriodService.showExtendPeriodTaskDetail(item);
        };
        $scope.initData = function(){
            $scope.procInstId = $stateParams.procInstId;
            $scope.taskId = $stateParams.taskId;
            $scope.businessKey = $stateParams.businessKey;
            $scope.appId = $stateParams.appId;
            $scope.workflowKey = $stateParams.workflowKey;
            $scope.task = LoanQueryService.getTaskByTaskId($stateParams.taskId,$stateParams.workflowKey).$object;
            //获取还款方式
            $scope.repayModeList  = SysDictService.queryDictDataByTypeCode('hkfs').$object;
            //获取基本信息
            LoanQueryService.getLoanCustApplyInfo($scope.appId).then(function(response){
                $scope.baseInfoVo = response;
                //获取展期可选期数
                $scope.extendPeriods = ProductService.getProductExtendPeriodList(response.productCode,response.period).$object;
                ExtendPeriodService.getApplyExtendPeriodTaskById($scope.businessKey).then(function(response){
                    $scope.applyVo = response;
                    $scope.applyVo.newPeriod = parseInt($scope.baseInfoVo.period)+parseInt(response.extendPeriod);
                });
            });
        }
        $scope.initApplyApprove = function(){
            $scope.initData();
            $scope.approveVo={};
            $scope.approveList = SysDictService.queryDictDataByTypeCode("fkspjglx").$object;
        };
        $scope.commitApproveExtendPeriodTask = function(){
            ExtendPeriodService.commitApproveExtendPeriodTask($scope.taskId,$scope.approveVo).then(function(response){
                toaster.pop('success', '操作提醒', "提交任务成功");
                $state.go("app.loantask.todolist")
            })
        } ;
        $scope.initApplyConfirm = function(){
            $scope.procInstId = $stateParams.procInstId;
            $scope.taskId = $stateParams.taskId;
            $scope.businessKey = $stateParams.businessKey;
            $scope.appId = $stateParams.appId;
            $scope.workflowKey = $stateParams.workflowKey;
            $scope.task = LoanQueryService.getTaskByTaskId($stateParams.taskId,$stateParams.workflowKey).$object;
            //获取还款方式
            $scope.repayModeList  = SysDictService.queryDictDataByTypeCode('hkfs').$object;
            //获取基本信息
            LoanQueryService.getLoanCustApplyInfo($scope.appId).then(function(response){
                $scope.baseInfoVo = response;
                //获取展期可选期数
                $scope.extendPeriods = ProductService.getProductExtendPeriodList(response.productCode,response.period).$object;
                ExtendPeriodService.getApplyExtendPeriodTaskById($scope.businessKey).then(function(response){
                    $scope.applyVo = response;
                    $scope.applyVo.newPeriod = parseInt($scope.baseInfoVo.period)+parseInt(response.extendPeriod);
                    $scope.applyVo.remissionFeeItemVo={};
                    $scope.applyVo.remissionFeeItemVo.remissionDate = new Date();
                    $scope.applyVo.remissionFeeItemVo.lateFee = 0.00;
                });
            });

        };
        $scope.commitApplyConfirmExtendPeriodTask = function(){
            ExtendPeriodService.commitApplyConfirmExtendPeriodTask($scope.taskId,$scope.applyVo.remissionFeeItemVo).then(function(response){
                toaster.pop('success', '操作提醒', "提交任务成功");
                $state.go("app.loantask.todolist")
            })
        };
        $scope.initRemissionApprove = function(){
           $scope.initData();
            $scope.approveVo={};
            $scope.approveList = SysDictService.queryDictDataByTypeCode("fkspjglx").$object;
        };
        $scope.commitRemissionApprove = function(){
            ExtendPeriodService.commitApproveRemissionTask($scope.taskId,$scope.approveVo).then(function(response){
                toaster.pop('success', '操作提醒', "提交任务成功");
                $state.go("app.loantask.todolist")
            })
        };
        $scope.initConfirm = function(){
            $scope.initData();
        };
        $scope.commitConfirmExtendPeriodTask = function(){
            ExtendPeriodService.commitConfirmExtendPeriodTask($scope.taskId).then(function(response){
                toaster.pop('success', '操作提醒', "提交任务成功");
                $state.go("app.loantask.todolist")
            })
        };

    })
;