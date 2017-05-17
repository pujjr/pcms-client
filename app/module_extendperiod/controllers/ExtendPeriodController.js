'use strict';

/* Controllers */
// signin controllers
angular.module("pu.extendperiod.controllers")
    .controller('ExtendPeriodController',function ($scope, $rootScope, $state,$stateParams ,toaster, $uibModal,LoanQueryService,LoanTaskService,ExtendPeriodService,SysDictService,ProductService,modal) {
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
        };
        $scope.commitApproveExtendPeriodTask = function(){
            LoanTaskService.inputApproveResult().then(function(response){
                ExtendPeriodService.commitApproveExtendPeriodTask($scope.taskId,response).then(function(response){
                    toaster.pop('success', '操作提醒', "提交任务成功");
                    $state.go("app.loantask.todolist")
                })

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
            modal.confirm("操作提醒","确认提交任务？").then(function(response){
                ExtendPeriodService.commitApplyConfirmExtendPeriodTask($scope.taskId,$scope.applyVo.remissionFeeItemVo).then(function(response){
                    toaster.pop('success', '操作提醒', "提交任务成功");
                    $state.go("app.loantask.todolist")
                })
            })
        };
        $scope.initRemissionApprove = function(){
           $scope.initData();
        };
        $scope.commitRemissionApprove = function(){
            LoanTaskService.inputApproveResult().then(function(response){
                ExtendPeriodService.commitApproveRemissionTask($scope.taskId,response).then(function(response){
                    toaster.pop('success', '操作提醒', "提交任务成功");
                    $state.go("app.loantask.todolist")
                })
            })
        };
        $scope.initConfirm = function(){
            $scope.initData();
        };
        $scope.commitConfirmExtendPeriodTask = function(){
            LoanTaskService.inputApproveResult().then(function(response){
                ExtendPeriodService.commitConfirmExtendPeriodTask($scope.taskId,response).then(function(response){
                    toaster.pop('success', '操作提醒', "提交任务成功");
                    $state.go("app.loantask.todolist")
                })

            })
        };
        $scope.cancelExtendPeriodTask = function(){
            modal.prompt("取消展期任务","请输入取消备注").then(function(response){
                ExtendPeriodService.cancelExtendPeriodTask($scope.taskId,response).then(function(){
                    toaster.pop('success', '操作提醒', "取消任务成功");
                    $state.go("app.loantask.todolist")
                })
            })
        }
    })
;