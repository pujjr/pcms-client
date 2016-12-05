angular.module('pu.assetsmanage.services')
    .service("InsManageService",function($window,RestApi,$uibModal,toaster){
        this.getInsuranceHisList = function(appId){
            return RestApi.all("/insmanage/getInsuranceHisList").all(appId).getList();
        };
        this.createInsuranceContinueTask = function(appId){
            return RestApi.all("/insmanage/createInsuranceContinueTask").all(appId).post();
        };
        this.addInsurance = function(appId,signId,insType,params){
            return RestApi.all("/insmanage/addInsurance").all(appId).all(signId).all(insType).post(params);
        };
        this.commitInsuranceContinue = function(taskId){
            return RestApi.all("/insmanage/commitInsuranceContinue").all(taskId).post();
        }
        this.addBusinessInsurance = function(appId,signId,insType){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop: 'static',
                size: 'lg',
                templateUrl: 'module_assetsmanage/tpl/dialog-insurance-add.html',
                controller: function ($scope, RestApi, SysDictService,modal,InsManageService,InsuranceService) {
                    $scope.appId = appId;
                    $scope.signId = signId;
                    $scope.insType = insType;
                    //获取保险公司
                    $scope.insuranceCompanyList = InsuranceService.queryInsuranceCompanyList(true).$object;
                    $scope.applyVo = {};
                    $scope.ok = function () {
                        modal.confirm("操作提醒", "确认提交申请").then(function () {
                            InsManageService.addInsurance($scope.appId,$scope.signId,$scope.insType, $scope.applyVo).then(function () {
                                modalInstance.close();
                            })
                        })
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                    $scope.openInsuranceUrl = function(){
                        var key =$scope.applyVo.insCompanyId;
                        var url="";
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
                }
            });
            return modalInstance.result;
        }
    });
