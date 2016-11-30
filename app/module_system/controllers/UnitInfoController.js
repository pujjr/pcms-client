'use strict';

/* Controllers */
// signin controllers
angular.module("pu.system.controllers")
    .controller('UnitInfoController',function ($scope, $rootScope, $state, toaster, $uibModal,UnitInfoService,SysDictService) {
        $scope.init = function () {
            $scope.queryUnitInfoList();
        };
        $scope.queryUnitInfoList = function(){
            $scope.unitInfoList= UnitInfoService.getUnitInfoList(false,'').$object;
        }
        $scope.addUnitInfo = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_system/tpl/dialog-unitinfo-add.html',
                controller:function($scope,RestApi){
                    $scope.item={};
                    $scope.unitTypeList = SysDictService.queryDictDataByTypeCode("csdwlx").$object;
                    $scope.ok=function(){
                        modalInstance.close($scope.item);
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                UnitInfoService.addUnitInfo(response).then(function(){
                    toaster.pop('success', '操作提醒', '增加银行参数成功');
                    $scope.queryUnitInfoList();
                })
            })
        };
        $scope.editUnitInfo = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_system/tpl/dialog-unitinfo-edit.html',
                controller:function($scope,RestApi){
                    $scope.item=item;
                    $scope.unitTypeList = SysDictService.queryDictDataByTypeCode("csdwlx").$object;
                    $scope.ok=function(){
                        UnitInfoService.modifyUnitInfo($scope.item).then(function(){
                            modalInstance.close('修改成功');
                        })
                    };
                    $scope.delete = function(){
                        UnitInfoService.deleteUnitInfo(item.id).then(function(){
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
                $scope.queryUnitInfoList();
            })
        };
    })
;