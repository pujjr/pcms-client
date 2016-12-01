angular.module('pu.assetsmanage.services')
    .service("CollectionService",function($window,RestApi,$uibModal,toaster){
        this.createPhoneCollectionTask = function(appId,applyComment){
            return RestApi.all("/collection/createPhoneCollectionTask").all(appId).all(applyComment).post();
        }
        this.applyNewCollectionTask = function(taskId,appId,taskType,params){
            return RestApi.all("/collection/applyNewCollectionTask").all(taskId).all(appId).all(taskType).post(params);
        };
        this.reassigneeTaskOperId = function(taskId,newOperId){
            return RestApi.all("/collection/reassigneeTaskOperId").all(taskId).all(newOperId).post();
        };
        this.getCollectionWorkgroupUserIdList = function(taskId){
            return RestApi.all("/collection/getCollectionWorkgroupUserIdList").all(taskId).getList();
        };
        this.commitApproveApplyNewCollectionTask = function(taskId,params){
            return RestApi.all("/collection/commitApproveApplyNewCollectionTask").all(taskId).post(params);
        };
        this.commitSettleLawsuitTask = function(taskId){
            return RestApi.all("/collection/commitSettleLawsuitTask").all(taskId).post();
        };
        this.getCollectionAppyInfo = function(businessKey){
            return RestApi.one("/collection/getCollectionAppyInfo",businessKey).get();
        };
        this.getNewCollectionAppyInfo = function(taskId){
            return RestApi.one("/collection/getNewCollectionAppyInfo",taskId).get();
        };
        this.getCollectionLogInfo = function(appId,taskType){
            return RestApi.all("/collection/getCollectionLogInfo").all(appId).all(taskType).getList();
        };
        this.getImportanCollectionLogInfo = function(appId){
            return RestApi.all("/collection/getImportanCollectionLogInfo").all(appId).getList();
        };
        this.saveCollectionLog = function(taskId,params){
            return RestApi.all("/collection/saveCollectionLog").all(taskId).post(params);
        };
        this.applyRecoverCollectionTask = function(appId,params){
            return RestApi.all("/collection/applyRecoverCollectionTask").all(appId).post(params);
        };
        this.commitApproveRecoverCollectionTask = function(taskId,params){
            return RestApi.all("/collection/commitApproveRecoverCollectionTask").all(taskId).post(params);
        }
        this.createRecoverCollectionTask = function(appId){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop: 'static',
                size: 'lg',
                templateUrl: 'module_assetsmanage/tpl/dialog-collection-add.html',
                controller: function ($scope, RestApi, SysDictService,modal,UnitInfoService,CollectionService) {
                    $scope.appId = appId;
                    $scope.applyVo = {};
                    $scope.taskName='委外收车';
                    $scope.taskType = 'csrwlx04';
                    $scope.recoverReasonList = SysDictService.queryDictDataByTypeCode("wwscyy").$object;
                    $scope.recoverUnitList = UnitInfoService.getUnitInfoList(true,'csdwlx02').$object;
                    $scope.ok = function () {
                        modal.confirm("操作提醒", "确认提交申请").then(function () {
                            CollectionService.applyRecoverCollectionTask($scope.appId, $scope.applyVo).then(function () {
                                modalInstance.close();
                            })
                        })
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            return modalInstance.result;
        }
        this.selectAssignee = function(taskId){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop:'false',
                templateUrl :'module_assetsmanage/tpl/dialog-selectassignee.html',
                controller:function($scope,RestApi,modal,CollectionService){
                    $scope.taskId = taskId;
                    $scope.accounts = CollectionService.getCollectionWorkgroupUserIdList($scope.taskId).$object;
                    $scope.checkAll = function(){
                        angular.forEach($scope.accounts,function(item){
                            item.checked = $scope.selectAllStatus;
                        })
                    };
                    $scope.select = function(item){
                        modalInstance.close(item);
                    }
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            return modalInstance.result;
        };
        this.applyReAssigneeTask  = function(taskId,reason){
            return RestApi.all("/collection/applyReAssigneeTask").all(taskId).post(reason);
        };
        this.getCollectionTaskCnt = function(appId){
            return RestApi.one("/collection/getCollectionTaskCnt",appId).get();
        }
    });
