'use strict';

/* Controllers */
// signin controllers
angular.module("pu.file.controllers")
    .controller('TemplateController',function ($scope, $rootScope, $state, $stateParams,toaster, $uibModal,TemplateService,
                                               DirectoryService,
                                               CategoryService,
                                               ToolsService) {
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
        $scope.initConfigTemplateDirectory = function(){
           DirectoryService.queryDirectoryList(true).then(function(response){
               $scope.enabledDirList = response;
               DirectoryService.queryDirectoryByTemplateId($stateParams.tplId).then(function(response){
                    angular.forEach(response,function(item){
                        for(var i=0;i<$scope.enabledDirList.length;i++){
                            if($scope.enabledDirList[i].id==item.id){
                                $scope.enabledDirList[i].checked=true;
                                break;
                            }
                        }
                    });
                   $scope.enabledDirTree = ToolsService.convertArrayToTree($scope.enabledDirList,{
                       idKey: 'id',
                       parentKey: 'parentId',
                       childrenKey: 'children'
                   });

               })
           })
        };
        $scope.saveTemplateDirectory = function(){
            var checkDirList = ToolsService.getTreeCheckedList($scope.enabledDirTree);
            TemplateService.saveTemplateDirectory($stateParams.tplId,checkDirList).then(function(){
                toaster.pop('success', '操作提醒', '保存成功');
                $state.go(
                    'app.template.config-step2',
                    {
                        'tplId':$stateParams.tplId
                    }
                )
            })
        };
        $scope.initConfigTemplateCategory = function(){
            $scope.templateCategoryList =  CategoryService.queryCategoryByTemplateId($stateParams.tplId).$object;
        };
        $scope.addTemplateCategory = function(){
            var tplId = $stateParams.tplId;
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                resolve:{
                    tplId:function(){
                        return tplId;
                    }
                },
                templateUrl :'module_file/tpl/dialog-template-category-add.html',
                controller:function($scope,RestApi,tplId){
                    $scope.tplId=tplId;
                    CategoryService.queryCategoryByTemplateId($scope.tplId).then(function(response){
                        $scope.selectTemplateCategoryList = response;
                    });
                    $scope.categoryList = CategoryService.queryCategoryList().$object;

                    $scope.ok=function(){
                        TemplateService.saveTemplateCategory($scope.tplId,$scope.selectTemplateCategoryList).then(function(){
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
        }
        $scope.configTemplateCategoryDir = function(categoryId){
            var tplId = $stateParams.tplId;
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                resolve:{
                    tplId:function(){
                        return tplId;
                    },
                    categoryId:function(){
                        return categoryId;
                    }
                },
                templateUrl :'module_file/tpl/dialog-template-category-dir-add.html',
                controller:function($scope,RestApi,tplId,categoryId){
                    $scope.tplId=tplId;
                    $scope.categoryId = categoryId;
                    DirectoryService.queryDirectoryByTemplateId($scope.tplId).then(function(response){
                        $scope.templateDirList = response;
                        TemplateService.queryTemplateCategoryInfo($scope.tplId,$scope.categoryId).then(function(response){
                            $scope.templateCategoryVo = response;
                            angular.forEach($scope.templateCategoryVo.templateCategoryDirs,function(item){
                                for(var i=0;i<$scope.templateDirList.length;i++){
                                    if($scope.templateDirList[i].id==item.id){
                                        $scope.templateDirList[i].checked=true;
                                        break;
                                    }
                                }
                            });
                            $scope.templateDirTree = ToolsService.convertArrayToTree($scope.templateDirList,{
                                idKey: 'id',
                                parentKey: 'parentId',
                                childrenKey: 'children'
                            });
                        })
                    });

                    $scope.ok=function(){
                        var checkList = ToolsService.getTreeCheckedList($scope.templateDirTree);
                        TemplateService.saveTemplateCategoryDir($scope.tplId,$scope.categoryId,checkList).then(function(){
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
        $scope.configTemplateCategoryRequiredDir = function(categoryId){
            var tplId = $stateParams.tplId;
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                resolve:{
                    tplId:function(){
                        return tplId;
                    },
                    categoryId:function(){
                        return categoryId;
                    }
                },
                templateUrl :'module_file/tpl/dialog-template-category-required-dir-add.html',
                controller:function($scope,RestApi,tplId,categoryId){
                    $scope.tplId=tplId;
                    $scope.categoryId = categoryId;
                    TemplateService.queryTemplateCategoryInfo($scope.tplId,$scope.categoryId).then(function(response){
                        $scope.templateCategoryVo = response;
                        angular.forEach($scope.templateCategoryVo.templateCategoryRequireDirs,function(item){
                            for(var i=0;i<$scope.templateCategoryVo.templateCategoryDirs.length;i++){
                                if($scope.templateCategoryVo.templateCategoryDirs[i].id==item.id){
                                    $scope.templateCategoryVo.templateCategoryDirs[i].checked=true;
                                    break;
                                }
                            }
                        });
                        $scope.templateDirTree = ToolsService.convertArrayToTree($scope.templateCategoryVo.templateCategoryDirs,{
                            idKey: 'id',
                            parentKey: 'parentId',
                            childrenKey: 'children'
                        });
                    })

                    $scope.ok=function(){
                        var checkList = ToolsService.getTreeCheckedList($scope.templateDirTree);
                        TemplateService.saveTemplateCategoryRequestDir($scope.tplId,$scope.categoryId,checkList).then(function(){
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
        $scope.backToStep1 = function(){
            $state.go(
                'app.template.config-step1',
                {
                    'tplId':$stateParams.tplId
                }
            )
        }
    })
;