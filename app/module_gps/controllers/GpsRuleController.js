'use strict';

/* Controllers */
// signin controllers
angular.module("pu.gps.controllers")
    .controller('GpsRuleController',function ($scope, $rootScope, $state, toaster, $uibModal,GpsService) {
        $scope.init = function () {
            $scope.queryGpsRuleList();
        };
        $scope.queryGpsRuleList = function(){
            $scope.gpsRuleList= GpsService.queryGpsRuleList(false).$object;
        }
        $scope.addGpsRule = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_gps/tpl/dialog-gpsrule-add.html',
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
                GpsService.addGpsRule(response).then(function(){
                    toaster.pop('success', '操作提醒', '增加成功');
                    $scope.queryGpsRuleList();
                })
            })
        };
        $scope.editGpsRule = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_gps/tpl/dialog-gpsrule-edit.html',
                controller:function($scope,RestApi){
                    $scope.item=item;
                    $scope.ok=function(){
                        GpsService.modifyGpsRule($scope.item).then(function(){
                            modalInstance.close('修改成功');
                        })
                    };
                    $scope.delete = function(){
                        GpsService.deleteGpsRule(item.id).then(function(){
                            modalInstance.close('删除成功');
                        })
                    }
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                toaster.pop('success', '操作提醒', response);
                $scope.queryGpsRuleList();
            })
        };
    })
;