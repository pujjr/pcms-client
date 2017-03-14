'use strict';

/**
 * @ngdoc directive
 * @name widgetApp.directive:tree
 * @description
 * # tree
 */
angular.module('pu.utils.directives')
    .directive('ngFileManage', function ($compile,FileService,ToolsService,modal,$uibModal,toaster,$window,$sce) {
        return {
            restrict: "E",
            scope:{
                onInit:'&',
                options:'='
            },
            templateUrl:'module_file/tpl/directory-file-manage.html',
            link:function($scope,element,attrs){
                $scope.options = $scope.options || {};
                if($scope.options.enableMove == undefined){
                    $scope.options.enableMove = true;
                };
                if($scope.options.enableUpload == undefined){
                    $scope.options.enableUpload = true;
                };
                if($scope.options.enableDelete == undefined){
                    $scope.options.enableDelete = true;
                }
                $scope.enableMove = $scope.options.enableMove;
                $scope.enableUpload = $scope.options.enableUpload;
                $scope.enableDelete = $scope.options.enableDelete;
                $scope.init = function(businessId,categoryKey,uploadOptions){
                    $scope.businessId = businessId;
                    $scope.categoryKey = categoryKey;
                    $scope.uploadOptions = uploadOptions;
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
                /**初始化界面高度和宽度**/
                $scope.innerWidth = $window.innerWidth;
                $scope.innerHeight = $window.innerHeight;
                $scope.imgContainerCss = {
                    height:($scope.innerHeight - 190)+'px',
                    top: 0+'px',
                    bottom: 1+'px',
                    left: 0+'px'
                }
                var heightNum = ($scope.innerHeight - 260);
                var height = heightNum+'px';
                $scope.leftStyle = {
                    width:$scope.innerWidth-200-0.25*$scope.innerWidth+'px',
                    height:height
                };
                $scope.rightStyle = {
                    position: 'relative',
                    'overflow-x': 'hidden',
                    width:200+'px',
                    height:height
                };
                $scope.prevSlide = {
                    'max-height':height,
                    'overflow-x': 'hidden',
                    'overflow-y': 'auto',
                    'margin-left':'-30px',
                    'margin-right':'-30px'
                };
                $scope.contentDivStyle = {
                    height: height,
                    'overflow-y': 'hidden',
                    'overflow-x': 'hidden'
                };
                $scope.scale = 1;
                $scope.offsetX = 0;
                $scope.offsetY = 0;
                $scope.rotate = 0;
                $scope.imgStyle = {
                    'max-width':$scope.innerWidth-200-0.25*$scope.innerWidth-100+'px',
                    'max-height':height,
                    'padding-bottom':10+'px',
                    'padding-left':10+'px',
                    'padding-right':10+'px',
                    'overflow-y': 'hidden',
                    'transform':'scale('+$scope.scale+') translate('+$scope.offsetX+'px,'+$scope.offsetY+'px)'+'rotate(-'+$scope.rotate+'deg)',
                    '-webkit-transform':'scale('+$scope.scale+') translate('+$scope.offsetX+'px,'+$scope.offsetY+'px)'+'rotate(-'+$scope.rotate+'deg)',
                    'filter':'progid:DXImageTransform.Microsoft.BasicImage(rotation=3)'
                };
                $scope.pdfStyle={
                    width:$scope.innerWidth-200-0.25*$scope.innerWidth-100+'px',
                    height:height,
                    'padding-bottom':10+'px',
                    'padding-left':10+'px',
                    'padding-right':10+'px',
                    'overflow-y': 'auto'
                };
                $scope.zoomOutHandle = function(){
                    $scope.scale+=0.1;
                    //$scope.offsetX += ($scope.innerWidth-200-0.25*$scope.innerWidth-100)*0.05;
                    //$scope.offsetY += heightNum*0.1;
                    $scope.imgStyle['transform']='scale('+$scope.scale+') translate('+$scope.offsetX+'px,'+$scope.offsetY+'px)'+'rotate(-'+$scope.rotate+'deg)';
                    $scope.imgStyle['-webkit-transform']='scale('+$scope.scale+') translate('+$scope.offsetX+'px,'+$scope.offsetY+'px)'+'rotate(-'+$scope.rotate+'deg)';
                };
                $scope.zoomInHandle = function(){
                    if($scope.scale-0<0.0001) {
                        return;
                    }
                    $scope.scale-=0.1;
                    //$scope.offsetX -= ($scope.innerWidth-200-0.25*$scope.innerWidth-100)*0.05;
                    //$scope.offsetY -= heightNum*0.1;
                    $scope.imgStyle['transform']='scale('+$scope.scale+') translate('+$scope.offsetX+'px,'+$scope.offsetY+'px)'+'rotate(-'+$scope.rotate+'deg)';
                    $scope.imgStyle['-webkit-transform']='scale('+$scope.scale+') translate('+$scope.offsetX+'px,'+$scope.offsetY+'px)'+'rotate(-'+$scope.rotate+'deg)';
                }
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
                    $scope.isViewModel = false;
                    $scope.readTopDirFileList(item.dirId);
                };
                $scope.readTopDirFileList = function(dirId){
                    FileService.listFile($scope.businessId,dirId).then(function(response){
                        $scope.fileList = response;
                        angular.forEach($scope.fileList,function(item){
                            item.imgUrlPrev = SERVER_URL.OSS_URL+item.ossKeyPreview;
                            item.imgUrlOrigin = SERVER_URL.OSS_URL+ item.ossKey;
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
                $scope.deleteFile = function(fileId){
                    modal.confirm('操作提醒','是否删除文件').then(function(){
                        FileService.deleteFile(fileId).then(function(){
                            toaster.pop('success', '操作提醒','保存申请信息成功');
                            $scope.reInit();
                        });
                    })
                };
                $scope.appendToEl = angular.element(document.querySelector('#img-container'));

                /**点击图片进入查看模式**/
                $scope.zoomIn = function(item){
                    $scope.isViewModel = true;
                    $scope.isInitViewModel = false;
                    if(item.fileType =='.pdf'){
                        $scope.srcType ='pdf';
                    }else{
                        $scope.srcType = 'img';
                    }
                    $scope.imgUrlOrigin = item.imgUrlOrigin;
                   var contentEle = angular.element(document.querySelector('#contentDiv'));
                   contentEle.remove();
                    $scope.showOriginSrc(item);
                };
                $scope.clickShowOriginSrc = function(item){
                    $scope.isInitViewModel = true;
                    $scope.showOriginSrc(item);
                }
                /**图片查看模式查看大图**/
                $scope.showOriginSrc = function(item){
                    angular.forEach($scope.fileList,function(item){
                        item.selected=false;
                    })
                    item.selected =true;
                    //移除子节点
                    var contentEle = angular.element(document.querySelector('#contentDiv'));
                    var pdfEle = angular.element(document.querySelector('#pdfEle'));
                    var imgEle = angular.element(document.querySelector('#imgEle'));
                    var wordEle = angular.element(document.querySelector('#wordEle'));
                    pdfEle.remove();
                    imgEle.remove();
                    wordEle.remove();
                    //重置CSS参数
                    $scope.scale = 1;
                    $scope.offsetX = 0;
                    $scope.offsetY = 0;
                    $scope.rotate = 0;
                    $scope.imgStyle['transform']='scale('+$scope.scale+') translate('+$scope.offsetX+'px,'+$scope.offsetY+'px)'+'rotate(-'+$scope.rotate+'deg)';
                    $scope.imgStyle['-webkit-transform']='scale('+$scope.scale+') translate('+$scope.offsetX+'px,'+$scope.offsetY+'px)'+'rotate(-'+$scope.rotate+'deg)';
                    $scope.imgUrlOrigin = item.imgUrlOrigin;
                    if(item.fileType =='.pdf'){
                        $scope.srcType ='pdf';
                        var pdfHtml = '<embed embed-src="{{imgUrlOrigin}}" id="pdfEle"  type="application/pdf" ng-style="pdfStyle"/>';
                        var pdfTemplate = angular.element(pdfHtml);
                        var pdfElement = $compile(pdfTemplate)($scope);
                        contentEle.append(pdfElement);
                    }else if(item.fileType =='.docx' ||
                            item.fileType =='.doc' ||
                            item.fileType =='.xlsx'||
                            item.fileType =='.xls' ||
                            item.fileType =='.pptx'||
                            item.fileType =='.ppt'
                    ){
                        $scope.srcType ='mswd';
                        $scope.imgUrlOrigin = 'https://view.officeapps.live.com/op/view.aspx?src='+$scope.imgUrlOrigin;
                        var wordHtml = '<iframe src="'+$scope.imgUrlOrigin+'" ng-style="pdfStyle" id="wordEle"/>';
                        var wordTemplate = angular.element(wordHtml);
                        var wordElement = $compile(wordTemplate)($scope);
                        contentEle.append(wordElement);
                    }else{
                        $scope.srcType ='img';
                        var imgHtml = '<div draggable-div=""  ng-mouse-wheel-up="zoomInHandle()" ng-mouse-wheel-down="zoomOutHandle()"><img  ng-src="{{imgUrlOrigin}}"   id="imgEle" ng-style="imgStyle" class="img-responsive"/></div>';
                        var imgTemplate = angular.element(imgHtml);
                        var imgElement = $compile(imgTemplate)($scope);
                        contentEle.append(imgElement);
                    }
                }
                $scope.$getNodeCss = function(item){
                    if( item.selected){
                        return 'img-select';
                    }
                }
                /**设置图片查看模式**/
                $scope.setViewModel = function(model){
                    if(model == 'grid'){
                        $scope.isViewModel = false;
                    }else{
                        $scope.isViewModel = true;
                    }
                };
                /**旋转图片**/
                $scope.rotateLeft = function(){
                    if($scope.rotate==0){
                        $scope.rotate=270;
                    }else{
                        $scope.rotate -=90;
                    }
                    $scope.imgStyle['transform']='scale('+$scope.scale+') translate('+$scope.offsetX+'px,'+$scope.offsetY+'px)'+'rotate(-'+$scope.rotate+'deg)';
                    $scope.imgStyle['-webkit-transform']='scale('+$scope.scale+') translate('+$scope.offsetX+'px,'+$scope.offsetY+'px)'+'rotate(-'+$scope.rotate+'deg)';
                }
                $scope.rotateRight = function(){
                    if($scope.rotate==360){
                        $scope.rotate=90;
                    }else{
                        $scope.rotate+= 90;
                    }
                    $scope.imgStyle['transform']='scale('+$scope.scale+') translate('+$scope.offsetX+'px,'+$scope.offsetY+'px)'+'rotate(-'+$scope.rotate+'deg)';
                    $scope.imgStyle['-webkit-transform']='scale('+$scope.scale+') translate('+$scope.offsetX+'px,'+$scope.offsetY+'px)'+'rotate(-'+$scope.rotate+'deg)';
                }
                /**弹出框模式放大图片**/
                $scope.zoomInImage = function(item,fileList){
                    var modalInstance = $uibModal.open({
                        animation: true,
                        backdrop:'static',
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
                                    $scope.imgUrlOrigin = fileList[i].imgUrlOrigin;
                                    break;;
                                }
                            }
                            $scope.ok=function(){
                                modalInstance.close();
                            };
                            $scope.prevView = function(){
                                $scope.rotate=0;
                                $scope.imgUrlOrigin = fileList[--$scope.curIdx].imgUrlOrigin;
                            }
                            $scope.nextView = function(){
                                $scope.rotate=0;
                                $scope.imgUrlOrigin = fileList[++$scope.curIdx].imgUrlOrigin;
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
