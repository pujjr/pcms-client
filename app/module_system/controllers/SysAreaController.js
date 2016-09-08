'use strict';

/* Controllers */
// signin controller
angular.module("pu.system.controllers")
    .controller('SysAreaController',function ($scope, $rootScope, $state, toaster, $uibModal,SysAreaService,ToolsService) {
        $scope.init = function () {
            SysAreaService.querySysAreaList().then(function(response){
                $scope.sysAreaTree=ToolsService.convertArrayToTree(response, {
                    idKey: 'id',
                    parentKey: 'parentId',
                    childrenKey: 'children'
                });
            });
        };
        $scope.addSysArea = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_workflow/tpl/dialog-add-sysarea.html',
                controller:function($scope,RestApi){
                    $scope.sysArea={};
                    $scope.sysAreas =  SysAreaService.querySysAreaList().$object;
                    $scope.ok=function(){
                        modalInstance.close($scope.workflowDefine);
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                RestApi.all("/workflow/create").post(response).then(function(response){
                    toaster.pop('success', '操作提醒', '增加流程成功');
                    $scope.workflowDefines =  WorkflowService.queryWorkflowDefines($scope.selType.id).$object;
                })
            })
        }
    })
;