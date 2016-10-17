'use strict';

/* Controllers */
// signin controllers
angular.module("pu.system.controllers")
    .controller('SysBranchController',function ($scope, $rootScope, $state, toaster,$uibModal,modal, SysBranchService,SysAreaService,
                                                SysJobService,SysAccountService,SysDictService,GpsService,ToolsService,ProductService,BankService) {
        $scope.init = function () {
            $scope.querySysBranchList();
        };
        $scope.querySysBranchList = function(){
            SysBranchService.querySysBranchList().then(function(response){
                $scope.sysBranchTree=ToolsService.convertArrayToTree(response, {
                    idKey: 'id',
                    parentKey: 'parentId',
                    childrenKey: 'children'
                });
            });
        }
        $scope.$on('nodeClicked',function (event) {
            $scope.selNode=event.targetScope.treeData;
            $scope.querySysAccountListByBranchId($scope.selNode.id);
        });
        $scope.addSysBranch = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_system/tpl/dialog-sysbranch-add.html',
                controller:function($scope,RestApi){
                    $scope.item={};
                    $scope.branchList =  SysBranchService.querySysBranchList().$object;
                    $scope.areaList = SysAreaService.querySysAreaList().$object;
                    $scope.branchTypeList = SysDictService.queryDictDataByTypeCode("jglx").$object;
                    $scope.ok=function(){
                        SysBranchService.addSysBranch($scope.item).then(function(){
                            modalInstance.close('增加机构成功');
                        })
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                toaster.pop('success', '操作提醒', response);
                $scope.querySysBranchList();
            })
        };
        $scope.editSysBranch = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                resolve: {
                    item: function(){
                        return item;
                    }
                },
                templateUrl :'module_system/tpl/dialog-sysbranch-edit.html',
                controller:function($scope,RestApi){
                    $scope.item=SysBranchService.querySysBranchByBranchId(item.id).$object;
                    $scope.branchList =  SysBranchService.querySysBranchList().$object;
                    $scope.areaList = SysAreaService.querySysAreaList().$object;
                    $scope.branchTypeList = SysDictService.queryDictDataByTypeCode("jglx").$object;
                    $scope.ok=function(){
                        SysBranchService.modifySysBranch($scope.item).then(function(){
                            modalInstance.close('修改机构成功');
                        })
                    };
                    $scope.delete = function(){
                        modal.confirm("删除确认","是否删除"+item.branchName).then(function(){
                            SysBranchService.deleteSysBranch($scope.item.sysBranch.id).then(function(){
                                modalInstance.close('删除机构成功');
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
                $scope.querySysBranchList();
            })
        };
        $scope.editSysBranchDealer = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                size:'lg',
                resolve: {
                    item: function(){
                        return item;
                    }
                },
                templateUrl :'module_system/tpl/dialog-sysbranchdealer-edit.html',
                controller:function($scope,RestApi){
                    $scope.item=SysBranchService.querySysBranchByBranchId(item.id).$object;
                    $scope.branchList =  SysBranchService.querySysBranchList().$object;
                    $scope.areaList = SysAreaService.querySysAreaList().$object;
                    $scope.branchTypeList = SysDictService.queryDictDataByTypeCode("jglx").$object;
                    $scope.dealerLvlList = SysDictService.queryDictDataByTypeCode("jxsjb").$object;
                    $scope.dealerTypeList = SysDictService.queryDictDataByTypeCode("jxslx").$object;
                    $scope.loanChannelList = SysDictService.queryDictDataByTypeCode("fkqd").$object;
                    $scope.gpsLvlList = GpsService.queryAllGpsLvlList().$object;
                    $scope.allProductList = ProductService.queryAllEnableProductList().$object;
                    $scope.bankInfoList = BankService.queryBankInfoList(false).$object;
                    $scope.ok=function(){
                        SysBranchService.modifySysBranch($scope.item).then(function(){
                            modalInstance.close('修改机构成功');
                        })
                    };
                    $scope.delete = function(){
                        modal.confirm("删除确认","是否删除"+item.branchName).then(function(){
                            SysBranchService.deleteSysBranch($scope.item.sysBranch.id).then(function(){
                                modalInstance.close('删除机构成功');
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
                $scope.querySysBranchList();
            })
        };
        $scope.querySysAccountListByBranchId = function(branchId){
            $scope.sysAccountList = SysBranchService.querySysAccountListByBranchId(branchId).$object;
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
                    $scope.branchList =  SysBranchService.querySysBranchList().$object;
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
                    $scope.branchList =  SysBranchService.querySysBranchList().$object;
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