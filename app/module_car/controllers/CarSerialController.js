'use strict';

/* Controllers */
// signin controllers
angular.module("pu.car.controllers")
    .controller('CarSerialController',function ($scope, $rootScope, $state, toaster, $uibModal,CarService,SysDictService,ToolsService) {
        $scope.queryParams={};

        $scope.init = function () {
            $scope.queryCarSerialList();
            $scope.carBrandList = CarService.queryCarBrandList().$object;
        };

        $scope.queryCarSerialList = function(){
            $scope.carSerialList = CarService.queryCarSerialPageList().$object;
        };
        $scope.pageChanged = function(){
            $scope.queryCarSerialList();
        }
        $scope.addCarSerial = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_car/tpl/dialog-carserial-add.html',
                controller:function($scope,RestApi,SysDictService){
                    $scope.item={};
                    $scope.carBrandList = CarService.queryCarBrandList({}).$object;
                    $scope.carTypeList = SysDictService.queryDictDataByTypeCode("cllx").$object;
                    $scope.ok=function(){
                        modalInstance.close($scope.item);
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                CarService.addCarSerial(response).then(function(){
                    toaster.pop('success', '操作提醒', '增加成功');
                    $scope.queryCarSerialList({});
                })
            })
        };
        $scope.editCarSerial = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                resolve: {
                    item: function(){
                        return item;
                    }
                },
                templateUrl :'module_car/tpl/dialog-carserial-edit.html',
                controller:function($scope,RestApi){
                    $scope.item=item;
                    $scope.carBrandList = CarService.queryCarBrandList({}).$object;
                    $scope.carTypeList = SysDictService.queryDictDataByTypeCode("cllx").$object;
                    $scope.ok=function(){
                        CarService.modifyCarSerial($scope.item).then(function(){
                            modalInstance.close('修改成功');
                        })
                    };
                    $scope.delete = function(){
                        CarService.deleteCarSerial(item.id).then(function(){
                            modalInstance.close('删除成功');
                        })
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                toaster.pop('success', '操作提醒',response );
                $scope.queryCarSerialList({});
            })
        };
    })
;