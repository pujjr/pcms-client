angular.module('pu.system.services')
    .service("SysWorkgroupService",function($window,RestApi,$uibModal,SysBranchService,SysAccountService,ToolsService){
        this.querySysWorkgroupList = function(){
            return RestApi.all("/sysworkgroup").getList();
        };
        this.addSysWorkgroup = function(item){
            return RestApi.all("/sysworkgroup").post(item);
        };
        this.modifySysWorkgroup = function(item){
            return RestApi.one("/sysworkgroup",item.id).customPUT(item);
        };
        this.deleteSysWorkgroup = function(id){
            return RestApi.one("/sysworkgroup",id).remove();
        }
        this.querySysAccountListByWorkgroupId = function(workgroupId){
            return RestApi.one("/sysworkgroup",workgroupId).all("/accounts").getList();
        };
        this.removeSysAccountFromWorkgroup = function(workgroupId,accountId){
            return RestApi.all("/sysworkgroup").one(workgroupId,accountId).remove();
        };
        this.addSysAccountsToWorkgroup=function(workgroupId,accounts){
            return RestApi.one("/sysworkgroup",workgroupId).all("/accounts").post(accounts);
        };
        this.selWorkgroupAccounts = function(selNode){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                size:'lg',
                resolve: {
                    selNode: function(){
                        return selNode;
                    }
                },
                templateUrl :'module_system/tpl/dialog-sysworkgroup-seluser.html',
                controller:function($scope,RestApi,SysWorkgroupService){
                    $scope.selWorkgroup = selNode;
                    $scope.init = function(){
                        $scope.querySysBranchList();
                        $scope.workgroupAccounts = SysWorkgroupService.querySysAccountListByWorkgroupId($scope.selWorkgroup.id).$object;
                    };
                    $scope.querySysAccountListByBranchId = function(branchId){
                        $scope.sysAccountList = SysBranchService.querySysAccountListByBranchId(branchId,{pageSize:1000}).$object;
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
                        $scope.selBranch=event.targetScope.treeData;
                        $scope.queryCanSelAccountsByBranchId($scope.selBranch.id);

                    });
                    $scope.queryCanSelAccountsByBranchId = function(branchId){
                        SysBranchService.querySysAccountListByBranchId(branchId,{pageSize:1000}).then(function(response){
                            var accounts = [];
                            angular.copy(response,accounts);
                            for(var i = 0 ; i< accounts.length; i++){
                                var workgroupAccounts = $scope.workgroupAccounts;
                                for(var j = 0 ; j<workgroupAccounts.length; j++){
                                    if(accounts[i].id == workgroupAccounts[j].id){
                                        response = $scope.removeItem(response,accounts[i]);
                                        break;
                                    }
                                }
                            }
                            $scope.canSelSysAccounts = response;
                        })
                    };
                    $scope.removeItem = function(arr,item){
                      for(var i = 0;i<arr.length;i++){
                            if(arr[i].id == item.id){
                                arr.splice(i,1);
                                break;
                            }
                        }
                        return arr;
                    };
                    $scope.addToWorkgroup = function(item){
                        for(var i = 0 ;i<$scope.canSelSysAccounts.length ; i++){
                            if($scope.canSelSysAccounts[i].id == item.id){
                                $scope.canSelSysAccounts.splice(i,1);
                            }
                        };
                        for(var j = 0 ;j<$scope.workgroupAccounts.length; j++){
                            if($scope.workgroupAccounts[j]== item.id){
                                $scope.workgroupAccounts.splice(j,1);
                            }
                        }
                        $scope.workgroupAccounts.push(item);
                    };
                    $scope.removeFromWorkgroup =  function(item){
                        for(var j = 0 ;j<$scope.workgroupAccounts.length; j++){
                            if($scope.workgroupAccounts[j].id== item.id){
                                $scope.workgroupAccounts.splice(j,1);
                                if( $scope.selBranch !=undefined){
                                    $scope.querySysAccountListByBranchId($scope.selBranch.id);
                                }
                            }
                        }
                    };
                    $scope.ok=function(){
                        modalInstance.close($scope.workgroupAccounts);
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            return modalInstance.result;
        };

    });
