'use strict';

/* Controllers */
// signin controllers
angular.module("pu.file.controllers")
    .controller('TemplateController',function ($scope, $rootScope, $state, toaster, $uibModal,TemplateService,ToolsService) {
        $scope.init = function () {
            $scope.queryTemplateList();
        };
        $scope.queryTemplateList = function(){
            $scope.templateList= TemplateService.queryTemplateList(false).$object;
        }
        $scope.addTemplate = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_file/tpl/dialog-template-add.html',
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
                TemplateService.addTemplate(response).then(function(){
                    toaster.pop('success', '操作提醒', '增加成功');
                    $scope.queryTemplateList();
                })
            })
        };
        $scope.editTemplate = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_file/tpl/dialog-template-edit.html',
                controller:function($scope,RestApi){
                    $scope.item=item;
                    $scope.ok=function(){
                        TemplateService.modifyTemplate($scope.item).then(function(){
                            modalInstance.close('修改成功');
                        })
                    };
                    $scope.delete = function(){
                        TemplateService.deleteTemplate(item.id).then(function(){
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
                $scope.queryTemplateList();
            })
        };
    })
;