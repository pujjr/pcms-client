'use strict';

/* Controllers */
// signin controllers
angular.module("pu.task.controllers")
    .controller('CheckController',function ($scope, $rootScope, $state,$stateParams, toaster, $uibModal,TaskService,SysDictService,modal) {
        $scope.taskId = $stateParams.taskId;
        $scope.businessKey = $stateParams.businessKey;
        $scope.appendToEl = angular.element(document.querySelector('#check-header'));
        $scope.initCheck = function(){
            $scope.doInitApplyEdit($stateParams.businessKey);
            $scope.task = TaskService.queryTaskByTaskId($stateParams.taskId).$object;
            $scope.loanConditionList = SysDictService.queryDictDataByTypeCode("fktj").$object;
            $scope.checkList = SysDictService.queryDictDataByTypeCode("shrwjglx").$object;
            $scope.checkRejectReasonList = SysDictService.queryDictDataByTypeCode("shjjyy").$object;
            $scope.checkCancelReasonList = SysDictService.queryDictDataByTypeCode("shqxyy").$object;
            $scope.netCheckResultList = SysDictService.queryDictDataByTypeCode("wsjg").$object;
            $scope.netCheckNotPassReasonList =  SysDictService.queryDictDataByTypeCode("WSYC").$object;
            $scope.telCheckResultList = SysDictService.queryDictDataByTypeCode("dsjg").$object;
            $scope.telCheckNotPassReasonList =  SysDictService.queryDictDataByTypeCode("DSYC").$object;
            $scope.queryFraudInnerResult($stateParams.businessKey);
            $scope.queryFraudHisInnerResult($stateParams.businessKey,"lrsqd");
            //默认审核获取上一次审核结果显示
            TaskService.getLastestCheckVo($stateParams.taskId).then(function(response){
                if(response==null){
                    $scope.checkVo = {};
                }else{
                    $scope.checkVo = response;
                };
            })
        };
        //初始化初审
        $scope.initPreCheck = function(){
            $scope.doInitApplyEdit($stateParams.businessKey);
            $scope.task = TaskService.queryTaskByTaskId($stateParams.taskId).$object;
            $scope.loanConditionList = SysDictService.queryDictDataByTypeCode("fktj").$object;
            $scope.queryFraudInnerResult($stateParams.businessKey);
            $scope.queryFraudHisInnerResult($stateParams.businessKey,"lrsqd");
            $scope.checkVo = {};
            $scope.checkVo.isValidApply = true;
            $scope.checkVo.isValidIdcard = true;
            $scope.checkVo.isValidJsz = true;
            $scope.checkVo.isValidPhoto = true;
            $scope.checkVo.result = 'tjlx101';
            $scope.$watchGroup(['checkVo.isValidApply','checkVo.isValidIdcard','checkVo.isValidJsz','checkVo.isValidPhoto'],function(newVal,oldVal){
                if($scope.checkVo.isValidApply && $scope.checkVo.isValidIdcard && $scope.checkVo.isValidJsz  &&$scope.checkVo.isValidPhoto ){
                    $scope.enableQueryCredit = true;
                }else{
                    $scope.enableQueryCredit = false;
                }
            })
        }
        $scope.commitCheckTask = function(){
            modal.confirm("操作提醒","确认提交任务？").then(function(){
                $scope.saving = TaskService.commitCheckTask($scope.applyInfo,$scope.checkVo,$stateParams.taskId).then(function(response){
                    $state.go('app.task.todolist');
                    toaster.pop('success', '操作提醒','提交审核任务成功')
                })
            })
        };
        //保存申请信息和审核
        $scope.saveCheckTask = function(){
            modal.confirm("操作提醒","确认保存？").then(function(){
                $scope.saving = TaskService.saveCheckTask($scope.applyInfo,$scope.checkVo,$stateParams.taskId).then(function(response){
                    toaster.pop('success', '操作提醒','保存审核信息成功');
                    $scope.refreshApplyInfoFromServer(response.appId);
                });
            })
        };
        $scope.commitPreCheckTask = function(){
            modal.confirm("操作提醒","确认提交任务？").then(function(){
                TaskService.commitPreCheckTask($stateParams.taskId,$scope.businessKey,$scope.checkVo).then(function(response){
                    $state.go('app.task.todolist');
                    toaster.pop('success', '操作提醒','提交初审任务成功')
                })
            })
        };
        $scope.supplyCheckInfo = function(){
            modal.prompt("备注","请输入审核补充资料备注").then(function(response){
                var checkVo = {};
                //提交类型为审核补充资料
                checkVo.result = "shbczl"
                checkVo.comment = response;
                TaskService.commitCheckTask(null,checkVo,$stateParams.taskId).then(function(response){
                    $state.go('app.task.todolist');
                    toaster.pop('success', '操作提醒','提交补充审核资料任务成功')
                })
            })
        };
        //审核二级经销商申请
        $scope.initCheckLevel2Apply = function(){
            $scope.doInitApplyEdit($stateParams.businessKey);
            $scope.task = TaskService.queryTaskByTaskId($stateParams.taskId).$object;
        };
        //一级提交二级申请
        $scope.commitLevel2ApplyTask = function(){
            modal.confirm("操作提醒","确认提交任务").then(function(){
                TaskService.commitLevel2ApplyTask($stateParams.taskId).then(function(){
                    $state.go('app.task.todolist');
                    toaster.pop('success', '操作提醒','提交审批二级申请任务成功');
                })
            })
        }
    })
;