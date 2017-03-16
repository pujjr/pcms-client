'use strict';

/* Controllers */
// signin controllers
angular.module("pu.settle.controllers")
    .controller('SettleController',function ($scope, $rootScope, $state,$stateParams ,toaster, $uibModal,LoanQueryService,LoanTaskService,SettleService,SysDictService,modal) {
        $scope.initSettleHistoryTaskList = function(){
            $scope.settleApplyList = SettleService.getApplySettleTaskList("").$object;
        };
        $scope.initData = function(){
            $scope.procInstId = $stateParams.procInstId;
            $scope.taskId = $stateParams.taskId;
            $scope.businessKey = $stateParams.businessKey;
            $scope.appId = $stateParams.appId;
            $scope.workflowKey = $stateParams.workflowKey;
            $scope.task = LoanQueryService.getTaskByTaskId($stateParams.taskId,$stateParams.workflowKey).$object;
            $scope.baseInfoVo = LoanQueryService.getLoanCustApplyInfo($scope.appId).$object;
            $scope.applyVo = SettleService.getApplySettleInfo($scope.businessKey).$object
        }
        $scope.initApplyApprove = function(){
            $scope.initData();
        };
        $scope.commitApproveSettleTask = function(){
            LoanTaskService.inputApproveResult().then(function(response){
                SettleService.commitApproveSettleTask($scope.taskId,response).then(function(response){
                    toaster.pop('success', '操作提醒', "提交任务成功");
                    $state.go("app.loantask.todolist")
                })
            });
        } ;
        $scope.initApplyConfirm = function(){
            $scope.procInstId = $stateParams.procInstId;
            $scope.taskId = $stateParams.taskId;
            $scope.businessKey = $stateParams.businessKey;
            $scope.appId = $stateParams.appId;
            $scope.workflowKey = $stateParams.workflowKey;
            $scope.task = LoanQueryService.getTaskByTaskId($stateParams.taskId,$stateParams.workflowKey).$object;
            $scope.baseInfoVo = LoanQueryService.getLoanCustApplyInfo($scope.appId).$object;
            SettleService.getApplySettleInfo($scope.businessKey).then(function(response){
                $scope.applyVo = response;
                $scope.applyVo.remissionFeeItemVo={};
                $scope.applyVo.remissionFeeItemVo.remissionDate= (new Date()).getTime();
            })

        };
        $scope.hasNoRemission = function(){
            if($scope.task.actId=='cwqrrz'){
                return true;
            }
            var total = 0.00;
            if(!isNaN($scope.applyVo.remissionFeeItemVo.capital)&& $scope.applyVo.remissionFeeItemVo.capital!=undefined){
                total  += $scope.applyVo.remissionFeeItemVo.capital;
            }

            if(!isNaN($scope.applyVo.remissionFeeItemVo.interest)&&  $scope.applyVo.remissionFeeItemVo.interest!=undefined){
                total  += $scope.applyVo.remissionFeeItemVo.interest;
            }

            if(!isNaN($scope.applyVo.remissionFeeItemVo.overdueAmount)&& $scope.applyVo.remissionFeeItemVo.overdueAmount!=undefined){
                total  += $scope.applyVo.remissionFeeItemVo.overdueAmount;
            }
            if(!isNaN($scope.applyVo.remissionFeeItemVo.otherFee)&& $scope.applyVo.remissionFeeItemVo.otherFee!=undefined){
                total  += $scope.applyVo.remissionFeeItemVo.otherFee;
            }
            if(!isNaN($scope.applyVo.remissionFeeItemVo.otherOverdueAmount)&&  $scope.applyVo.remissionFeeItemVo.otherOverdueAmount!=undefined){
                total  += $scope.applyVo.remissionFeeItemVo.otherOverdueAmount;
            }
            if(!isNaN($scope.applyVo.remissionFeeItemVo.lateFee)&& $scope.applyVo.remissionFeeItemVo.lateFee!=undefined){
                total  += $scope.applyVo.remissionFeeItemVo.lateFee;
            }
            if(total>0){
                return false;
            }else{
                return true;
            }
        }
        $scope.commitApplyConfirmSettleTask = function(){
            modal.confirm("操作提醒","确认提交任务？").then(function(){
                SettleService.commitApplyConfirmSettleTask($scope.taskId,{'remissionVo':$scope.applyVo.remissionFeeItemVo,'settleRepayAmount':$scope.applyVo.settleRepayAmount}).then(function(response){
                    toaster.pop('success', '操作提醒', "提交任务成功");
                    $state.go("app.loantask.todolist")
                })
            })
        };
        $scope.initRemissionConfirm = function(){
            $scope.procInstId = $stateParams.procInstId;
            $scope.taskId = $stateParams.taskId;
            $scope.businessKey = $stateParams.businessKey;
            $scope.appId = $stateParams.appId;
            $scope.workflowKey = $stateParams.workflowKey;
            $scope.task = LoanQueryService.getTaskByTaskId($stateParams.taskId,$stateParams.workflowKey).$object;
            $scope.baseInfoVo = LoanQueryService.getLoanCustApplyInfo($scope.appId).$object;
            SettleService.getApplySettleInfo($scope.businessKey).then(function(response){
                $scope.applyVo = response;
                $scope.applyVo.settleRepayAmount=undefined;
            })
        };
        $scope.commitRemissionConfirmSettleTask = function(){
            modal.confirm("操作提醒","确认提交任务？").then(function(){
                SettleService.commitRemissionConfirmSettleTask($scope.taskId,{'settleRepayAmount':$scope.applyVo.settleRepayAmount}).then(function(response){
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
                SettleService.commitRemissionApprove($scope.taskId,response).then(function(response){
                    toaster.pop('success', '操作提醒', "提交任务成功");
                    $state.go("app.loantask.todolist")
                })
            })
        };
        $scope.initConfirm = function(){
            $scope.initData();
        };
        $scope.commitConfirmSettleTask = function(){
            LoanTaskService.inputApproveResult().then(function(response){
                $scope.loading = SettleService.commitConfirmSettleTask($scope.taskId,response).then(function(response){
                    toaster.pop('success', '操作提醒', "提交任务成功");
                    $state.go("app.loantask.todolist")
                })
            })
        };
        $scope.cancelSettleTask = function(){
            modal.prompt("取消结清任务","请输入取消备注").then(function(response){
                SettleService.cancelSettleTask($scope.taskId,response).then(function(){
                    toaster.pop('success', '操作提醒', "取消任务成功");
                    $state.go("app.loantask.todolist")
                })
            })
        };
        $scope.showSettleTaskDetail = function(item){
            SettleService.showSettleTaskDetail(item);
        }


    })
;