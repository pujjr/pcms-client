angular.module('pu.car.services')
    .service("CarService",function($window,RestApi,$uibModal,ToolsService){
        this.queryCarBrandList = function(){
            return RestApi.all("/car/brand").getList();
        };
        this.queryCarBrandPageList = function(queryParams){
            return RestApi.all("/car/brand/pagelist").getList(queryParams);
        }
        this.addCarBrand = function(item){
            return RestApi.all("/car/brand").post(item);
        };
        this.modifyCarBrand = function(item){
            return RestApi.one("/car/brand",item.id).customPUT(item);
        };
        this.deleteCarBrand = function(id){
            return RestApi.one("/car/brand",id).remove();
        };
        this.addCarSerial = function(item){
            return RestApi.all("/car/serial").post(item);
        };
        this.modifyCarSerial = function(item){
            return RestApi.one("/car/serial",item.id).customPUT(item);
        };
        this.deleteCarSerial = function(id){
            return RestApi.one("/car/serial",id).remove();
        };
        this.addCarStyle = function(item){
            return RestApi.all("/car/style").post(item);
        };
        this.modifyCarStyle = function(item){
            return RestApi.one("/car/style",item.id).customPUT(item);
        };
        this.deleteCarStyle = function(id){
            return RestApi.one("/car/style",id).remove();
        }

        this.queryCarSerialList = function(carBrandId){
            return RestApi.one("/car/brand",carBrandId).all("/serial").getList();
        };
        this.queryCarSerialPageList = function(){
            return RestApi.all("/car/serial/pagelist").getList();
        }
        this.queryCarStyleList = function(carSerialId){
            return RestApi.one('/car/serial',carSerialId).all("/style").getList();
        }
        this.queryCarStylePageList = function(){
            return RestApi.all("/car/style/pagelist").getList();
        }
        this.selectCar = function(appId){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop:'false',
                size:'lg',
                resolve:{
                    appId:function(){
                        return appId;
                    }
                },
                templateUrl :'module_car/tpl/dialog-select-car.html',
                controller:function($scope,RestApi,CarService,$timeout){
                    $scope.appId = appId;
                    $scope.init = function(){
                        $scope.carBrand ={};
                        $scope.carSerial = {};
                        $scope.carStyle = {};
                        $scope.carBrandList = CarService.queryCurrentApplyEnabledCarBrand($scope.appId).$object;
                    };
                    $scope.carBrandChanged = function(){
                        $scope.carSerialList = CarService.queryCurrentApplyEnabledCarSerial($scope.appId,$scope.carBrand.id).$object;
                    };
                    $scope.carSerialChanged = function(){
                       // $scope.carStyleList = CarService.queryCarStyleList($scope.carSerial.id).$object;
                        $scope.carStyleList = CarService.queryCarStylePageList({'carSerialId':$scope.carSerial.id}).$object;
                    };
                    var timeout;
                    $scope.$watch('indexStr',function(newVal,oldVal){
                        if(newVal!=oldVal && newVal !=undefined && newVal!= ''){
                            if (timeout) $timeout.cancel(timeout);
                            timeout=$timeout(function(){
                                if($scope.indexStr==''){
                                    $scope.carStyleList =[];
                                }else{
                                    $scope.carStyleList = CarService.queryCarStylePageList({'indexStr':$scope.indexStr,'appId':$scope.appId}).$object;
                                }
                            },1500);
                        }
                    })
                    $scope.selectCar = function(item){
                        var carObj = {};
                        angular.copy(item,carObj);
                        //carObj.carBrand = $scope.carBrand;
                        //carObj.carSerial = $scope.carSerial;
                        modalInstance.close(carObj);
                    }
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            return modalInstance.result;
        };
        this.queryCarTemplateList = function(){
            return RestApi.all("/car/template").getList();
        };
        this.addCarTemplate = function(item){
            return RestApi.all("/car/template").post(item);
        };
        this.modifyCarTemplate = function(item){
            return RestApi.one("/car/template",item.id).customPUT(item);
        };
        this.deleteCarTemplate = function(id){
            return RestApi.one("/car/template",id).remove();
        };
        this.getCarTreeList = function(){
            return RestApi.all("/car/getCarTreeList").getList();
        };
        this.getCarTemplateChoiceList = function(templateId){
            return RestApi.all("/car/getCarTemplateChoiceList").all(templateId).getList();
        };
        this.saveCarTemplateChoice = function(templateId,params){
            return RestApi.all("/car/saveCarTemplateChoice").all(templateId).post(params);
        };
        this.queryCurrentApplyEnabledCarBrand = function(appId){
            return RestApi.all("/car/getCurrentApplyEnabledCarBrand").all(appId).getList();
        };
        this.queryCurrentApplyEnabledCarSerial = function(appId,carBrandId){
            return RestApi.all("/car/getCurrentApplyEnabledCarSerial").all(appId).all(carBrandId).getList();
        }
    });
