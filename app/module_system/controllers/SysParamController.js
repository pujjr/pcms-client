'use strict';

/* Controllers */
// signin controllers
angular.module("pu.system.controllers")
    .controller('SysParamController',function ($scope, $rootScope, $state, toaster, $uibModal,SysParamService) {
        $scope.init = function () {
            $scope.querySysParamList();
        };
        $scope.querySysParamList = function(){
            $scope.sysParamList= SysParamService.querySysParamList().$object;
        }
        $scope.addSysParam = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_system/tpl/dialog-sysparam-add.html',
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
                SysParamService.addSysParam(response).then(function(){
                    toaster.pop('success', '操作提醒', '增加系统参数成功');
                    $scope.querySysParamList();
                })
            })
        };
        $scope.eidtSysParam = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_system/tpl/dialog-sysparam-edit.html',
                controller:function($scope,RestApi){
                    $scope.item=item;
                    $scope.ok=function(){
                        SysParamService.modifySysParam($scope.item).then(function(){
                            modalInstance.close('修改系统参数成功');
                        })
                    };
                    $scope.delete = function(){
                        SysParamService.deleteSysParam(item.id).then(function(){
                            modalInstance.close('删除字典类型成功');
                        })
                    }
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                toaster.pop('success', '操作提醒', response);
                $scope.querySysParamList();
            })
        };
    })
;