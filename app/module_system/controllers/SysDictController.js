'use strict';

/* Controllers */
// signin controllers
angular.module("pu.system.controllers")
    .controller('SysDictController',function ($scope, $rootScope, $state, toaster,$uibModal,SysDictService,ToolsService) {
        $scope.init = function () {
            $scope.querySysDictTypeList();
        };
        $scope.querySysDictTypeList = function(){
            SysDictService.querySysDictTypeList().then(function(response){
                $scope.sysDictTypeTree=ToolsService.convertArrayToTree(response, {
                    idKey: 'id',
                    parentKey: 'parentId',
                    childrenKey: 'children'
                });
            });
        };

        $scope.addSysDictType = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_system/tpl/dialog-sysdicttype-add.html',
                controller:function($scope,RestApi){
                    $scope.item={};
                    $scope.list =  SysDictService.querySysDictTypeList().$object;
                    $scope.ok=function(){
                        modalInstance.close($scope.item);
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                SysDictService.addSysDictType(response).then(function(){
                    toaster.pop('success', '操作提醒', '增加字典类型成功');
                    $scope.querySysDictTypeList();
                })
            })
        };
        $scope.editSysDictType = function(item){
            var item = $scope.selNode;
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                resolve: {
                    item: function(){
                        return item;
                    }
                },
                templateUrl :'module_system/tpl/dialog-sysdicttype-edit.html',
                controller:function($scope,RestApi){
                    $scope.item=item;
                    $scope.list =  SysDictService.querySysDictTypeList().$object;
                    $scope.ok=function(){
                        SysDictService.modifySysDictType($scope.item).then(function(){
                            modalInstance.close('修改字典类型成功');
                        })
                    };
                    $scope.delete = function(){
                        SysDictService.deleteSysDictType(item.id).then(function(){
                            modalInstance.close('删除字典类型成功');
                        })
                    }
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                toaster.pop('success', '操作提醒',response );
                $scope.querySysDictTypeList();
            })
        };
        $scope.$on("nodeClicked", function (event) {
            $scope.selNode=event.targetScope.treeData;
             SysDictService.queryDictDataListByDictTypeId($scope.selNode.id).then(function(response){
                 $scope.sysDictDatas = response;
            });
        });
        $scope.addSysDictData =function(){
            var selDictType = $scope.selNode;
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                resolve: {
                    selDictType: function(){
                        return selDictType;
                    }
                },
                templateUrl :'module_system/tpl/dialog-sysdictdata-add.html',
                controller:function($scope,RestApi){
                    $scope.item={};
                    $scope.selDictType = selDictType;
                    $scope.item.dictTypeId= selDictType.id;
                    $scope.list =  SysDictService.querySysDictTypeList().$object;
                    $scope.ok=function(){
                        modalInstance.close($scope.item);
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                SysDictService.addSysDictData(response).then(function(){
                    toaster.pop('success', '操作提醒', '增加数据字典成功');
                    $scope.sysDictDatas = SysDictService.queryDictDataListByDictTypeId($scope.selNode.id).$object;
                })
            })
        };
        $scope.deleteDictData = function(id){
                SysDictService.deleteSysDictData(id).then(function(){
                    toaster.pop('success', '操作提醒', '删除数据字典成功');
                    $scope.sysDictDatas = SysDictService.queryDictDataListByDictTypeId($scope.selNode.id).$object;
                })
        };
        $scope.modifyDictDataStatus = function(item){
            SysDictService.modifySysDictData(item).then(function(){
                toaster.pop('success', '操作提醒', '修改数据字典成功');
                $scope.sysDictDatas = SysDictService.queryDictDataListByDictTypeId($scope.selNode.id).$object;
            })
        };
        $scope.modifyDictData = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                resolve: {
                    item: function(){
                        return item;
                    }
                },
                templateUrl :'module_system/tpl/dialog-sysdictdata-edit.html',
                controller:function($scope,RestApi){
                    $scope.item=item;
                    $scope.list =  SysDictService.querySysDictTypeList().$object;
                    $scope.ok=function(){
                        modalInstance.close($scope.item);
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                SysDictService.modifySysDictData(response).then(function(){
                    toaster.pop('success', '操作提醒', '修改数据字典成功');
                    $scope.sysDictDatas = SysDictService.queryDictDataListByDictTypeId($scope.selNode.id).$object;
                })
            })
        }
    })
;