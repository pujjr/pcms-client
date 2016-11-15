'use strict';

/* Controllers */
// signin controllers
angular.module("pu.task.controllers")
    .controller('SignController',function ($scope, $rootScope, $state,$stateParams, toaster, $uibModal,TaskService,GpsService,BankService,QueryService) {
        $scope.initSign = function(){
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
            console.log($scope.signContractVo);
            TaskService.commitSignContractTask($stateParams.businessKey,$stateParams.taskId).then(function(response){
                $state.go('app.task.todolist');
                toaster.pop('success', '操作提醒','提交签约任务成功')
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
        $scope.generateContract = function(contractKey){
            TaskService.getContractOSSKey($stateParams.businessKey,contractKey).then(function(response){
                $scope.pdfUrl = SERVER_URL.OSS_URL+response.osskey;
            })
        }
    })
;