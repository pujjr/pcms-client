'use strict';

/* Controllers */
// signin controllers
angular.module("pu.contract.controllers")
    .controller('ContractInfoController',function ($scope, $rootScope, $state, toaster, $uibModal,ContractService,FileUploader) {
        $scope.init = function () {
            $scope.queryContractInfoList();
        };
        $scope.queryContractInfoList = function(){
            $scope.contractInfoList= ContractService.queryContractInfoList().$object;
        }
        $scope.addContractInfo = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_contract/tpl/dialog-contractinfo-add.html',
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
                ContractService.addContractInfo(response).then(function(){
                    toaster.pop('success', '操作提醒', '增加成功');
                    $scope.queryContractInfoList();
                })
            })
        };
        $scope.editContractInfo = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_contract/tpl/dialog-contractinfo-edit.html',
                controller:function($scope,RestApi){
                    $scope.item=item;
                    $scope.ok=function(){
                        ContractService.modifyContractInfo($scope.item.id,$scope.item).then(function(){
                            modalInstance.close('修改成功');
                        })
                    };
                    $scope.delete = function(){
                        ContractService.deleteContractInfoById(item.id).then(function(){
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
                $scope.queryContractInfoList();
            })
        };
        $scope.uploadContractFile  =function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_contract/tpl/dialog-contractinfo-upload.html',
                controller:function($scope,RestApi,$q){
                    $scope.item=item;
                    var defered = $q.defer();
                    $scope.uploader = new FileUploader({
                        url:SERVER_URL.API_SERVER_URL+"/contract/uploadContractFile/"+$scope.item.id,
                        headers:{
                            'Authorization': $rootScope.Authorization
                        },
                        removeAfterUpload:true
                    });
                    $scope.uploader.onAfterAddingFile = function(fileItem) {
                        console.info('onAfterAddingFile', fileItem);
                        $scope.fileItem = fileItem;
                    };
                    $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
                        defered.reject();
                    };
                    $scope.uploader.onSuccessItem = function(fileItem, response, status, headers) {
                        defered.resolve();
                    };
                    $scope.ok=function(){
                        $scope.uploader.uploadAll();
                        modalInstance.close();
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                toaster.pop('success', '操作提醒', "上传成功");
                $scope.queryContractInfoList();
            })
        }
    })
;