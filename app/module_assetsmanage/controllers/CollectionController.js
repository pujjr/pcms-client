'use strict';

/* Controllers */
angular.module("pu.assetsmanage.controllers")
    .controller('CollectionController',function ($scope, $rootScope, $state,$stateParams, toaster,modal, $uibModal,CollectionService,LoanQueryService,SysDictService,UnitInfoService,ArchiveService) {
        $scope.initCollectionData = function(){
            $scope.procInstId = $stateParams.procInstId;
            $scope.taskId = $stateParams.taskId;
            $scope.businessKey = $stateParams.businessKey;
            $scope.appId = $stateParams.appId;
            $scope.workflowKey = $stateParams.workflowKey;
            $scope.applyVo = {};
            $scope.doInitApplyEdit($stateParams.appId);
            $scope.task = LoanQueryService.getTaskByTaskId($stateParams.taskId,$stateParams.workflowKey).$object;
            $scope.baseInfoVo = LoanQueryService.getLoanCustApplyInfo($scope.appId).$object;

        };
        $scope.initCollection = function(){
            $scope.initCollectionData();
            //根据流程定义ID初始化数据
            if($scope.workflowKey =='DHCS' || $scope.workflowKey =='WWCS'||$scope.workflowKey =='SMCS'){
                $scope.collectionStatusList = SysDictService.queryDictDataByTypeCode("cszt").$object;
                $scope.overdueReasonList  =  SysDictService.queryDictDataByTypeCode("yqyy").$object;
            }
            if($scope.workflowKey =='WWSC'){
                $scope.recoverStatusList = SysDictService.queryDictDataByTypeCode("sczt").$object;
            }
            if($scope.workflowKey =='CLTH'){
                $scope.refundStatusList = SysDictService.queryDictDataByTypeCode("thzt").$object;
            }
            if($scope.workflowKey =='ZCCZ'){
                $scope.disposeStatusList = SysDictService.queryDictDataByTypeCode("czzt").$object;
            }
            if($scope.workflowKey =='SS'){
                $scope.lawsuitStatusList = SysDictService.queryDictDataByTypeCode("sszt").$object;
            }
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
        };
        $scope.initCollectionApprove = function(){
            $scope.initCollectionData();
            CollectionService.getNewCollectionAppyInfo($scope.taskId).then(function(response){
                $scope.applyVo = response;
                var taskType = response.taskType;
                $scope.approveVo = {};
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
        };
        $scope.initRecoverCollectionApprove = function(){
            $scope.initCollectionData();
            $scope.approveVo = {};
            $scope.applyVo = CollectionService.getCollectionAppyInfo($scope.businessKey).$object;
            $scope.approveList = SysDictService.queryDictDataByTypeCode("fkspjglx").$object;
            $scope.taskName = '委外收车';
            $scope.recoverReasonList = SysDictService.queryDictDataByTypeCode("wwscyy").$object;
            $scope.recoverUnitList = UnitInfoService.getUnitInfoList(true,'csdwlx02').$object;
        }
        $scope.saveCollectionLog =function(){
            CollectionService.saveCollectionLog($scope.taskId,$scope.applyVo).then(function(response){
                toaster.pop('success', '操作提醒', '提交任务成功 ');
                $scope.applyVo={};
            })
        };
        $scope.commitApproveApplyNewCollectionTask = function(){
            modal.confirm('操作提醒','确认提交任务？').then(function(){
                CollectionService.commitApproveApplyNewCollectionTask($scope.taskId,$scope.approveVo).then(function(){
                    toaster.pop('success', '操作提醒', '提交任务成功 ');
                    $state.go('app.loantask.todolist');
                })
            })
        };
        $scope.commitApproveRecoverCollectionTask = function(){
            CollectionService.commitApproveRecoverCollectionTask($scope.taskId,$scope.approveVo).then(function(){
                toaster.pop('success', '操作提醒', '提交任务成功 ');
                $state.go('app.loantask.todolist');
            })
        };
        $scope.applyReAssigneeTask = function(){
            modal.prompt('调配原因','请输入调配原因').then(function(response){
                CollectionService.applyReAssigneeTask($scope.taskId,response).then(function(response){
                    toaster.pop('success', '操作提醒', '提交任务成功 ');
                    $state.go('app.loantask.todolist');
                })
            })
        }
        $scope.getImportantCollectionLog = function(){
            $scope.collectionLogCntMap = CollectionService.getCollectionTaskCnt($scope.appId).$object;
            $scope.importanCollectionLogList = CollectionService.getImportanCollectionLogInfo($scope.appId).$object;
        };
        $scope.getCollectionLog = function(taskType){
            $scope.collectionLogList = CollectionService.getCollectionLogInfo($scope.appId,taskType).$object;
        };
        $scope.getCollectionTask = function(){
            $scope.collectionTaskList = CollectionService.getCollectionApplyTask($scope.appId).$object;
        }
        $scope.selectAssignee = function(){
            CollectionService.selectAssignee($scope.taskId).then(function(response){
                modal.confirm("操作提醒","是否确认分配给"+response.accountName+"?").then(function(){
                    CollectionService.reassigneeTaskOperId($scope.taskId,response.accountId).then(function(){
                        toaster.pop('success', '操作提醒', '提交任务成功 ');
                        $state.go('app.loantask.todolist');
                    })
                })
            })
        }
        $scope.initCollectionAssignee = function(){
            $scope.initCollectionData();
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

        }
        $scope.appendToEl = angular.element(document.querySelector('#check-header'));

        $scope.applyNewCollectionTask = function(taskType){
            var appId = $scope.appId;
            var taskId = $scope.taskId;
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop: 'static',
                size: 'lg',
                templateUrl: 'module_assetsmanage/tpl/dialog-collection-add.html',
                controller: function ($scope, RestApi, SettleService, ToolsService, modal, LoanQueryService,UnitInfoService) {
                    $scope.appId = appId;
                    $scope.taskType = taskType;
                    $scope.taskId = taskId;
                    $scope.applyVo = {};
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
                    $scope.ok = function () {
                        modal.confirm("操作提醒", "确认提交任务？").then(function () {
                            CollectionService.applyNewCollectionTask($scope.taskId,$scope.appId, $scope.taskType, $scope.applyVo).then(function () {
                                modalInstance.close();
                            })
                        })
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function (response) {
                toaster.pop('success', '操作提醒', "提交任务成功");
                $state.go('app.loantask.todolist');
            })
        };
        $scope.commitSettleLawsuitTask = function(){
            modal.confirm("操作提醒","确认提交结案?").then(function(){
                CollectionService.commitSettleLawsuitTask($scope.taskId).then(function(response){
                    toaster.pop('success', '操作提醒', '提交任务成功 ');
                    $state.go('app.loantask.todolist');
                    if(response.reason!=null){
                        modal.info("操作提醒",response.reason);
                    }
                })
            })
        }
        $scope.initCollectionSettleApprove = function(){
            $scope.initCollectionData();
            CollectionService.getCollectionAppyInfo($scope.businessKey).then(function(response){
                $scope.applyVo = response;
                var taskType = response.taskType;
                $scope.approveVo = {};
                if(taskType=='csrwlx01'){
                    $scope.taskName = '电话催收';
                }
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
        };
        $scope.commitSettleApprove = function(){
            modal.confirm("操作提醒", "确认提交任务？").then(function () {
                CollectionService.commitSettleApprove($scope.taskId).then(function () {
                    toaster.pop('success', '操作提醒', '提交任务成功 ');
                    $state.go('app.loantask.todolist');
                })
            })
        };
        $scope.doCreateCollectionArchiveTask = function(){
            var archiveType="";
            if($scope.workflowKey == 'DHCS'){
                archiveType="dhcsgd";
            }
            if($scope.workflowKey == 'SMCS'){
                archiveType="smcsgd";
            }
            if($scope.workflowKey == 'WWCS'){
                archiveType="wwcsgd";
            }
            if($scope.workflowKey == 'WWSC'){
                archiveType="wwscgd";
            }
            if($scope.workflowKey == 'CLTH'){
                archiveType="clthgd";
            }
            if($scope.workflowKey == 'ZCCZ'){
                archiveType="zcccgd";
            }
            if($scope.workflowKey == 'SS'){
                archiveType="ssgd";
            }
            ArchiveService.doCreateCollectionArchiveTask($scope.appId,archiveType).then(function(){
                toaster.pop('success', '操作提醒', '创建任务成功 ');
            })
        };
        $scope.initCollectionHistoryTaskList = function(){
            $scope.taskList = CollectionService.getApplyCollectionTaskListByOperId().$object;
        };
        $scope.showCollectionTaskDetail = function(item){
            CollectionService.showCollectionTaskDetail(item);
        }
    })
;