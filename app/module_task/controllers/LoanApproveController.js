'use strict';

/* Controllers */
// signin controllers
angular.module("pu.task.controllers")
    .controller('LoanApproveController',function ($scope, $rootScope, $state,$stateParams, toaster, $uibModal,TaskService,GpsService,modal,
                                                BankService,SysAreaService,InsuranceService,SysDictService) {
        $scope.taskId = $stateParams.taskId;
        $scope.businessKey = $stateParams.businessKey;
        $scope.initPrevLoanApprove = function(){
            $scope.doInitApplyEdit($stateParams.businessKey);
            $scope.task = TaskService.queryTaskByTaskId($stateParams.taskId).$object;
            $scope.gpsSupplierList = GpsService.queryGpsSupplierList(true).$object;
            $scope.provinceList = SysAreaService.queryProvinceList().$object;
            $scope.insuranceCompanyList = InsuranceService.queryInsuranceCompanyList(true).$object;
            $scope.signContractVo = TaskService.querySignInfo($stateParams.businessKey).$object;
        };
        $scope.initLoanApprove = function(){
            $scope.doInitApplyEdit($stateParams.businessKey);
            $scope.task = TaskService.queryTaskByTaskId($stateParams.taskId).$object;
            $scope.gpsSupplierList = GpsService.queryGpsSupplierList(true).$object;
            $scope.provinceList = SysAreaService.queryProvinceList().$object;
            $scope.insuranceCompanyList = InsuranceService.queryInsuranceCompanyList(true).$object;
            $scope.signContractVo = TaskService.querySignInfo($stateParams.businessKey).$object;
            $scope.loanApproveList = SysDictService.queryDictDataByTypeCode("fkspjglx").$object;
            $scope.loanApproveVo={};
        };
        $scope.commitPrevLoanApproveTask = function(){
            modal.confirm("操作提醒","确认提交任务？").then(function(){
                TaskService.commitPrevLoanApproveTask($stateParams.taskId).then(function(response){
                    $state.go('app.task.todolist');
                    toaster.pop('success', '操作提醒','提交放款初级审批任务成功')
                })
            })
        };
        $scope.commitLoanApproveTask = function(){
            modal.confirm("操作提醒","确认提交任务？").then(function(){
                TaskService.commitLoanApproveTask($scope.loanApproveVo,$stateParams.taskId).then(function(response){
                    $state.go('app.task.todolist');
                    toaster.pop('success', '操作提醒','提交放款审批任务成功')
                })
            })
        };
    })
;