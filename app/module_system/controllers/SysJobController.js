'use strict';

/* Controllers */
// signin controllers
angular.module("pu.system.controllers")
    .controller('SysJobController',function ($scope, $rootScope, $state, toaster, $uibModal,SysJobService) {
        $scope.init = function () {
            $scope.querySysJobList();
        };
        $scope.querySysJobList = function(){
            $scope.sysJobList= SysJobService.querySysJobList().$object;
        }
        $scope.addSysJob = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_system/tpl/dialog-sysjob-add.html',
                controller:function($scope,RestApi){
                    $scope.item={};
                    $scope.ok=function(){
                        modalInstance.close($scope.item);
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                SysJobService.addSysJob(response).then(function(){
                    toaster.pop('success', '操作提醒', '增加岗位成功');
                    $scope.querySysJobList();
                })
            })
        };
        $scope.eidtSysJob = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_system/tpl/dialog-sysjob-edit.html',
                controller:function($scope,RestApi){
                    $scope.item=item;
                    $scope.ok=function(){
                        modalInstance.close($scope.item);
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                SysJobService.modifySysJob(response).then(function(){
                    toaster.pop('success', '操作提醒', '修改岗位成功');
                    $scope.querySysJobList();
                })
            })
        };
        $scope.deleteSysJob = function(id){
            SysJobService.deleteSysJob(id).then(function(){
                toaster.pop('success', '操作提醒', '删除岗位成功');
                $scope.querySysJobList();
            })
        }
    })
;