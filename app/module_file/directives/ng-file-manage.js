'use strict';

/**
 * @ngdoc directive
 * @name widgetApp.directive:tree
 * @description
 * # tree
 */
angular.module('pu.utils.directives')
    .directive('ngFileManage', function ($compile,FileService,ToolsService,modal,$uibModal) {
        return {
            restrict: "E",
            scope:{
                onInit:'&'
            },
            templateUrl:'module_file/tpl/directory-file-manage.html',
            link:function($scope,element,attrs){
                $scope.init = function(businessId,categoryKey,uploadOptions,authOptions){
                    $scope.businessId = businessId;
                    $scope.categoryKey = categoryKey;
                    $scope.uploadOptions = uploadOptions;
                    $scope.authOptions = authOptions;
                    $scope.readDir();
                };
                $scope.reInit = function(){
                    $scope.readDir();
                }
                $scope.onInit(
                    {
                        interface:{
                            init:$scope.init
                        }
                    }
                )
                $scope.readDir = function(){
                    FileService.queryApplyFormCategoryDirectoryList($scope.businessId,$scope.categoryKey).then(function(response){
                        $scope.dirTree=ToolsService.convertArrayToTree(response, {
                            idKey: 'dirId',
                            parentKey: 'parentId',
                            childrenKey: 'children',
                            ignoreTopLevel:true
                        });
                        $scope.readTopDirFileList($scope.dirTree.dirId);
                    });
                };
                /**选择目录**/
                $scope.selectDir = function(item){
                    $scope.readTopDirFileList(item.dirId);
                };
                $scope.readTopDirFileList = function(dirId){
                    FileService.listFile($scope.businessId,dirId).then(function(response){
                        $scope.fileList = response;
                        angular.forEach($scope.fileList,function(item){
                            item.imgUrl = URL.FILE_DOWNLOAD_URL+item.id;
                        });
                        $scope.fileShowGrid = FileService.convertToGird($scope.fileList,4);
                    })
                }
                /**上传文件**/
                $scope.fileUpload = function(){
                    FileService.uploadFile($scope.businessId,$scope.dirTree.dirId).then(function(){
                        $scope.reInit();
                    },function(){
                        $scope.reInit();
                    });
                };
                /**转移文件**/
                $scope.moveFile = function(){
                    var selectedItem = [];
                    angular.forEach($scope.fileList,function(item){
                        if(item.selected==true){
                            selectedItem.push(item);
                        }
                    });
                    console.log(selectedItem);
                    if(selectedItem.length==0){
                        modal.info('操作提醒','请选择至少一个文件');
                        return;
                    }
                    FileService.showSelectDirDialog($scope.dirTree).then(function(response){
                        console.log(response);

                        modal.confirm('操作提醒','确认转移文件').then(function(){
                            FileService.batchMoveFileToDir(response.dirId,selectedItem).then(function(response){
                                $scope.reInit();
                            })
                        })
                    })
                };
                $scope.zoomInImage = function(item,fileList){
                    var modalInstance = $uibModal.open({
                        animation: true,
                        backdrop:'false',
                        size:'lg',
                        resolve:{
                            item:function(){
                                return item;
                            },
                            fileList:function(){
                                return fileList;
                            }
                        },
                        templateUrl :'module_file/tpl/dialog-image-zoom-in.html',
                        controller:function($scope,item,fileList){
                            $scope.rotate=0;
                            $scope.item=item;
                            $scope.fileList = fileList;
                            $scope.endIdx = fileList.length-1;
                            for(var i = 0;i<fileList.length;i++){
                                if(item.id == fileList[i].id){
                                    $scope.curIdx = i ;
                                    $scope.imgUrl = fileList[i].imgUrl;
                                    break;;
                                }
                            }
                            $scope.ok=function(){
                                modalInstance.close();
                            };
                            $scope.prevView = function(){
                                $scope.rotate=0;
                                $scope.imgUrl = fileList[--$scope.curIdx].imgUrl;
                            }
                            $scope.nextView = function(){
                                $scope.rotate=0;
                                $scope.imgUrl = fileList[++$scope.curIdx].imgUrl;
                            }
                            $scope.rotateLeft = function(){
                                if($scope.rotate==0){
                                    $scope.rotate=270;
                                }else{
                                    $scope.rotate -=90;
                                }

                            }
                            $scope.rotateRight = function(){
                                if($scope.rotate==360){
                                    $scope.rotate=90;
                                }else{
                                    $scope.rotate+= 90;
                                }
                            }
                            $scope.cancel = function () {
                                modalInstance.dismiss('cancel');
                            };
                        }
                    });
                }
            }
        };
    });
