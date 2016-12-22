'use strict';

/* Controllers */
// signin controllers
angular.module("pu.sms.controllers")
    .controller('SmsTemplateController',function ($scope, $rootScope, $state, toaster, $uibModal,SmsService) {
        $scope.init = function () {
            $scope.getSmsTemplateList();
        };
        $scope.getSmsTemplateList = function(){
            $scope.templateList= SmsService.getSmsTemplateList().$object;
        }
        $scope.addSmsTemplate = function(){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop:'false',
                size:'lg',
                templateUrl :'module_sms/tpl/dialog-template-add.html',
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
                SmsService.addSmsTemplate(response).then(function(){
                    toaster.pop('success', '操作提醒', '增加成功');
                    $scope.getSmsTemplateList();
                })
            })
        };
        $scope.editSmsTemplate = function(item){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop:'false',
                size:'lg',
                templateUrl :'module_sms/tpl/dialog-template-edit.html',
                controller:function($scope,RestApi){
                    $scope.item=item;
                    $scope.ok=function(){
                        SmsService.modifySmsTemplate($scope.item).then(function(){
                            modalInstance.close('修改成功');
                        })
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                toaster.pop('success', '操作提醒', response);
                $scope.getSmsTemplateList();
            })
        };
    })
;