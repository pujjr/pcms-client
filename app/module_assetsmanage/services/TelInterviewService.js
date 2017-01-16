angular.module('pu.assetsmanage.services')
    .service("TelInterviewService",function($window,RestApi,$uibModal,toaster){
        this.addTelInterviewResult = function(appId,params){
            return RestApi.all("/telinterview/addTelInterviewResult").all(appId).post(params);
        };
        this.createTelInterviewTask = function(appId){
            return RestApi.all("/telinterview/createTelInterviewTask").all(appId).post();
        };
        this.getTelInterviewHisList = function(appId){
            return RestApi.all("/telinterview/getTelInterviewHisList").all(appId).getList();
        };
        this.commmitTelInterviewTask = function(taskId){
            return RestApi.all("/telinterview/commmitTelInterviewTask").all(taskId).post();
        };
        this.addTelIncomeLog = function(appId,params){
            return RestApi.all("/telinterview/addTelIncomeLog").all(appId).post(params);
        };
        this.getTelIncomeLogList = function(appId){
            return RestApi.all("/telinterview/getTelIncomeLogList").all(appId).getList();
        };
        this.modifyTelIncomeLogInfo = function(item){
            return RestApi.all("/telinterview/modifyTelIncomeLogInfo").all(item.id).post(item);
        }
        this.showTelInterviewDetail = function(item){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop: 'static',
                size: 'lg',
                templateUrl: 'module_assetsmanage/tpl/dialog-tel-interview-edit.html',
                controller: function ($scope, RestApi,modal) {
                    $scope.vo = item;
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
        };
        this.addTelIncomeInfo = function(appId){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop: false,
                size: 'lg',
                templateUrl: 'module_assetsmanage/tpl/dialog-tel-income-add.html',
                controller: function ($scope, RestApi, SysDictService,modal,TelInterviewService) {
                    $scope.appId = appId;
                    $scope.item = {};
                    $scope.incomeTypeList = SysDictService.queryDictDataByTypeCode("ldsylx").$object;
                    $scope.processStatusList = SysDictService.queryDictDataByTypeCode("ldclzt").$object;
                    $scope.ok = function () {
                        modal.confirm("操作提醒", "确认保存？").then(function () {
                            TelInterviewService.addTelIncomeLog($scope.appId,$scope.item).then(function () {
                                modalInstance.close();
                            })
                        })
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            return modalInstance.result;
        };
        this.processTelIncomeInfo = function(item){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop: 'static',
                size: 'lg',
                templateUrl: 'module_assetsmanage/tpl/dialog-tel-income-edit.html',
                controller: function ($scope, RestApi, SysDictService,modal,TelInterviewService) {
                    $scope.item = item;
                    $scope.incomeTypeList = SysDictService.queryDictDataByTypeCode("ldsylx").$object;
                    $scope.processStatusList = SysDictService.queryDictDataByTypeCode("ldclzt").$object;
                    $scope.ok = function () {
                        modal.confirm("操作提醒", "确认保存？").then(function () {
                            TelInterviewService.modifyTelIncomeLogInfo($scope.item).then(function () {
                                modalInstance.close();
                            })
                        })
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            return modalInstance.result;
        };
        this.getLoggedTelIncomeCustInfo = function(){
            return RestApi.all("/telinterview/getLoggedTelIncomeCustInfo").getList();
        }
    });
