'use strict';

/* Controllers */
// signin controllers
angular.module("pu.car.controllers")
    .controller('CarStyleController',function ($scope, $rootScope, $state, toaster, $uibModal,CarService,SysDictService,ToolsService) {
        $scope.queryParams={};

        $scope.init = function () {
            $scope.queryCarStyleList();
            $scope.carBrandList = CarService.queryCarBrandList().$object;
        };
        $scope.carBrandChanged = function(){
            if($rootScope.vm.carBrandId==null) {
                $scope.carSerialList=[];
            }else{
                $scope.carSerialList = CarService.queryCarSerialList($rootScope.vm.carBrandId).$object;
            }
        };
        $scope.queryCarStyleList = function(){
            $scope.carStyleList = CarService.queryCarStylePageList().$object;
        };
        $scope.pageChanged = function(){
            $scope.queryCarStyleList();
        }
        $scope.addCarStyle = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_car/tpl/dialog-carstyle-add.html',
                controller:function($scope,RestApi){
                    $scope.item={};
                    $scope.carBrandList = CarService.queryCarBrandList({}).$object;
                    $scope.carBrandChanged = function(){
                        $scope.carSerialList = CarService.queryCarSerialList($scope.carBrandId).$object;
                    };
                    $scope.ok=function(){
                        modalInstance.close($scope.item);
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                CarService.addCarStyle(response).then(function(){
                    toaster.pop('success', '操作提醒', '增加成功');
                    $scope.queryCarStyleList({});
                })
            })
        };
        $scope.editCarStyle = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                resolve: {
                    item: function(){
                        return item;
                    }
                },
                templateUrl :'module_car/tpl/dialog-carstyle-edit.html',
                controller:function($scope,RestApi){
                    $scope.item=item;
                    CarService.queryCarBrandList({}).then(function(response){
                        $scope.carBrandList = response;
                        $scope.carBrandId = item.carBrand.id
                        $scope.carSerialList = CarService.queryCarSerialList($scope.carBrandId).$object;
                    });
                    $scope.ok=function(){
                        CarService.modifyCarStyle($scope.item).then(function(){
                            modalInstance.close('修改成功');
                        })
                    };
                    $scope.delete = function(){
                        CarService.deleteCarStyle(item.id).then(function(){
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
                $scope.queryCarStyleList({});
            })
        };
    })
;