'use strict';

/* Controllers */
// signin controllers
angular.module("pu.gps.controllers")
    .controller('GpsSupplierController',function ($scope, $rootScope, $state, toaster, $uibModal,GpsService) {
        $scope.init = function () {
            $scope.queryGpsSupplierList();
        };
        $scope.queryGpsSupplierList = function(){
            $scope.gpsSupplierList= GpsService.queryGpsSupplierList(false).$object;
        }
        $scope.addGpsSupplier = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_gps/tpl/dialog-gpssupplier-add.html',
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
                GpsService.addGpsSupplier(response).then(function(){
                    toaster.pop('success', '操作提醒', '增加成功');
                    $scope.queryGpsSupplierList();
                })
            })
        };
        $scope.editGpsSupplier = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_gps/tpl/dialog-gpssupplier-edit.html',
                controller:function($scope,RestApi){
                    $scope.item=item;
                    $scope.ok=function(){
                        GpsService.modifyGpsSupplier($scope.item).then(function(){
                            modalInstance.close('修改成功');
                        })
                    };
                    $scope.delete = function(){
                        GpsService.deleteGpsSupplier(item.id).then(function(){
                            modalInstance.close('删除成功');
                        })
                    }
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                toaster.pop('success', '操作提醒', response);
                $scope.queryGpsSupplierList();
            })
        };
        $scope.gpslvlManage = function(){
            $state.go('app.gps.gpslvl')
        }
    })
;