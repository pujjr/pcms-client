'use strict';

/* Controllers */
// signin controllers
angular.module("pu.task.controllers")
    .controller('LoanCheckController',function ($scope, $rootScope, $state,$stateParams, toaster, $uibModal,TaskService,GpsService,
                                                BankService,SysAreaService,InsuranceService,modal,QueryService) {
        $scope.taskId = $stateParams.taskId;
        $scope.businessKey = $stateParams.businessKey;
        $scope.initLoanCheck = function(){
            $scope.doInitApplyEdit($stateParams.businessKey);
            $scope.task = TaskService.queryTaskByTaskId($stateParams.taskId).$object;
            $scope.gpsSupplierList = GpsService.queryGpsSupplierList(true).$object;
            $scope.provinceList = SysAreaService.queryProvinceList().$object;
            $scope.insuranceCompanyList = InsuranceService.queryInsuranceCompanyList(true).$object;
            $scope.unionPayBankList = BankService.queryUnionPayBankInfoList().$object;
            TaskService.querySignInfo($stateParams.businessKey).then(function(response){
                $scope.signContractVo = response;
                if($scope.signContractVo.loanCheck ==null){
                    $scope.signContractVo.loanCheck={};
                    $scope.signContractVo.loanCheck.otherCheckResult = "1";
                    $scope.signContractVo.loanCheck.gpsCheckResult = "1";
                    $scope.signContractVo.loanCheck.photoCheckResult = "1";
                    $scope.signContractVo.loanCheck.loanAddCheckResult = "1";
                    $scope.signContractVo.loanCheck.trustCheckResult = "1";
                    $scope.signContractVo.loanCheck.tenantCheckResult = "1";
                    $scope.signContractVo.loanCheck.pledgeContractCheckResult = "1";
                    $scope.signContractVo.loanCheck.leasingContractCheckResult = "1";
                    $scope.signContractVo.loanCheck.pledgeCheckResult = "1";
                    $scope.signContractVo.loanCheck.insuranceCheckResult = "1";
                    $scope.signContractVo.loanCheck.invoiceCheckResult = "1";
                    $scope.signContractVo.loanCheck.repayCardCheckResult = "1";
                    $scope.signContractVo.loanCheck.idnoCheckResult = "1";
                    $scope.signContractVo.loanCheck.applyFormCheckResult = "1";
                }
            });
            $scope.conditionLoanCommentList = QueryService.queryApplyConditionLoanCommentList($stateParams.businessKey).$object;
            $scope.queryFraudHisInnerResult($stateParams.businessKey,"jxsqy");
        };
        $scope.saveLoanCheckInfo = function(){
            $scope.loading = TaskService.saveLoanCheckInfo($scope.signContractVo).then(function(response){
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
                    $scope.loading = TaskService.commitLoanCheckTask($scope.signContractVo,commitType,$stateParams.taskId).then(function(response){
                        $state.go('app.task.todolist');
                        toaster.pop('success', '操作提醒','提交补充放款资料任务成功')
                    })
                })
            }else{
                modal.confirm("操作提醒","确认提交任务？").then(function(){
                    $scope.loading = TaskService.commitLoanCheckTask($scope.signContractVo,commitType,$stateParams.taskId).then(function(response){
                        $state.go('app.task.todolist');
                        toaster.pop('success', '操作提醒','提交放款复核任务成功')
                    })
                })
            }

        };


    })
;