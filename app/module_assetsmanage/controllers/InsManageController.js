'use strict';

/* Controllers */
angular.module("pu.assetsmanage.controllers")
    .controller('InsManageController',function ($scope, $rootScope, $state,$stateParams, toaster,modal, $uibModal,InsManageService,LoanQueryService,SysDictService,SysAreaService) {
        $scope.initInsuranceContinue = function(){
            $scope.procInstId = $stateParams.procInstId;
            $scope.taskId = $stateParams.taskId;
            $scope.businessKey = $stateParams.businessKey;
            $scope.appId = $stateParams.appId;
            $scope.workflowKey = $stateParams.workflowKey;
            //$scope.doInitApplyEdit($stateParams.appId);
            $scope.task = LoanQueryService.getTaskByTaskId($stateParams.taskId,$stateParams.workflowKey).$object;
            $scope.baseInfoVo = LoanQueryService.getLoanCustApplyInfo($scope.appId).$object;
            $scope.insHisList = InsManageService.getInsuranceHisList($scope.appId).$object;
        };
        $scope.addBusinessInsurance = function(item){
            InsManageService.addBusinessInsurance($scope.appId,item.signId,"bxlx02").then(function(response){
                toaster.pop('success', '操作提醒', '新增保险信息成功 ');
                $scope.insHisList = InsManageService.getInsuranceHisList($scope.appId).$object;
            })
        };
        $scope.commitInsuranceContinue = function(){
            InsManageService.commitInsuranceContinue($scope.taskId).then(function(response){
                toaster.pop('success', '操作提醒', '提交任务成功 ');
                $state.go('app.loantask.todolist');
            })
        };
        $scope.initInsuranceClaims = function(){
            $scope.appId = $stateParams.appId;
            $scope.insuranceId = $stateParams.insuranceId;
            $scope.insuranceType = $stateParams.insuranceType;
            $scope.insuranceInfo = InsManageService.getInsuranceHisById($scope.insuranceId).$object;
            //可选省份
            $scope.provinceList = SysAreaService.queryProvinceList().$object;
            $scope.claimsVo = {};
            $scope.$watchGroup(['claimsVo.carCertainAmt','claimsVo.peopleCertainAmt','claimsVo.otherCarCertainAmt','claimsVo.otherPeopleCertainAmt','claimsVo.otherObjectCertainAmt'],function(newVal,oldVal){
                var carCertainAmt = $scope.claimsVo.carCertainAmt == undefined ? 0:$scope.claimsVo.carCertainAmt;
                var peopleCertainAmt = $scope.claimsVo.peopleCertainAmt == undefined ? 0:$scope.claimsVo.peopleCertainAmt;
                var otherCarCertainAmt = $scope.claimsVo.otherCarCertainAmt == undefined ? 0:$scope.claimsVo.otherCarCertainAmt;
                var otherPeopleCertainAmt = $scope.claimsVo.otherPeopleCertainAmt == undefined ? 0:$scope.claimsVo.otherPeopleCertainAmt;
                var otherObjectCertainAmt = $scope.claimsVo.otherObjectCertainAmt == undefined ? 0:$scope.claimsVo.otherObjectCertainAmt;
                $scope.claimsVo.totalCertainAmt = carCertainAmt + peopleCertainAmt +otherCarCertainAmt + otherPeopleCertainAmt + otherObjectCertainAmt;
            })
        };
        $scope.saveInsuranceClaims = function(){
            modal.confirm("操作提醒","确认提交").then(function(){
                InsManageService.addInsuranceClaims($scope.appId,$scope.insuranceId,$scope.claimsVo).then(function(response){
                    toaster.pop('success', '操作提醒', '保存理赔信息成功 ');
                    $scope.claimsVo = response;
                })
            })
        }
        $scope.addressCtrl = {
            //承租人现详细地址省
            onTenantProvinceChange : function(){
                $scope.claimsVo.acciAddrCity="";
                $scope.tenantCityList = SysAreaService.queryCityList($scope.claimsVo.acciAddrProvince).$object;
                $scope.claimsVo.acciAddrCounty="";
            },
            //承租人现详细地址市
            onTenantCityChange:function(){
                $scope.claimsVo.acciAddrCounty="";
                $scope.tenantCountyList = SysAreaService.queryCountyList($scope.claimsVo.acciAddrProvince,$scope.claimsVo.acciAddrCity).$object;
            }
        }

    })
;