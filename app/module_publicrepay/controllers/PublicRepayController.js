'use strict';

/* Controllers */
// signin controllers
angular.module("pu.publicrepay.controllers")
    .controller('PublicRepayController',function ($scope, $rootScope, $state,$stateParams ,toaster, $uibModal,LoanQueryService,PublicRepayService,SysDictService) {
        $scope.initPublicRepayHistoryTaskList = function(){
            $scope.publicRepayApplyList = PublicRepayService.getApplyPublicRepayTaskList().$object;
        };
        $scope.initApplyApprove = function(){
            $scope.procInstId = $stateParams.procInstId;
            $scope.taskId = $stateParams.taskId;
            $scope.businessKey = $stateParams.businessKey;
            $scope.appId = $stateParams.appId;
            $scope.workflowKey = $stateParams.workflowKey;
            $scope.task = LoanQueryService.getTaskByTaskId($stateParams.taskId,$stateParams.workflowKey).$object;
            PublicRepayService.getApplyPublicRepayInfo($scope.businessKey).then(function(response){
                 $scope.applyPublicRepayVo = response;
                $scope.applyPublicRepayVo.totalRepayAmount = $scope.applyPublicRepayVo.feeItem.repayCapital+
                    $scope.applyPublicRepayVo.feeItem.repayInterest+
                    $scope.applyPublicRepayVo.feeItem.repayOverdueAmount+
                    $scope.applyPublicRepayVo.feeItem.otherAmount+
                    $scope.applyPublicRepayVo.feeItem.otherOverdueAmount;
            });
            $scope.approveVo={};
            $scope.approveList = SysDictService.queryDictDataByTypeCode("fkspjglx").$object;
        };
        $scope.commitApprovePublicRepayTask = function(){
            PublicRepayService.commitApprovePublicRepayTask($scope.taskId,$scope.approveVo).then(function(response){
                toaster.pop('success', '操作提醒', "提交任务成功");
                $state.go("app.loantask.todolist")
            })
        }

    })
;