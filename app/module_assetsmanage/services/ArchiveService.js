angular.module('pu.assetsmanage.services')
    .service("ArchiveService",function($window,RestApi,$uibModal,$q,toaster,modal){
        this.getArchiveToDoTaskList = function(appId,params){
            return RestApi.all("/archive/getArchiveToDoTaskList").getList();
        };
        this.getArchiveTaskDetail = function(archiveTaskId,archiveTaskType){
            return RestApi.all("/archive/getArchiveTaskDetail").all(archiveTaskId).all(archiveTaskType).getList();
        };
        this.saveArchiveTaskDetail = function(archiveTaskId,params){
            return RestApi.all("/archive/saveArchiveTaskDetail").all(archiveTaskId).post(params);
        };
        this.saveArchivePost = function(params){
            return RestApi.all("/archive/archivePost").post(params);
        };
        this.getArchiveList = function(){
            return RestApi.all("/archive/getArchiveList").getList();
        };
        this.saveArchiveDelay = function(params){
            return RestApi.all("/archive/archiveDelay").post(params);
        };
        this.applyArchiveSupply = function(taskId,params){
            return RestApi.all("/archive/applyArchiveSupply").all(taskId).post(params);
        };

        this.printArchiveCheckInfo = function(archiveTaskId,archiveItem){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop:'false',
                size:'lg',
                templateUrl :'module_assetsmanage/tpl/print-archive-check-info.html',
                controller:function($scope,RestApi,modal,ArchiveService){
                    $scope.archiveTaskId = archiveTaskId;
                    $scope.archiveItem = archiveItem;
                    $scope.archiveTaskDetail = ArchiveService.getArchiveTaskDetail($scope.archiveTaskId,"fkwcgd").$object;
                    $scope.ok = function(item){
                        ArchiveService.saveArchiveTaskDetail($scope.archiveTaskId,$scope.archiveTaskDetail).then(function(response){
                            ArchiveService.printArchiveCheckPdf($scope.archiveItem,$scope.archiveTaskDetail)
                            modalInstance.close();
                        })
                    }
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            return modalInstance.result;
        };
        this.generateArchiveCheckPdf = function(param){
            return RestApi.all("/print/generateContract/archiveCheck").post(param);
        }
        //打印PDF文件
        this.printArchiveCheckPdf = function(param,detailList){
            var modalInstance = $uibModal.open({
                animation: false,
                size:'lg',
                backdrop:'static',
                templateUrl :'module_utils/tpl/dialog-print-pdf.html',
                controller:function($scope,RestApi,ArchiveService){
                    $scope.param =param;
                    $scope.printTitle = "核对归档清单";
                    $scope.archiveCheckVo = {};
                    $scope.archiveCheckVo.userName = $scope.param.custName;
                    $scope.archiveCheckVo.contractNo = $scope.param.contractNo;
                    $scope.archiveCheckVo.contractKey ="hdgdqd";
                    $scope.archiveCheckVo.dataList = [];
                    var i =1;
                    angular.forEach(detailList,function(item){
                        var obj = {};
                        obj.seq = i;
                        obj.fileName = item.fileNameDesc;
                        obj.amt = item.postFileCnt;
                        obj.comment = item.comment
                        $scope.archiveCheckVo.dataList.push(obj);
                        i++;
                    })
                    $scope.loading = ArchiveService.generateArchiveCheckPdf($scope.archiveCheckVo).then(function(response){
                        $scope.pdfUrl = SERVER_URL.OSS_URL+response.osskey;
                    })
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
        };
        this.archivePost = function(selItems){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop:'false',
                templateUrl :'module_assetsmanage/tpl/dialog-archive-post.html',
                controller:function($scope,RestApi,modal,ArchiveService,SysDictService){
                    $scope.item = {};
                    $scope.item.selArchives = selItems;
                    $scope.expressCompanyList = SysDictService.queryDictDataByTypeCode("kdgs").$object;
                    $scope.ok = function(){
                        ArchiveService.saveArchivePost($scope.item).then(function(response){
                            modalInstance.close();
                        })
                    }
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            return modalInstance.result;
        };
        this.archiveSupply = function(){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop:'false',
                size:'lg',
                templateUrl :'module_assetsmanage/tpl/dialog-archive-supply.html',
                controller:function($scope,RestApi,modal,ArchiveService,SysDictService){
                    $scope.supplyInfo ={};
                    $scope.supplyInfo.archiveItemList = [];
                    SysDictService.queryDictDataByTypeCode("fkwcgd").then(function(response){
                        angular.forEach(response,function(item){
                            $scope.supplyInfo.archiveItemList.push({'fileName':item.dictDataCode,'fileNameDesc':item.dictDataName});
                        })
                    });
                    $scope.ok = function(){
                        modalInstance.close($scope.supplyInfo);
                    }
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            return modalInstance.result;
        };
        this.archiveDelay = function(archiveTaskId){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop:'false',
                templateUrl :'module_assetsmanage/tpl/dialog-archive-delay.html',
                controller:function($scope,RestApi,modal,ArchiveService,SysDictService){
                    $scope.item = {};
                    $scope.item.archiveTaskId = archiveTaskId;
                    $scope.ok = function(){
                        ArchiveService.saveArchiveDelay($scope.item).then(function(response){
                            modalInstance.close();
                        })
                    }
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            return modalInstance.result;
        };
        this.applyArchiveLog = function(params){
            return RestApi.all("/archive/applyArchiveLog").post(params);
        };
        this.getArchiveApplyInfo = function(archiveTaskId){
            return RestApi.one("/archive/getArchiveApplyInfo",archiveTaskId).get();
        };
        this.commitArchiveLog = function(taskId,params){
            return RestApi.all("/archive/commitArchiveLog").all(taskId).post(params);
        };
        this.createCollectionArchiveTask = function(appId,archiveType,params){
            return RestApi.all("/archive/createCollectionArchiveTask").all(appId).all(archiveType).post(params);
        }
        this.doCreateCollectionArchiveTask = function(appId,archiveType){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop:'false',
                size:'lg',
                templateUrl :'module_assetsmanage/tpl/dialog-create-collection-archive.html',
                controller:function($scope,RestApi,modal,ArchiveService,SysDictService){
                    $scope.appId = appId;
                    $scope.archiveType = archiveType;
                    $scope.archiveItemList  = [];
                    SysDictService.queryDictDataByTypeCode("csgd").then(function(response){
                        angular.forEach(response,function(item){
                            $scope.archiveItemList.push({'fileName':item.dictDataCode,'fileNameDesc':item.dictDataName});
                        })
                    });
                    $scope.ok = function(){
                        ArchiveService.createCollectionArchiveTask($scope.appId,$scope.archiveType,$scope.archiveItemList).then(function(response){
                            modalInstance.close();
                        })
                    }
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            return modalInstance.result;
        };
        this.getArchiveSupplyInfo = function(taskId){
            return RestApi.one("/archive/getArchiveSupplyInfo",taskId).get();
        };
        this.commitArchiveSupplyTask = function(taskId,params){
            return RestApi.all("/archive/commitArchiveSupplyTask").all(taskId).post(params);
        };
        this.commitArchiveLogSupplyTask = function(taskId,params){
            return RestApi.all("/archive/commitArchiveLogSupplyTask").all(taskId).post(params);
        };
        this.reApplyArchiveSupply = function(taskId,params){
            return RestApi.all("/archive/reApplyArchiveSupply").all(taskId).post(params);
        };
        this.getArchiveStoreList = function(appId){
            return RestApi.all("/archive/getArchiveStoreList").all(appId).getList();
        };
        this.applyArchiveBorrow = function(appId,params){
            return RestApi.all("/archive/applyArchiveBorrow").all(appId).post(params);
        };
        this.getArchiveBorrowInfo = function(borrowId){
            return RestApi.one("/archive/getArchiveBorrowInfo",borrowId).get();
        };
        this.commitApproveArchiveBorrowTask = function(taskId,params){
            return RestApi.all("/archive/commitApproveArchiveBorrowTask").all(taskId).post(params);
        };
        this.commitArchiveBorrowReturnTask = function(taskId,params){
            return RestApi.all("/archive/commitArchiveBorrowReturnTask").all(taskId).post(params);
        };
        this.backArchiveBorrowTask = function(taskId,message){
            return RestApi.all("/archive/backArchiveBorrowTask").all(taskId).post(message);
        };
        this.backTask = function(taskId){
            var defered=$q.defer();
            modal.prompt('回退原因','请输入回退原因').then(function(response){
                RestApi.all("/archive/backArchiveBorrowTask").all(taskId).post(response).then(function(response){
                    defered.resolve();
                },function(response){
                    defered.reject();
                });
            })
            return defered.promise;
        };
        this.reApplyArchiveBorrow = function(taskId,params){
            return RestApi.all("/archive/reApplyArchiveBorrow").all(taskId).post(params);
        };
        this.getHisSupplyInfo = function(archiveTaskId){
            return RestApi.all("/archive/getHisSupplyInfo").all(archiveTaskId).getList();
        }
    });
