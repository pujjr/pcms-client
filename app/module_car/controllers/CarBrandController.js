'use strict';

/* Controllers */
// signin controllers
angular.module("pu.car.controllers")
    .controller('CarBrandController',function ($scope, $rootScope, $state, toaster, $uibModal,CarService,SysDictService,ToolsService) {
        $scope.queryParams={};

        $scope.init = function () {
            $scope.queryCarBrandList($scope.queryParams);
        };

        $scope.queryCarBrandList = function(queryParams){
            $scope.carBrandList = CarService.queryCarBrandPageList(queryParams).$object;
        };
        $scope.addCarBrand = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_car/tpl/dialog-carbrand-add.html',
                controller:function($scope,RestApi){
                    $scope.item={};
                    $scope.ok=function(){
                        modalInstance.close($scope.item);
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                CarService.addCarBrand(response).then(function(){
                    toaster.pop('success', '操作提醒', '增加成功');
                    $scope.queryCarBrandList();
                })
            })
        };
        $scope.editCarBrand = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                resolve: {
                    item: function(){
                        return item;
                    }
                },
                templateUrl :'module_form/tpl/dialog-carbrand-edit.html',
                controller:function($scope,RestApi){
                    $scope.item=item;
                    $scope.ok=function(){
                        CarService.modifyCarBrand($scope.item).then(function(){
                            modalInstance.close('修改成功');
                        })
                    };
                    $scope.delete = function(){
                        CarService.deleteCarBrand(item.id).then(function(){
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
                $scope.queryCarBrandList();
            })
        };
    })
;