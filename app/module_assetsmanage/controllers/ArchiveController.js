'use strict';

/* Controllers */
angular.module("pu.assetsmanage.controllers")
    .controller('ArchiveController',function ($scope, $rootScope, $state,$stateParams, toaster,modal, $uibModal,ArchiveService,LoanQueryService,LoanTaskService,SysDictService,SysAreaService,InsManageService) {
        //初始化档案整理任务查询
        $scope.initArchiveClear = function(){
            $rootScope.resetCache()
            ArchiveService.getArchiveToDoTaskList().then(function(response){
               $scope.taskList = response;
           });
        };
        //查询档案整理任务信息
        $scope.queryArchiveToDoTaskList = function(){
            ArchiveService.getArchiveToDoTaskList().then(function(response){
                $scope.taskList = response;
            });
        }
        //打印核对归档清单
        $scope.printArchiveCheckInfo = function(item){
            ArchiveService.printArchiveCheckInfo(item.archiveTaskId,item).then(function(){
                toaster.pop('success', '操作提醒', "保存明细成功");
                $scope.initArchiveClear();
            })
        };
        //档案邮寄
        $scope.archivePost = function(){
            ArchiveService.archivePost().then(function(response){
                toaster.pop('success', '操作提醒', "保存邮寄信息成功");
                $scope.initArchiveClear();
            })
        };
        //打印邮寄汇总清单
        $scope.printPostSummaryList = function(){
            ArchiveService.archivePrintPostSummary().then(function(response){
                toaster.pop('success', '操作提醒', "保存邮寄信息成功");
                ArchiveService.printArchivePostSummaryPdf(response);
                $scope.initArchiveClear();
            })
        }
        //初始化档案归档查询
        $scope.initArchiveList = function(){
            $scope.archiveList = ArchiveService.getArchiveList().$object;
        };
        //档案归档延期
        $scope.archiveDelay = function(item){
            ArchiveService.archiveDelay(item.archiveTaskId).then(function(){
                toaster.pop('success', '操作提醒', "保存延期信息成功");
                $scope.initArchiveList();
            })
        };
        //经销申请档案归档
        $scope.applyArchiveLog = function(){
            ArchiveService.applyArchiveLog().then(function(){
                toaster.pop('success', '操作提醒', "提交任务成功");
                $scope.initArchiveClear();
            })
        };
        //初始化查询放款完成档案归档任务列表
        $scope.initLoanArchiveLog = function(){
            $scope.procInstId = $stateParams.procInstId;
            $scope.taskId = $stateParams.taskId;
            $scope.businessKey = $stateParams.businessKey;
            $scope.appId = $stateParams.appId;
            $scope.workflowKey = $stateParams.workflowKey;
            $scope.doInitApplyEdit($stateParams.appId);
            $scope.task = LoanQueryService.getTaskByTaskId($stateParams.taskId,$stateParams.workflowKey).$object;
            ArchiveService.getArchiveApplyInfo($scope.businessKey).then(function(response){
                $scope.archiveInfo = response;
                angular.forEach($scope.archiveInfo.detailList,function(item){
                    item.recvFileCnt = item.postFileCnt;
                })
            });
        };
        //归档环节申请补充归档资料
        $scope.archiveSupply = function(){
            ArchiveService.archiveSupply().then(function(response){
                modal.confirm("操作提醒","确认提交？").then(function(){
                    ArchiveService.applyArchiveSupply($scope.taskId,{'archiveTask':$scope.archiveInfo,'comment':response.comment,'supplyDetailList':response.archiveItemList}).then(function(){
                        toaster.pop('success', '操作提醒', '提交补充归档资料任务成功');
                        $state.go('app.loantask.todolist');
                    })
                })
            })
        }
        //初始化保险续保信息
        $scope.initInsuranceContinue = function(){
            $scope.baseInfoVo = LoanQueryService.getLoanCustApplyInfo($scope.appId).$object;
            $scope.insHisList = InsManageService.getInsuranceHisList($scope.appId).$object;
        };
        //新增商业保险
        $scope.addBusinessInsurance = function(item){
            InsManageService.addBusinessInsurance($scope.appId,item.signId,"bxlx02").then(function(response){
                toaster.pop('success', '操作提醒', '新增保险信息成功 ');
                $scope.insHisList = InsManageService.getInsuranceHisList($scope.appId).$object;
            })
        };
        //提交档案归档
        $scope.commitArchiveLog = function(){
            modal.confirm("操作提醒","确认提交").then(function(){
                ArchiveService.commitArchiveLog($scope.taskId,$scope.archiveInfo).then(function(){
                    toaster.pop('success', '操作提醒', '提交任务成功 ');
                    $state.go('app.loantask.todolist');
                })
            })
        };
        //初始档案资料补充
        $scope.initArchiveSupply = function(){
            $scope.procInstId = $stateParams.procInstId;
            $scope.taskId = $stateParams.taskId;
            $scope.businessKey = $stateParams.businessKey;
            $scope.appId = $stateParams.appId;
            $scope.workflowKey = $stateParams.workflowKey;
            //$scope.doInitApplyEdit($stateParams.appId);
            $scope.task = LoanQueryService.getTaskByTaskId($stateParams.taskId,$stateParams.workflowKey).$object;
            $scope.expressCompanyList = SysDictService.queryDictDataByTypeCode("kdgs").$object;
            $scope.archiveSupplyInfo = ArchiveService.getArchiveSupplyInfo($scope.taskId).$object;
            //获取原始归档信息
            ArchiveService.getArchiveApplyInfo($scope.businessKey).then(function(response){
                $scope.archiveInfo = response;
                angular.forEach($scope.archiveInfo.detailList,function(item){
                    if(item.recvFileCnt ==null){
                        item.recvFileCnt = item.postFileCnt;
                    }
                })
            });
        };
        //提交档案补充资料任务
        $scope.commitArchiveSupplyTask = function(){
            modal.confirm("操作提醒","确认提交任务").then(function(){
                ArchiveService.commitArchiveSupplyTask($scope.taskId,$scope.archiveSupplyInfo).then(function(){
                    toaster.pop('success', '操作提醒', '提交任务成功 ');
                    $state.go('app.loantask.todolist');
                })
            })
        };
        //提交审批档案补充资料归档任务
        $scope.commitArchiveLogSupplyTask = function(){
            modal.confirm("操作提醒","确认提交任务").then(function(){
                ArchiveService.commitArchiveLogSupplyTask($scope.taskId,$scope.archiveSupplyInfo).then(function(){
                    toaster.pop('success', '操作提醒', '提交任务成功 ');
                    $state.go('app.loantask.todolist');
                })
            })
        };
        //获取历史补充资料信息
        $scope.getHisSupplyInfo = function(){
            $scope.hisSupplyList = ArchiveService.getHisSupplyInfo($scope.businessKey).$object;
        }
        //冲洗提交档案补充资料
        $scope.reArchiveSupply = function(){
            ArchiveService.archiveSupply().then(function(response){
                modal.confirm("操作提醒","确认提交？").then(function(){
                    ArchiveService.reApplyArchiveSupply($scope.taskId,{'oldSupplyVo':$scope.archiveSupplyInfo,'comment':response.comment,'supplyDetailList':response.archiveItemList}).then(function(){
                        toaster.pop('success', '操作提醒', '提交补充归档资料任务成功');
                        $state.go('app.loantask.todolist');
                    })
                })
            })
        };
        //初始化档案借阅
        $scope.initArchiveBorrow = function(){
            $scope.appId = $stateParams.appId;
            $scope.applyBorrwoVo = {};
            $scope.applyBorrwoVo.borrowInfo = {};
            $scope.applyBorrwoVo.detailList = ArchiveService.getArchiveStoreList($scope.appId).$object;
            $scope.fileTypeList = SysDictService.queryDictDataByTypeCode("jyzllx").$object;
        };
        //申请档案借阅
        $scope.applyArchiveBorrow = function(){
            modal.confirm("操作提醒","确认提交？").then(function(response){
                ArchiveService.applyArchiveBorrow($scope.appId,$scope.applyBorrwoVo).then(function(){
                    toaster.pop('success', '操作提醒', '提交申请成功');
                    $state.go("app.loanquery.list");
                })
            })
        };
        //初始化档案借阅审批
        $scope.initArchiveBorrowApprove = function(){
            $scope.procInstId = $stateParams.procInstId;
            $scope.taskId = $stateParams.taskId;
            $scope.businessKey = $stateParams.businessKey;
            $scope.appId = $stateParams.appId;
            $scope.workflowKey = $stateParams.workflowKey;
            $scope.task = LoanQueryService.getTaskByTaskId($stateParams.taskId,$stateParams.workflowKey).$object;
            $scope.fileTypeList = SysDictService.queryDictDataByTypeCode("jyzllx").$object;
            $scope.applyBorrwoVo = ArchiveService.getArchiveBorrowInfo($scope.businessKey).$object;
        };
        //提交档案借阅审批
        $scope.commitApproveArchiveBorrowTask = function(){
            LoanTaskService.inputApproveResult().then(function(response){
                ArchiveService.commitApproveArchiveBorrowTask($scope.taskId,response).then(function(){
                    toaster.pop('success', '操作提醒', '提交任务成功');
                    $state.go('app.loantask.todolist');
                })
            })
        };
        //初始化档案归还
        $scope.initArchiveBorrowReturn = function(){
            $scope.procInstId = $stateParams.procInstId;
            $scope.taskId = $stateParams.taskId;
            $scope.businessKey = $stateParams.businessKey;
            $scope.appId = $stateParams.appId;
            $scope.workflowKey = $stateParams.workflowKey;
            $scope.task = LoanQueryService.getTaskByTaskId($stateParams.taskId,$stateParams.workflowKey).$object;
            $scope.fileTypeList = SysDictService.queryDictDataByTypeCode("jyzllx").$object;
            $scope.applyBorrwoVo = ArchiveService.getArchiveBorrowInfo($scope.businessKey).$object;
        };
        // 提交档案借阅任务
        $scope.commitArchiveBorrowReturnTask = function(){
            modal.confirm("操作提醒","确认提交？").then(function(response){
                ArchiveService.commitArchiveBorrowReturnTask($scope.taskId,$scope.applyBorrwoVo).then(function(){
                    toaster.pop('success', '操作提醒', '提交任务成功');
                    $state.go('app.loantask.todolist');
                })
            })
        };
        //初始化档案借阅退回
        $scope.initArchiveBorrowBack = function(){
            $scope.procInstId = $stateParams.procInstId;
            $scope.taskId = $stateParams.taskId;
            $scope.businessKey = $stateParams.businessKey;
            $scope.appId = $stateParams.appId;
            $scope.workflowKey = $stateParams.workflowKey;
            $scope.task = LoanQueryService.getTaskByTaskId($stateParams.taskId,$stateParams.workflowKey).$object;
            $scope.fileTypeList = SysDictService.queryDictDataByTypeCode("jyzllx").$object;
            ArchiveService.getArchiveStoreList($scope.appId).then(function(response){
                var detailList = response;
                ArchiveService.getArchiveBorrowInfo($scope.businessKey).then(function(response){
                    $scope.applyBorrwoVo = response;
                    var applyDetailList = response.detailList;
                    angular.forEach(detailList,function(item){
                        for(var i =0 ; i<applyDetailList.length; i++){
                            if(item.archiveType == applyDetailList[i].archiveType && item.fileName == applyDetailList[i].fileName){
                                item.borrowCnt = applyDetailList[i].borrowCnt;
                                item.comment = applyDetailList[i].comment;
                                item.fileType = applyDetailList[i].fileType;
                                break;
                            }
                        }
                    });
                    $scope.applyBorrwoVo.detailList = detailList;
                });
            });
        };
        //退回档案借阅申请
        $scope.backArchiveBorrowTask = function(){
            ArchiveService.backTask($scope.taskId).then(function(){
                toaster.pop('success', '操作提醒', '退回任务成功');
                $state.go('app.loantask.todolist');
            })
        };
        //重新提交已退回的档案借阅任务
        $scope.reApplyArchiveBorrow = function(){
            modal.confirm("操作提醒","确认提交？").then(function(response){
                ArchiveService.reApplyArchiveBorrow($scope.taskId,$scope.applyBorrwoVo).then(function(){
                    toaster.pop('success', '操作提醒', '提交任务成功');
                    $state.go('app.loantask.todolist');
                })
            })
        }

    })
;