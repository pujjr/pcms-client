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
        this.querySysAccountListByBranchId = function(branchId){
            return RestApi.one("/sysbranch",branchId).all("/accounts").getList();
        };
        this.querySysBranchByBranchId = function(id){
            return RestApi.one("/sysbranch",id).get();
        };
        this.setAccountRole = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                size:'lg',
                resolve: {
                    item: function(){
                        return item;
                    }
                },
                templateUrl :'module_system/tpl/dialog-sysbranch-setuserrole.html',
                controller:function($scope,RestApi,SysRoleService){
                    $scope.item = item;
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
                        SysRoleService.saveAccountRoleList($scope.item.id,$scope.rightList).then(function(response){
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

    });
