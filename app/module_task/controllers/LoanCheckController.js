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
            $scope.unionPayBankList = BankService.queryUnionPayBankInfoList().$object;
            $scope.signContractVo = TaskService.querySignInfo($stateParams.businessKey).$object;
            $scope.queryFraudHisInnerResult($stateParams.businessKey,"jxsqy");
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
                modal.confirm("操作提醒","确认提交任务？").then(function(){
                    TaskService.commitLoanCheckTask($scope.signContractVo,commitType,$stateParams.taskId).then(function(response){
                        $state.go('app.task.todolist');
                        toaster.pop('success', '操作提醒','提交放款复核任务成功')
                    })
                })
            }

        };
        $scope.openInsuranceUrl = function(index,type){
            var item = $scope.signContractVo.signFinanceList[index];;

            var url="";
            var key ="";
            if(type=="jqx"){
                key = item.signFinanceDetail.insCompanyId;
            }else if(type=='sybx'){
                key = item.signFinanceDetail.busiCompanyId;
            }else if(type=='lyx'){
                key = item.signFinanceDetail.impCompanyId;
            }
            for(var i = 0 ;i<$scope.insuranceCompanyList.length;i++){
                if(key == $scope.insuranceCompanyList[i].id){
                    url = $scope.insuranceCompanyList[i].url;
                    break;
                }
            }
            if(url=="")
                return;
            window.open(url);
        };
        $scope.openGpsUrl = function(index,type){
            var item = $scope.signContractVo.signFinanceList[index];
            var url="";
            var key =item.signFinanceDetail.gpsSupplierId;
            if(type=="yx"){
                for(var i = 0 ;i<$scope.gpsSupplierList.length;i++){
                    if(key == $scope.gpsSupplierList[i].id){
                        url = $scope.gpsSupplierList[i].wiredUrl;
                        break;
                    }
                }
            }else if(type=='wx'){
                for(var i = 0 ;i<$scope.gpsSupplierList.length;i++){
                    if(key == $scope.gpsSupplierList[i].id){
                        url = $scope.gpsSupplierList[i].wirelessUrl;
                        break;
                    }
                }
            }
            if(url=="")
                return;
            window.open(url);
        }
    })
;