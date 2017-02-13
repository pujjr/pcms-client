'use strict';

/* Controllers */
// signin controllers
angular.module("pu.task.controllers")
    .controller('SignController',function ($scope, $rootScope, $state,$stateParams, toaster, $uibModal,TaskService,GpsService,BankService,QueryService,modal,SettleService) {
        $scope.initSign = function(){
            $scope.taskId = $stateParams.taskId;
            $scope.doInitApplyEdit($stateParams.businessKey);
            $scope.task = TaskService.queryTaskByTaskId($stateParams.taskId).$object;
            $scope.gpsSupplierList = GpsService.queryGpsSupplierList(true).$object;
            $scope.unionPayBankList = BankService.queryUnionPayBankInfoList().$object;
            $scope.signContractVo = TaskService.querySignInfo($stateParams.businessKey).$object;
            $scope.conditionLoanCommentList = QueryService.queryApplyConditionLoanCommentList($stateParams.businessKey).$object;
        };
        $scope.saveSignContractInfo = function(){
            TaskService.saveSignContractInfo($scope.signContractVo).then(function(response){
                TaskService.querySignInfo($stateParams.businessKey).then(function(response){
                    $scope.signContractVo = response;
                    toaster.pop('success', '操作提醒','保存签约信息成功');
                });
            })
        }
        $scope.commitSignContractTask = function(){
            modal.confirm("操作提醒","确认提交签约？").then(function(response){
                TaskService.commitSignContractTask($stateParams.businessKey,$stateParams.taskId).then(function(response){
                    $state.go('app.task.todolist');
                    toaster.pop('success', '操作提醒','提交签约任务成功')
                })
            })
        };
        $scope.pdfStyle={
            "width":"80%",
            "position":"fixed",
            "height":$scope.screenHeight-170,
            "bottom":"0",
            "padding-right": "200px"
        };
        $scope.printContract = function(){
            $scope.contractList = TaskService.getContractInfoListByAppId($stateParams.businessKey).$object;
        };
        $scope.printSignCheck = function(){
            TaskService.printSignCheckPdf($stateParams.businessKey);
        }
        $scope.generateContract = function(contractKey){
            $scope.processGenContract = TaskService.getContractOSSKey($stateParams.businessKey,contractKey).then(function(response){
                $scope.pdfUrl = SERVER_URL.OSS_URL+response.osskey;
            })
        };
        $scope.commitLevel2SignTask = function(){
            modal.confirm("操作提醒","确认提交任务？").then(function(){
                TaskService.commitLevel2SignTask($scope.taskId).then(function(){
                    $state.go('app.task.todolist');
                    toaster.pop('success', '操作提醒','提交任务成功')
                })
            })
        }
    })
;