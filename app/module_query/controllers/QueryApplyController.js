'use strict';

/* Controllers */
// signin controllers
angular.module("pu.query.controllers")
    .controller('QueryApplyController',function ($scope, $rootScope, $state,$stateParams, toaster, $uibModal,QueryService,GpsService,SysAreaService,InsuranceService,TaskService,ProductService,SysDictService,BankService) {
        $scope.queryParam ={};
        $scope.init = function () {
            $scope.productList = ProductService.queryAllProductList().$object;
            $scope.appStatusList = SysDictService.queryDictDataByTypeCode("sqdzt").$object;
            $scope.queryApplyList();
        };
        $scope.queryApplyList = function(){
            $rootScope.resetPage();
            $scope.loading = QueryService.queryApplyList().then(function(response){
                $scope.applyList = response;
            });
        };
        $scope.pageChanged = function(){
            $scope.loading = QueryService.queryApplyList().then(function(response){
                $scope.applyList = response;
            });
        }
        $scope.initApplyDetail = function(){
            $scope.doInitApplyReadOnly($stateParams.appId);
            $scope.nodeMap = QueryService.queryApplyRunPathNodeMap($stateParams.appId).$object;
        };
        $scope.getSignInfo = function(){
            $scope.gpsSupplierList = GpsService.queryGpsSupplierList(true).$object;
            $scope.unionPayBankList = BankService.queryUnionPayBankInfoList().$object;
            $scope.provinceList = SysAreaService.queryProvinceList().$object;
            $scope.insuranceCompanyList = InsuranceService.queryInsuranceCompanyList(true).$object;
            $scope.signContractVo = TaskService.querySignInfo($stateParams.appId).$object;
        };
        $scope.getLoanCheckInfo = function(){
            $scope.gpsSupplierList = GpsService.queryGpsSupplierList(true).$object;
            $scope.provinceList = SysAreaService.queryProvinceList().$object;
            $scope.insuranceCompanyList = InsuranceService.queryInsuranceCompanyList(true).$object;
            $scope.signContractVo = TaskService.querySignInfo($stateParams.appId).$object;
        }
        $scope.getWorkflowProcessResultByAppId = function(appId){
            $scope.workflowProcessResultList = QueryService.getWorkflowProcessResultByAppId(appId).$object;
        }
        $scope.pdfStyle={
            "width":"80%",
            "position":"fixed",
            "height":$scope.screenHeight-170,
            "bottom":"0",
            "padding-right": "200px"
        };
        $scope.printContract = function(){
            $scope.contractList = TaskService.getContractInfoListByAppId($scope.applyInfo.appId).$object;
        };
        $scope.generateContract = function(contractKey){
            $scope.processGenContract = TaskService.getContractOSSKey($scope.applyInfo.appId,contractKey).then(function(response){
                $scope.pdfUrl = SERVER_URL.OSS_URL+response.osskey+"?v="+new Date();
            })
        };
        /**初始化重新申请文件目录**/
        $scope.initReApplyFileManage=function(appId){
            $scope.reApplyFileInterface.init(appId,"apply");
        };
        $scope.initReApplyFileComponent = function(fileInterface){
            $scope.reApplyFileInterface = fileInterface;
        };
        /**初始化审核文件目录**/
        $scope.initCheckFileManage=function(appId){
            $scope.checkFileInterface.init(appId,"check");
        };
        $scope.initCheckFileComponent = function(fileInterface){
            $scope.checkFileInterface = fileInterface;
        };
        /*初始化签约文件目录*/
        $scope.initSignFileManage=function(appId){
            $scope.signFileInterface.init(appId,"sign");
        };
        $scope.initSignFileComponent = function(fileInterface){
            $scope.signFileInterface = fileInterface;
        };
        /**初始化放款复核文件目录**/
        $scope.initLoanCheckFileManage=function(appId){
            $scope.loanCheckFileInterface.init(appId,"loancheck");
        };
        $scope.initLoanCheckFileComponent = function(fileInterface){
            $scope.loanCheckFileInterface = fileInterface;
        };
    })
;