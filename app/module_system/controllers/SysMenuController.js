'use strict';

/* Controllers */
// signin controllers
angular.module("pu.system.controllers")
    .controller('SysMenuController',function ($scope, $rootScope, $state, toaster, $uibModal,SysMenuService,SysDictService,ToolsService) {
        $scope.init = function () {
            $scope.querySysMenuList();
        };
        $scope.querySysMenuList = function(){
            SysMenuService.querySysMenuList().then(function(response){
                $scope.sysMenuTree=ToolsService.convertArrayToTree(response, {
                    idKey: 'id',
                    parentKey: 'parentId',
                    childrenKey: 'children'
                });
            });
        }
        $scope.select = function($item){
            $scope.selNode=$item;
            $scope.subSysMenus = SysMenuService.querySysMenuListByParentId($scope.selNode.id).$object;
        };
        $scope.addSysMenu = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_system/tpl/dialog-sysmenu-add.html',
                controller:function($scope,RestApi){
                    $scope.item={};
                    $scope.sysMenuList =  SysMenuService.querySysMenuList().$object;
                    $scope.ok=function(){
                        modalInstance.close($scope.item);
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                SysMenuService.addSysMenu(response).then(function(){
                    toaster.pop('success', '操作提醒', '增加菜单成功');
                    $scope.querySysMenuList();
                })
            })
        };
        $scope.editSysMenu = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                resolve: {
                    item: function(){
                        return item;
                    }
                },
                templateUrl :'module_system/tpl/dialog-sysmenu-edit.html',
                controller:function($scope,RestApi){
                    $scope.item=item;
                    $scope.sysMenuList =  SysMenuService.querySysMenuList().$object;
                    $scope.ok=function(){
                        SysMenuService.modifySysMenu($scope.item).then(function(){
                            modalInstance.close('修改菜单成功');
                        })
                    };
                    $scope.delete = function(){
                        SysMenuService.deleteSysMenu(item.id).then(function(){
                            modalInstance.close('删除菜单成功');
                        })
                    }
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                toaster.pop('success', '操作提醒',response );
                $scope.querySysMenuList();
            })
        };
    })
;