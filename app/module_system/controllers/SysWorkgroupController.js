'use strict';

/* Controllers */
// signin controller
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
            SysWorkgroupService.querySysAccountListByWorkgroupId($scope.selNode.id);
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
        $scope.addSysAccount = function(selNode){
            var selNode = $scope.selNode;
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                size:'lg',
                resolve: {
                    selNode: function(){
                        return selNode;
                    }
                },
                templateUrl :'module_system/tpl/dialog-sysaccount-add.html',
                controller:function($scope,RestApi){
                    $scope.item={};
                    $scope.item.branchId = selNode.id;
                    $scope.branchList =  SysWorkgroupService.querySysWorkgroupList().$object;
                    $scope.jobList = SysJobService.querySysJobList().$object;
                    $scope.statusList = SysDictService.queryDictDataByTypeCode("ryzt").$object;
                    $scope.ok=function(){
                        SysAccountService.addSysAccount($scope.item).then(function(){
                            modalInstance.close('增加人员成功');
                        })
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                toaster.pop('success', '操作提醒', response);
                $scope.querySysAccountListByBranchId( $scope.selNode.id);
            })
        };
        $scope.editSysAccount = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                size:'lg',
                resolve: {
                    item: function(){
                        return item;
                    }
                },
                templateUrl :'module_system/tpl/dialog-sysaccount-edit.html',
                controller:function($scope,RestApi){
                    $scope.item=item;
                    $scope.branchList =  SysWorkgroupService.querySysWorkgroupList().$object;
                    $scope.jobList = SysJobService.querySysJobList().$object;
                    $scope.statusList = SysDictService.queryDictDataByTypeCode("ryzt").$object;
                    $scope.ok=function(){
                        SysAccountService.modifySysAccount($scope.item).then(function(){
                            modalInstance.close('修改人员信息成功');
                        })
                    };
                    $scope.delete = function(){
                        modal.confirm("删除确认","是否删除"+item.accountName).then(function(){
                            SysAccountService.deleteSysAccount(item.id).then(function(){
                                modalInstance.close('删除人员成功');
                            })
                        })
                    }
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                toaster.pop('success', '操作提醒',response );
                $scope.querySysAccountListByBranchId( $scope.selNode.id);
            })
        }
    })
;