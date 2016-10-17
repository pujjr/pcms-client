'use strict';

/* Controllers */
// signin controllers
angular.module("pu.gps.controllers")
    .controller('GpsLvlController',function ($scope, $rootScope, $state, toaster, $uibModal,GpsService) {
        $scope.init = function () {
            $scope.queryGpsLvlList();
        };
        $scope.queryGpsLvlList = function(){
            $scope.gpsLvlList= GpsService.queryAllGpsLvlList().$object;
        }
        $scope.addGpsLvl = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_gps/tpl/dialog-gpslvl-add.html',
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
                GpsService.addGpsLvl(response).then(function(){
                    toaster.pop('success', '操作提醒', '增加成功');
                    $scope.queryGpsLvlList();
                })
            })
        };
        $scope.editGpsLvl = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_gps/tpl/dialog-gpslvl-edit.html',
                controller:function($scope,RestApi){
                    $scope.item=item;
                    $scope.ok=function(){
                        GpsService.modifyGpsLvl($scope.item.id,$scope.item).then(function(){
                            modalInstance.close('修改成功');
                        })
                    };
                    $scope.delete = function(){
                        GpsService.deleteGpsLvl(item.id).then(function(){
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
                $scope.queryGpsLvlList();
            })
        };
    })
;