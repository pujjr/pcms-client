'use strict';

/* Controllers */
// signin controllers
angular.module("pu.task.controllers")
    .controller('ApproveController',function ($scope, $rootScope, $state,$stateParams, toaster, $uibModal,TaskService,SysDictService,modal) {
        $scope.taskId = $stateParams.taskId;
        $scope.businessKey = $stateParams.businessKey;
        $scope.appendToEl = angular.element(document.querySelector('#check-header'));
        $scope.initApprove = function(){
            $scope.doInitApplyEdit($stateParams.businessKey);
            $scope.task = TaskService.queryTaskByTaskId($stateParams.taskId).$object;
            $scope.approveList = SysDictService.queryDictDataByTypeCode("sprwjglx").$object;
            $scope.approveRejectReasonList =  SysDictService.queryDictDataByTypeCode("spjjyy").$object;
            $scope.approveCancelReasonList =  SysDictService.queryDictDataByTypeCode("spqxyy").$object;
            $scope.loanConditionList = SysDictService.queryDictDataByTypeCode("fktj").$object;
            $scope.checkList = SysDictService.queryDictDataByTypeCode("shrwjglx").$object;
            $scope.checkRejectReasonList = SysDictService.queryDictDataByTypeCode("shjjyy").$object;
            $scope.checkCancelReasonList = SysDictService.queryDictDataByTypeCode("shqxyy").$object;
            $scope.netCheckResultList = SysDictService.queryDictDataByTypeCode("wsjg").$object;
            $scope.telCheckResultList = SysDictService.queryDictDataByTypeCode("dsjg").$object;
            $scope.queryFraudInnerResult($stateParams.businessKey);
            $scope.queryFraudHisInnerResult($stateParams.businessKey,"zlsh");
            $scope.approveVo = {};
            TaskService.getLastestCheckVo($stateParams.taskId).then(function(response){
                if(response==null){
                    $scope.checkVo = {};
                }else{
                    $scope.checkVo = response;
                    if(response.result!=undefined ){
                        if(response.result=='tjlx102'|| response.result == 'tjlx202'){
                            $scope.approveVo.result = 'tjlx202';
                            $scope.approveVo.loanExtConditon = response.loanExtConditon;
                        }else if(response.result=='tjlx101'|| response.result == 'tjlx201'){
                            $scope.approveVo.result = 'tjlx201';
                        }else if(response.result=='tjlx103'|| response.result == 'tjlx203'){
                            $scope.approveVo.result = 'tjlx203';
                            $scope.approveVo.cancelReason = response.cancelReason;
                        }else{
                            $scope.approveVo.result = 'tjlx204';
                            $scope.approveVo.rejectReason = response.rejectReason;
                        }
                    };
                }
            })
        };
        $scope.commitApproveTask = function(){
            modal.confirm("操作提醒","确认提交申请？").then(function(){
                TaskService.commitApproveTask($scope.applyInfo,$scope.approveVo,$stateParams.taskId).then(function(response){
                    $state.go('app.task.todolist');
                    toaster.pop('success', '操作提醒','提交审批任务成功')
                })
            })
        };
        /**初始化审贷会审批 **/
        $scope.initCounterSignApprove = function(){
            $scope.doInitApplyEdit($stateParams.businessKey);
            $scope.task = TaskService.queryTaskByTaskId($stateParams.taskId).$object;
            $scope.approveList = SysDictService.queryDictDataByTypeCode("sdhjg").$object;
            $scope.queryFraudInnerResult($stateParams.businessKey);
            $scope.approveVo = {};
        };
        $scope.commitCounterSignApprove = function(){
            modal.confirm("操作提醒","确认提交申请?").then(function(){
                TaskService.commitCounterSignApprove($scope.taskId,$scope.approveVo).then(function(){
                    $state.go('app.task.todolist');
                    toaster.pop('success', '操作提醒','提交审批任务成功')
                })
            })
        }

    })
;