angular.module('pu.system.services')
    .service("SysBranchService",function($window,RestApi,$uibModal){
        this.querySysBranchList = function(){
            return RestApi.all("/sysbranch").getList();
        };
        this.addSysBranch = function(item){
            return RestApi.all("/sysbranch").post(item);
        };
        this.modifySysBranch = function(item){
            return RestApi.one("/sysbranch",item.sysBranch.id).customPUT(item);
        };
        this.deleteSysBranch = function(id){
            return RestApi.one("/sysbranch",id).remove();
        }
        this.querySysAccountListByBranchId = function(branchId,extParam){
            return RestApi.one("/sysbranch",branchId).all("/accounts").getList(extParam);
        };
        this.querySysBranchByBranchId = function(id){
            return RestApi.one("/sysbranch",id).get();
        };
        this.setAccountRole = function(item){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop:'false',
                size:'lg',
                resolve: {
                    item: function(){
                        return item;
                    }
                },
                templateUrl :'module_system/tpl/dialog-sysbranch-setuserauth.html',
                controller:function($scope,RestApi,SysRoleService,ToolsService,SysBranchService,SysAccountService){
                    $scope.item = item;
                    $scope.requestData = {};
                    $scope.init = function(){
                        SysRoleService.querySysRoleList().then(function(response){
                            $scope.leftList = response;
                            SysRoleService.queryAccountRoleList($scope.item.id).then(function(response){
                                $scope.rightList = response;
                                for(var i = 0 ;i<$scope.rightList.length;i++){
                                    var rightItem= $scope.rightList[i];
                                    for(var j = 0 ;j<$scope.leftList.length;j++){
                                        var leftItem = $scope.leftList[j];
                                        if(rightItem.id == leftItem.id){
                                            $scope.leftList.splice(j,1);
                                            break;
                                        }
                                    }
                                }
                            });
                        });
                        SysBranchService.getDealerList().then(function(response){
                            //查询授权数据查询信息
                            $scope.dealerList = response;
                            SysAccountService.getAccountQueryAuthList($scope.item.id).then(function(response){
                                $scope.requestData.queryAuthLvl = response.queryAuthLvl;
                                $scope.queryAuthList = response.queryAuthList;
                                angular.forEach($scope.dealerList,function(item){
                                    for(var i = 0 ;i<$scope.queryAuthList.length;i++){
                                        if($scope.queryAuthList[i].branchCode == item.branchCode){
                                            item.checked=true;
                                            break;
                                        }
                                    }
                                })
                            })
                            $scope.sysBranchTree=ToolsService.convertArrayToTree($scope.dealerList, {
                                idKey: 'id',
                                parentKey: 'parentId',
                                childrenKey: 'children',
                                ignoreTopLevel:true
                            });
                        });
                    };

                    $scope.addToRight = function(item){
                        for(var i = 0 ;i<$scope.leftList.length ; i++){
                            if($scope.leftList[i].id == item.id){
                                $scope.leftList.splice(i,1);
                                break;
                            }
                        };
                        $scope.rightList.push(item);
                    };
                    $scope.removeFromRight =  function(item){
                        for(var i = 0 ;i<$scope.rightList.length ; i++){
                            if($scope.rightList[i].id == item.id){
                                $scope.rightList.splice(i,1);
                                break;
                            }
                        };
                        $scope.leftList.push(item);
                    };
                    $scope.ok=function(){
                        $scope.requestData.roleList = $scope.rightList;
                        var checkList = ToolsService.getTreeCheckedList($scope.sysBranchTree);
                        $scope.requestData.queryAuthBranchList = checkList;
                        SysAccountService.saveAccountAuth($scope.item.id,$scope.requestData).then(function(response){
                            modalInstance.close('设置角色信息成功');
                        })
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            return modalInstance.result;
        };
        this.getDealerList = function(){
            return RestApi.all("/sysbranch/getDealerList").getList();
        };
        this.getDealerTreeList = function(){
            return RestApi.all("/sysbranch/getDealerTreeList").getList();
        }

    });
