angular.module('pu.file.services')
    .service("FileService",function($window,RestApi,$uibModal,FileUploader,modal){
        this.queryApplyFormCategoryDirectoryList = function(appId,categoryKey){
            return RestApi.all("/file/getApplyFormCategoryDirectoryList").all(appId).all(categoryKey).getList();
        };
        this.listFile = function(businessId,dirId){
            return RestApi.all("/file/listFile").all(businessId).all(dirId).getList();
        };
        this.convertToGird = function(fileList,colsize){
            if(colsize == undefined){
                colsize=4;
            }
            var fileRow = [];
            var fileCol = [];
            for(var i = 0; i<fileList.length;i++){
                fileCol.push(fileList[i]);
                if((i+1)%colsize==0){
                    fileRow.push(fileCol);
                    fileCol=[];
                };
                if((i+1)==fileList.length){
                    fileRow.push(fileCol);
                }
            }
            return fileRow;
        };
        this.showSelectDirDialog = function(dirTree){
            var $uibModalInstance = $uibModal.open({
                animation: true,
                backdrop: true,
                resolve:{
                  dirTree:function(){
                      return dirTree;
                  }
                },
                templateUrl: 'module_file/tpl/dialog-select-dir.html',
                controller: function ($scope) {
                    $scope.dirTree = dirTree;
                    $scope.ok = function(item) {
                        $uibModalInstance.close($scope.selNode);
                    };
                    $scope.selected = function(item){
                        $scope.selNode = item;
                    };
                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                size: 'md'
            });
            return $uibModalInstance.result;
        };
        this.batchMoveFileToDir = function(dirId,selectFileList){
            return RestApi.all("/file/batchMoveFileToDir").all(dirId).post(selectFileList);
        };
        this.uploadFile = function(businessId,dirId){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'static',
                size:'lg',
                templateUrl :'module_file/tpl/dialog-uploadFile.html',
                controller:function($scope){
                    $scope.fileGirdColSize = 4;
                    $scope.uploader = new FileUploader({
                        url:URL.FILE_UPLOAD_URL+businessId+"/"+dirId,
                        headers:{
                            'Authorization': window.localStorage.Authorization
                        },
                        removeAfterUpload:true
                    });
                    $scope.deleteFileItem = function(fileItem){
                        $scope.uploader.removeFromQueue(fileItem);
                        $scope.initFileGrid();
                    }
                    $scope.initFileGrid = function(){
                        $scope.fileGrid = [];
                        $scope.fileGridCol = [];
                        for(var i = 0 ; i < $scope.uploader.queue.length;i++){
                            $scope.fileGridCol.push($scope.uploader.queue[i]);
                            if((i+1) % $scope.fileGirdColSize ==0){
                                $scope.fileGrid.push({'fileGridCol':$scope.fileGridCol});
                                $scope.fileGridCol = [];
                            }
                            if(i+1 == $scope.uploader.queue.length){
                                $scope.fileGrid.push({'fileGridCol':$scope.fileGridCol});
                            }
                        }
                    };
                    $scope.upload = function(){
                        if($scope.uploader.queue.length==0){
                            modal.info('操作提醒','未选择文件');
                        }else{
                            modal.confirm('操作提醒','是否上传文件').then(function(){
                                $scope.uploader.uploadAll();
                            })
                        }
                    }
                    $scope.cancel = function () {
                        if($scope.uploader.queue.length!=0){
                            modal.confirm('操作提醒','有未上传文件，是否继续退出?').then(function(){
                                modalInstance.close();
                            })
                        }else{
                            modalInstance.close();
                        }

                    };
                    $scope.uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
                        console.info('onWhenAddingFileFailed', item, filter, options);
                    };
                    $scope.uploader.onAfterAddingFile = function(fileItem) {
                        console.info('onAfterAddingFile', fileItem);
                        fileItem.status='init';
                        $scope.initFileGrid();
                    };
                    $scope.uploader.onAfterAddingAll = function(addedFileItems) {
                        console.info('onAfterAddingAll', addedFileItems);

                    };
                    $scope.uploader.onBeforeUploadItem = function(item) {
                        console.info('onBeforeUploadItem', item);
                        item.status='uploading';
                        item.max=100;
                        item.percent=0;
                    };
                    $scope.uploader.onProgressItem = function(fileItem, progress) {
                        fileItem.percent=progress;
                        console.info('onProgressItem', fileItem, progress);
                    };
                    $scope.uploader.onProgressAll = function(progress) {
                        console.info('onProgressAll', progress);
                    };
                    $scope.uploader.onSuccessItem = function(fileItem, response, status, headers) {
                        console.info('onSuccessItem', fileItem, response, status, headers);
                        fileItem.status='uploadSuccess';
                    };
                    $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
                        console.info('onErrorItem', fileItem, response, status, headers);
                        fileItem.status='uploadError';
                    };
                    $scope.uploader.onCancelItem = function(fileItem, response, status, headers) {
                        console.info('onCancelItem', fileItem, response, status, headers);
                    };
                    $scope.uploader.onCompleteItem = function(fileItem, response, status, headers) {
                        console.info('onCompleteItem', fileItem, response, status, headers);
                    };
                    $scope.uploader.onCompleteAll = function() {
                        console.info('onCompleteAll');
                    };
                }
            });
            return modalInstance.result;
        }
    });
