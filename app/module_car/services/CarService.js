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
        this.queryCarStyleList = function(carSerialId){
            return RestApi.one('/car/serial',carSerialId).all("/style").getList();
        }
        this.selectCar = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                size:'lg',
                templateUrl :'module_car/tpl/dialog-select-car.html',
                controller:function($scope,RestApi,CarService){
                    $scope.init = function(){
                        $scope.carBrand ={};
                        $scope.carSerial = {};
                        $scope.carStyle = {};
                        $scope.carBrandList = CarService.queryCarBrandList().$object;
                    };
                    $scope.carBrandChanged = function(){
                        $scope.carSerialList = CarService.queryCarSerialList($scope.carBrand.id).$object;
                    };
                    $scope.carSerialChanged = function(){
                        $scope.carStyleList = CarService.queryCarStyleList($scope.carSerial.id).$object;
                    }
                    $scope.selectCar = function(item){
                        var carObj = {};
                        angular.copy(item,carObj);
                        carObj.carBrand = $scope.carBrand;
                        carObj.carSerial = $scope.carSerial;
                        modalInstance.close(carObj);
                    }
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            return modalInstance.result;
        }
    });
