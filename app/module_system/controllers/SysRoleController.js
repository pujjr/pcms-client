'use strict';

/* Controllers */
// signin controllers
angular.module("pu.system.controllers")
    .controller('SysRoleController',function ($scope, $rootScope, $state, toaster, $uibModal,SysRoleService) {
        $scope.init = function () {
            $scope.querySysRoleList();
        };
        $scope.querySysRoleList = function(){
            $scope.sysRoleList= SysRoleService.querySysRoleList().$object;
        }
        $scope.addSysRole = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_system/tpl/dialog-sysrole-add.html',
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
                SysRoleService.addSysRole(response).then(function(){
                    toaster.pop('success', '操作提醒', '增加成功');
                    $scope.querySysRoleList();
                })
            })
        };
        $scope.editSysRole = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_system/tpl/dialog-sysrole-edit.html',
                controller:function($scope,RestApi){
                    $scope.item=item;
                    $scope.ok=function(){
                        SysRoleService.modifySysRole($scope.item).then(function(){
                            modalInstance.close('修改成功');
                        })
                    };
                    $scope.delete = function(){
                        SysRoleService.deleteSysRole(item.id).then(function(){
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
                $scope.querySysRoleList();
            })
        };
    })
;