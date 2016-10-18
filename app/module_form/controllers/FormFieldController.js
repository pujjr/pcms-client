'use strict';

/* Controllers */
// signin controllers
angular.module("pu.form.controllers")
    .controller('FormFieldController',function ($scope, $rootScope, $state, toaster, $uibModal,FormService,SysDictService,ToolsService) {
        $scope.init = function () {
            $scope.queryFormFieldList();
        };
        $scope.queryFormFieldList = function(){
            FormService.queryFormFieldList().then(function(response){
                $scope.formFieldTree=ToolsService.convertArrayToTree(response, {
                    idKey: 'id',
                    parentKey: 'parentId',
                    childrenKey: 'children'
                });
            });
        };
        $scope.select = function(item){
            $scope.selNode = item;
            $scope.childFormFieldList = FormService.queryChildFormFieldList(item.id).$object;
        }
        $scope.addFormField = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_form/tpl/dialog-field-add.html',
                controller:function($scope,RestApi){
                    $scope.item={};
                    $scope.formFieldList = FormService.queryFormFieldList().$object;
                    $scope.ok=function(){
                        modalInstance.close($scope.item);
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                FormService.addFormField(response).then(function(){
                    toaster.pop('success', '操作提醒', '增加成功');
                    $scope.queryFormFieldList();
                })
            })
        };
        $scope.editFormField = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                resolve: {
                    item: function(){
                        return item;
                    }
                },
                templateUrl :'module_form/tpl/dialog-field-edit.html',
                controller:function($scope,RestApi){
                    $scope.item=item;
                    $scope.formFieldList = FormService.queryFormFieldList().$object;
                    $scope.ok=function(){
                        FormService.modifyFormField($scope.item).then(function(){
                            modalInstance.close('修改成功');
                        })
                    };
                    $scope.delete = function(){
                        FormService.deleteFormField(item.id).then(function(){
                            modalInstance.close('删除成功');
                        })
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                toaster.pop('success', '操作提醒',response );
                $scope.queryFormFieldList();
            })
        };
    })
;