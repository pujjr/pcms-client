'use strict';

/* Controllers */
// signin controllers
angular.module("pu.system.controllers")
    .controller('SysWorkgroupController',function ($scope, $rootScope, $state, toaster,$uibModal,modal, SysWorkgroupService,SysAreaService,SysJobService,SysAccountService,SysDictService,ToolsService) {
        $scope.init = function () {
            $scope.querySysWorkgroupList();
        };
        $scope.querySysWorkgroupList = function(){
            SysWorkgroupService.querySysWorkgroupList().then(function(response){
                $scope.workgroupTree=ToolsService.convertArrayToTree(response, {
                    idKey: 'id',
                    parentKey: 'parentId',
                    childrenKey: 'children'
                });
            });
        }
        $scope.$on('nodeClicked',function (event) {
            $scope.selNode=event.targetScope.treeData;
            $scope.workgroupAccountsList = SysWorkgroupService.querySysAccountListByWorkgroupId($scope.selNode.id).$object;
        });
        $scope.addSysWorkgroup = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_system/tpl/dialog-sysworkgroup-add.html',
                controller:function($scope,RestApi){
                    $scope.item={};
                    $scope.workgroupList = SysWorkgroupService.querySysWorkgroupList().$object;
                    $scope.ok=function(){
                        SysWorkgroupService.addSysWorkgroup($scope.item).then(function(){
                            modalInstance.close('增加工作组成功');
                        })
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                toaster.pop('success', '操作提醒', response);
                $scope.querySysWorkgroupList();
            })
        };
        $scope.editSysWorkgroup = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                resolve: {
                    item: function(){
                        return item;
                    }
                },
                templateUrl :'module_system/tpl/dialog-sysworkgroup-edit.html',
                controller:function($scope,RestApi){
                    $scope.item=item;
                    $scope.workgroupList = SysWorkgroupService.querySysWorkgroupList().$object;
                    $scope.ok=function(){
                        SysWorkgroupService.modifySysWorkgroup($scope.item).then(function(){
                            modalInstance.close('修改工作组成功');
                        })
                    };
                    $scope.delete = function(){
                        modal.confirm("删除确认","是否删除"+item.workgroupName).then(function(){
                            SysWorkgroupService.deleteSysWorkgroup($scope.item.id).then(function(){
                                modalInstance.close('删除工作组成功');
                            })
                        })
                    }
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                toaster.pop('success', '操作提醒', response);
                $scope.querySysWorkgroupList();
            })
        };
        $scope.querySysAccountListByBranchId = function(branchId){
            $scope.sysAccountList = SysWorkgroupService.querySysAccountListByBranchId(branchId).$object;
        };
        $scope.addWorkgroupAccounts = function(selNode){
            SysWorkgroupService.selWorkgroupAccounts(selNode).then(function(response){
                SysWorkgroupService.addSysAccountsToWorkgroup(selNode.id,response).then(function(){
                    toaster.pop('success', '操作提醒', "添加组成员成功");
                    $scope.workgroupAccountsList = SysWorkgroupService.querySysAccountListByWorkgroupId(selNode.id).$object;
                })
            });
        };
        $scope.removeFromWorkgroup = function(item){
            modal.confirm("操作确认","是否从工作组"+$scope.selNode.workgroupName+"移除"+item.accountName).then(function(){
                SysWorkgroupService.removeSysAccountFromWorkgroup($scope.selNode.id,item.id).then(function(){
                    toaster.pop('success', '操作提醒', "移除组成员成功");
                    $scope.workgroupAccountsList = SysWorkgroupService.querySysAccountListByWorkgroupId($scope.selNode.id).$object;
                })
            })
        }
    })
;