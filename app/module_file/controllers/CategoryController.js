'use strict';

/* Controllers */
// signin controllers
angular.module("pu.file.controllers")
    .controller('CategoryController',function ($scope, $rootScope, $state, toaster, $uibModal,CategoryService,ToolsService) {
        $scope.init = function () {
            $scope.queryCategoryList();
        };
        $scope.queryCategoryList = function(){
            $scope.categoryList= CategoryService.queryCategoryList().$object;
        }
        $scope.addCategory = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_file/tpl/dialog-category-add.html',
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
                CategoryService.addCategory(response).then(function(){
                    toaster.pop('success', '操作提醒', '增加成功');
                    $scope.queryCategoryList();
                })
            })
        };
        $scope.editCategory = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_file/tpl/dialog-category-edit.html',
                controller:function($scope,RestApi){
                    $scope.item=item;
                    $scope.ok=function(){
                        CategoryService.modifyCategory($scope.item).then(function(){
                            modalInstance.close('修改成功');
                        })
                    };
                    $scope.delete = function(){
                        CategoryService.deleteCategory(item.id).then(function(){
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
                $scope.queryCategoryList();
            })
        };
    })
;