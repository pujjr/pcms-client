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
        $scope.setSysRoleMenu = function(item){
            var modalInstance = $uibModal.open({
                animation: false,
                size:'lg',
                backdrop:'false',
                templateUrl :'module_system/tpl/dialog-sysrole-setmenu.html',
                controller:function($scope,RestApi,SysMenuService,ToolsService){
                    $scope.item=item;
                    SysMenuService.querySysMenuList().then(function(response){
                        $scope.sysMenuList=response;
                        SysRoleService.querySysRoleMenuList($scope.item.id).then(function(response){
                            $scope.roleMenuList = response;
                            for(var i =0 ;i<$scope.roleMenuList.length;i++){
                                var tmp = $scope.roleMenuList[i];
                                for(var j = 0;j<$scope.sysMenuList.length;j++){
                                    var l = $scope.sysMenuList[j];
                                    if(l.id == tmp.id){
                                        $scope.sysMenuList[j].checked=true;
                                        break;
                                    }
                                }
                            }
                        })
                        $scope.sysMenuTree=ToolsService.convertArrayToTree($scope.sysMenuList, {
                            idKey: 'id',
                            parentKey: 'parentId',
                            childrenKey: 'children'
                        });
                    });
                    $scope.ok=function(){
                        var checkList = ToolsService.getTreeCheckedList($scope.sysMenuTree);
                        SysRoleService.saveSysRoleMenuList($scope.item.id,checkList).then(function(){
                            modalInstance.close('设置角色权限成功');
                        })
                    };
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