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
        };
        this.getCollectionApplyTask = function(appId){
            return RestApi.all("/collection/getCollectionApplyTask").all(appId).getList();
        };
        this.commitSettleApprove = function(taskId){
            return RestApi.all("/collection/commitSettleApprove").all(taskId).post();
        };
        this.showCollectionTaskDetail = function(item){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop:'static',
                resolve:{
                    item:function(){
                        return item;
                    }
                },
                size:'lg',
                templateUrl :'module_assetsmanage/tpl/dialog-collection-apply-info.html',
                controller:function($scope,$rootScope,RestApi,CollectionService,SysDictService,UnitInfoService){
                    $scope.businessKey = item.businessKey;
                    $scope.appId = item.appId;
                    $scope.procDefId = item.procDefId;
                    $scope.procInstId = item.procInstId;
                    CollectionService.getCollectionAppyInfo($scope.businessKey).then(function(response){
                        $scope.applyVo = response;
                        var taskType = response.taskType;
                        if(taskType=='csrwlx02'){
                            $scope.taskName = '上门催收';
                            $scope.visitReasonList = SysDictService.queryDictDataByTypeCode("smcsyy").$object;
                        }
                        if(taskType =='csrwlx03'){
                            $scope.taskName = '委外催收';
                            $scope.outReasonList =  SysDictService.queryDictDataByTypeCode("wycsyy").$object;
                            $scope.outUnitList = UnitInfoService.getUnitInfoList(true,'csdwlx01').$object;
                        }
                        if(taskType =='csrwlx04'){
                            $scope.taskName = '委外收车';
                            $scope.recoverReasonList = SysDictService.queryDictDataByTypeCode("wwscyy").$object;
                            $scope.recoverUnitList = UnitInfoService.getUnitInfoList(true,'csdwlx02').$object;
                        }
                        if(taskType =='csrwlx05'){
                            $scope.taskName = '车辆退回';
                            $scope.backReasonList = SysDictService.queryDictDataByTypeCode("clthyy").$object;
                        }
                        if(taskType =='csrwlx06'){
                            $scope.taskName = '资产处置';
                            $scope.disposeReasonList = SysDictService.queryDictDataByTypeCode("zcczyy").$object;
                            $scope.disposeUnitList = UnitInfoService.getUnitInfoList(true,'csdwlx02').$object;
                        }
                        if(taskType =='csrwlx07'){
                            $scope.taskName = '诉讼';
                            $scope.lawsuitReasonList = SysDictService.queryDictDataByTypeCode("ssyy").$object;
                            $scope.lawsuitUnitList = UnitInfoService.getUnitInfoList(true,'csdwlx03').$object;
                        }
                    });
                    $scope.getWorkflowProcessResultByProcInstId = function(){
                        $scope.workflowProcessResultList = QueryService.getWorkflowProcessResultByProcInstId($scope.procInstId).$object;
                    };
                    $scope.openWorkflowDiagram = function(taskId ) {
                        var processDefinitionId = $scope.procDefId;
                        var processInstanceId = $scope.procInstId;
                        window.open(BASE_URL + "/diagram-viewer/index.html?processDefinitionId=" + processDefinitionId + "&processInstanceId=" + processInstanceId + "&token=" + $rootScope.Authorization);
                    }
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
        };
        //查询已申请催收任务
        this.getApplyCollectionTaskListByOperId = function(){
            return RestApi.all("/collection/getApplyCollectionTaskListByOperId").getList();
        }
    });
