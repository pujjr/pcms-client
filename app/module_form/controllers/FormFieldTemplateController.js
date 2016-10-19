'use strict';

/* Controllers */
// signin controllers
angular.module("pu.form.controllers")
    .controller('FormFieldTemplateController',function ($scope, $rootScope, $state, toaster, $uibModal,FormService,ToolsService) {
        $scope.init = function () {
            $scope.queryFormFieldTemplateList();
        };
        $scope.queryFormFieldTemplateList = function(){
            $scope.formFieldTemplateList= FormService.queryFormFieldTemplateList(false).$object;
        }
        $scope.addFormFieldTemplate = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_form/tpl/dialog-formFieldTemplate-add.html',
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
                FormService.addFormFieldTemplate(response).then(function(){
                    toaster.pop('success', '操作提醒', '增加成功');
                    $scope.queryFormFieldTemplateList();
                })
            })
        };
        $scope.editFormFieldTemplate = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_form/tpl/dialog-formFieldTemplate-edit.html',
                controller:function($scope,RestApi){
                    $scope.item=item;
                    $scope.ok=function(){
                        FormService.modifyFormFieldTemplate($scope.item).then(function(){
                            modalInstance.close('修改成功');
                        })
                    };
                    $scope.delete = function(){
                        FormService.deleteFormFieldTemplate(item.id).then(function(){
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
                $scope.queryFormFieldTemplateList();
            })
        };
        $scope.configTemplateRequiredField = function(tplId){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                resolve:{
                    tplId:function(){
                        return tplId;
                    }
                },
                size:'lg',
                templateUrl :'module_form/tpl/dialog-template-required-field.html',
                controller:function($scope,RestApi,tplId){
                    $scope.tplId=tplId;
                    FormService.queryFormFieldList().then(function(response){
                       $scope.formFieldList = response;
                       FormService.queryTemplateRequiredFormFileList($scope.tplId).then(function(response){
                           $scope.templateRequiredFieldList = response;
                           angular.forEach($scope.formFieldList,function(item){
                               for(var i = 0 ;i<$scope.templateRequiredFieldList.length;i++){
                                   if($scope.templateRequiredFieldList[i].id == item.id){
                                       item.checked=true;
                                       break;
                                   }
                               }
                           })
                           $scope.formFieldTree = ToolsService.convertArrayToTree($scope.formFieldList,{
                               idKey: 'id',
                               parentKey: 'parentId',
                               childrenKey: 'children'
                           });
                       })

                    });
                    $scope.ok=function(){
                        var checkList = ToolsService.getTreeCheckedList($scope.formFieldTree);
                        FormService.saveTemplateRequiredFormField($scope.tplId,checkList).then(function(){
                            modalInstance.close('操作成功');
                        })
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                toaster.pop('success', '操作提醒', response);
                $scope.initConfigTemplateCategory();
            })
        };
    })
;