'use strict';

/* Controllers */
// signin controllers
angular.module("pu.system.controllers")
    .controller('SysAreaController',function ($scope, $rootScope, $state, toaster, $uibModal,SysAreaService,SysDictService,ToolsService) {
        $scope.init = function () {
            $scope.querySysAreaList();
        };
        $scope.querySysAreaList = function(){
            SysAreaService.querySysAreaList().then(function(response){
                $scope.sysAreaTree=ToolsService.convertArrayToTree(response, {
                    idKey: 'id',
                    parentKey: 'parentId',
                    childrenKey: 'children'
                });
            });
        }
        $scope.$on('nodeClicked',function (event) {
            $scope.selNode=event.targetScope.treeData;
            $scope.subSysAreas = SysAreaService.querySysAreaListByParentId($scope.selNode.id).$object;
        });
        $scope.addSysArea = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_system/tpl/dialog-sysarea-add.html',
                controller:function($scope,RestApi){
                    $scope.item={};
                    $scope.sysAreas =  SysAreaService.querySysAreaList().$object;
                    $scope.sysAreaTypes = SysDictService.queryDictDataByTypeCode("qylx").$object;
                    $scope.ok=function(){
                        modalInstance.close($scope.item);
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                SysAreaService.addSysArea(response).then(function(){
                    toaster.pop('success', '操作提醒', '增加区域成功');
                    $scope.querySysAreaList();
                })
            })
        };
        $scope.editSysArea = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                resolve: {
                    item: function(){
                        return item;
                    }
                },
                templateUrl :'module_system/tpl/dialog-sysarea-edit.html',
                controller:function($scope,RestApi){
                    $scope.item=item;
                    $scope.sysAreas =  SysAreaService.querySysAreaList().$object;
                    $scope.sysAreaTypes = SysDictService.queryDictDataByTypeCode("qylx").$object;
                    $scope.ok=function(){
                        SysAreaService.modifySysArea($scope.item).then(function(){
                            modalInstance.close('修改区域成功');
                        })
                    };
                    $scope.delete = function(){
                        SysAreaService.deleteSysArea(item.id).then(function(){
                            modalInstance.close('删除区域成功');
                        })
                    }
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                toaster.pop('success', '操作提醒',response );
                $scope.querySysAreaList();
            })
        };
    })
;