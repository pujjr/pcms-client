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
        this.queryCarSerialPageList = function(queryParams){
            return RestApi.all("/car/serial/pagelist").getList(queryParams);
        }
        this.queryCarStyleList = function(carSerialId){
            return RestApi.one('/car/serial',carSerialId).all("/style").getList();
        }
        this.queryCarStylePageList = function(queryParams){
            return RestApi.all("/car/style/pagelist").getList(queryParams);
        }
        this.selectCar = function(){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop:'false',
                size:'lg',
                templateUrl :'module_car/tpl/dialog-select-car.html',
                controller:function($scope,RestApi,CarService,$timeout){
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
                       // $scope.carStyleList = CarService.queryCarStyleList($scope.carSerial.id).$object;
                        $scope.carStyleList = CarService.queryCarStylePageList({'carSerialId':$scope.carSerial.id}).$object;
                    };
                    var timeout;
                    $scope.$watch('indexStr',function(newVal,oldVal){
                        if(newVal!=oldVal && newVal !=undefined && newVal!= ''){
                            if (timeout) $timeout.cancel(timeout);
                            timeout=$timeout(function(){
                                $scope.carStyleList = CarService.queryCarStylePageList({'indexStr':$scope.indexStr}).$object;
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
        }
    });
