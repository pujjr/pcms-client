'use strict';

/* Controllers */
// signin controllers
angular.module("pu.task.controllers")
    .controller('LoanCheckController',function ($scope, $rootScope, $state,$stateParams, toaster, $uibModal,TaskService,GpsService,
                                                BankService,SysAreaService,InsuranceService,modal) {
        $scope.taskId = $stateParams.taskId;
        $scope.businessKey = $stateParams.businessKey;
        $scope.initLoanCheck = function(){
            $scope.doInitApplyEdit($stateParams.businessKey);
            $scope.task = TaskService.queryTaskByTaskId($stateParams.taskId).$object;
            $scope.gpsSupplierList = GpsService.queryGpsSupplierList(true).$object;
            $scope.provinceList = SysAreaService.queryProvinceList().$object;
            $scope.insuranceCompanyList = InsuranceService.queryInsuranceCompanyList(true).$object;
            $scope.signContractVo = TaskService.querySignInfo($stateParams.businessKey).$object;
        };
        $scope.saveLoanCheckInfo = function(){
            TaskService.saveLoanCheckInfo($scope.signContractVo).then(function(response){
                toaster.pop('success', '操作提醒','保存放款复核信息成功')
            })
        }
        $scope.saveSignContractInfo = function(){
            TaskService.saveSignContractInfo($scope.signContractVo).then(function(response){
                toaster.pop('success', '操作提醒','保存签约信息成功');
            })
        }
        $scope.commitLoanCheckTask = function(commitType){
            if(commitType=='bcfkzl'){
                modal.prompt("备注","请输入放款补充资料备注").then(function(response){
                    $scope.signContractVo.supplyLoanInfoComment=response
                    TaskService.commitLoanCheckTask($scope.signContractVo,commitType,$stateParams.taskId).then(function(response){
                        $state.go('app.task.todolist');
                        toaster.pop('success', '操作提醒','提交补充放款资料任务成功')
                    })
                })
            }else{
                TaskService.commitLoanCheckTask($scope.signContractVo,commitType,$stateParams.taskId).then(function(response){
                    $state.go('app.task.todolist');
                    toaster.pop('success', '操作提醒','提交放款复核任务成功')
                })
            }

        };
    })
;