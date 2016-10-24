'use strict';

/* Controllers */
// signin controllers
angular.module("pu.task.controllers")
    .controller('CallBackController',function ($scope, $rootScope, $state,$stateParams, toaster, $uibModal,TaskService,GpsService,
                                                BankService,SysAreaService,InsuranceService,modal) {
        $scope.taskId = $stateParams.taskId;
        $scope.businessKey = $stateParams.businessKey;
        $scope.initCallBack = function(){
            $scope.doInitApplyEdit($stateParams.businessKey);
            $scope.task = TaskService.queryTaskByTaskId($stateParams.taskId).$object;
            $scope.gpsSupplierList = GpsService.queryGpsSupplierList(true).$object;
            $scope.provinceList = SysAreaService.queryProvinceList().$object;
            $scope.insuranceCompanyList = InsuranceService.queryInsuranceCompanyList(true).$object;
            $scope.signContractVo = TaskService.querySignInfo($stateParams.businessKey).$object;
            $scope.callBackVo = {};
        };
        $scope.commitCallBackTask = function(commitType){
            TaskService.commitCallBackTask($scope.callBackVo,$stateParams.businessKey,$stateParams.taskId).then(function(){
                $state.go('app.task.todolist');
                toaster.pop('success', '操作提醒','提交批核签约回访任务成功');
            });
        };
    });