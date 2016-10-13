'use strict';

/* Controllers */
// signin controllers
angular.module("pu.file.controllers")
    .controller('DirectoryController',function ($scope, $rootScope, $state, toaster, $uibModal,DirectoryService,ToolsService) {
        $scope.init = function () {
            $scope.queryDirectoryList();
        };
        $scope.queryDirectoryList = function(){
            DirectoryService.queryDirectoryList(false).then(function(response){
                $scope.dirTree=ToolsService.convertArrayToTree(response, {
                    idKey: 'id',
                    parentKey: 'parentId',
                    childrenKey: 'children'
                });
            });
        }
        $scope.addDir = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_file/tpl/dialog-directory-add.html',
                controller:function($scope,RestApi){
                    $scope.item={};
                    $scope.item1=[];
                    $scope.dirList = DirectoryService.queryDirectoryList(false).$object;
                    $scope.ok=function(){
                        modalInstance.close($scope.item);
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                DirectoryService.addDirectory(response).then(function(){
                    toaster.pop('success', '操作提醒', '增加目录成功');
                    $scope.queryDirectoryList();
                })
            })
        };
        $scope.editDir = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_file/tpl/dialog-directory-edit.html',
                controller:function($scope,RestApi){
                    $scope.item=item;
                    $scope.dirList = DirectoryService.queryDirectoryList(false).$object;
                    $scope.ok=function(){
                        DirectoryService.modifyDirectory($scope.item).then(function(){
                            modalInstance.close('修改成功');
                        })
                    };
                    $scope.delete = function(){
                        DirectoryService.deleteDirectory(item.id).then(function(){
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
                $scope.queryDirectoryList();
            })
        };
        $scope.select = function(item){
            $scope.selNode=item;
            $scope.subSysAreas = DirectoryService.queryDirectoryListByParentId($scope.selNode.id).$object;
        }
        $scope.checked = function(item){
            console.log(item);
        }
    })
;