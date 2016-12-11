'use strict';

/* Controllers */
angular.module("pu.assetsmanage.controllers")
    .controller('ArchiveController',function ($scope, $rootScope, $state,$stateParams, toaster,modal, $uibModal,ArchiveService,LoanQueryService,SysDictService,SysAreaService,InsManageService) {
        $scope.initArchiveClear = function(){
            ArchiveService.getArchiveToDoTaskList().then(function(response){
               $scope.taskList = response;
               $scope.items=response;
               $scope.checkSelected($scope.items);
           });
        };
        $scope.printArchiveCheckInfo = function(item){
            ArchiveService.printArchiveCheckInfo(item.archiveTaskId).then(function(){
                toaster.pop('success', '操作提醒', "保存明细成功");
                $scope.initArchiveClear();
            })
        };
        $scope.printPostList = function(){
          console.log($scope.items);
        };
        $scope.selectAll=function(){
            for(var i=0;i<$scope.items.length;i++){
                $scope.items[i].checked=$scope.selectall;
                $scope.addToSelected($scope.items[i]);
            }
        };
        $scope.updateAllSelect=function(items){
        };
        $scope.addToSelected=function(item){
            if(!angular.isDefined($scope.selected)){
                $scope.selected=[];
            }
            for(var i=0;i<$scope.selected.length;i++){
                if(item.archiveTaskId==$scope.selected[i].archiveTaskId){
                    if(item.checked==false){
                        $scope.selected.splice(i,1);
                        $scope.selectall=false;
                        $scope.updateAllSelect($scope.items);
                        return ;
                    }else{
                        $scope.updateAllSelect($scope.items);
                        return;
                    }
                }
            };
            $scope.selected.push(item)
            $scope.updateAllSelect($scope.items);
        };
        $scope.checkSelected=function(items){
            if(!angular.isDefined($scope.selected)){
                $scope.selected=[];
            };
            for(var i=0;i<items.length;i++){
                for(var j=0;j<$scope.selected.length;j++){
                    if(items[i].id==$scope.selected[j].id){
                        items[i].checked=true;
                    }
                }
            };
            $scope.updateAllSelect($scope.items);
        };
        $scope.archivePost = function(){
            var selArchiveTaskIds = [];
            angular.forEach($scope.items,function(item){
                if(item.checked){
                    selArchiveTaskIds.push(item.archiveTaskId);
                }
            });
            ArchiveService.archivePost(selArchiveTaskIds).then(function(response){
                toaster.pop('success', '操作提醒', "保存邮寄信息成功");
                $scope.initArchiveClear();
            })
        };
        $scope.initArchiveList = function(){
            $scope.archiveList = ArchiveService.getArchiveList().$object;
        };
        $scope.archiveDelay = function(item){
            ArchiveService.archiveDelay(item.archiveTaskId).then(function(){
                toaster.pop('success', '操作提醒', "保存延期信息成功");
                $scope.initArchiveList();
            })
        };
        $scope.applyArchiveLog = function(){
            var selArchiveTaskIds = [];
            angular.forEach($scope.items,function(item){
                if(item.checked){
                    selArchiveTaskIds.push({'taskId':item.taskId,'archiveTaskId':item.archiveTaskId});
                }
            });
            modal.confirm("操作提醒","确认提交归档申请").then(function(response){
                ArchiveService.applyArchiveLog(selArchiveTaskIds).then(function(){
                    toaster.pop('success', '操作提醒', "提交任务成功");
                    $scope.initArchiveClear();
                })
            })
        };
        $scope.initLoanArchiveLog = function(){
            $scope.procInstId = $stateParams.procInstId;
            $scope.taskId = $stateParams.taskId;
            $scope.businessKey = $stateParams.businessKey;
            $scope.appId = $stateParams.appId;
            $scope.workflowKey = $stateParams.workflowKey;
            $scope.doInitApplyEdit($stateParams.appId);
            $scope.task = LoanQueryService.getTaskByTaskId($stateParams.taskId,$stateParams.workflowKey).$object;
            $scope.archiveInfo = ArchiveService.getArchiveApplyInfo($scope.businessKey).$object;
        }
        $scope.initInsuranceContinue = function(){
            $scope.baseInfoVo = LoanQueryService.getLoanCustApplyInfo($scope.appId).$object;
            $scope.insHisList = InsManageService.getInsuranceHisList($scope.appId).$object;
        };
        $scope.addBusinessInsurance = function(item){
            InsManageService.addBusinessInsurance($scope.appId,item.signId,"bxlx02").then(function(response){
                toaster.pop('success', '操作提醒', '新增保险信息成功 ');
                $scope.insHisList = InsManageService.getInsuranceHisList($scope.appId).$object;
            })
        };
        $scope.commitArchiveLog = function(){
            modal.confirm("操作提醒","确认提交").then(function(){
                ArchiveService.commitArchiveLog($scope.taskId,$scope.archiveInfo).then(function(){
                    toaster.pop('success', '操作提醒', '提交任务成功 ');
                    $state.go('app.loantask.todolist');
                })
            })
        }
    })
;