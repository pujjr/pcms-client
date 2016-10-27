'use strict';

/* Controllers */
// signin controllers
angular.module("pu.car.controllers")
    .controller('CarTemplateController',function ($scope, $rootScope, $state, toaster, $uibModal,CarService,SysDictService,ToolsService) {
        $scope.init = function () {
            $scope.queryCarTemplateList($scope.queryParams);
        };

        $scope.queryCarTemplateList = function(queryParams){
            $scope.CarTemplateList = CarService.queryCarTemplateList().$object;
        };
        $scope.addCarTemplate = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl :'module_car/tpl/dialog-cartemplate-add.html',
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
                CarService.addCarTemplate(response).then(function(){
                    toaster.pop('success', '操作提醒', '增加成功');
                    $scope.queryCarTemplateList();
                })
            })
        };
        $scope.editCarTemplate = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                resolve: {
                    item: function(){
                        return item;
                    }
                },
                templateUrl :'module_car/tpl/dialog-cartemplate-edit.html',
                controller:function($scope,RestApi){
                    $scope.item=item;
                    $scope.ok=function(){
                        CarService.modifyCarTemplate($scope.item).then(function(){
                            modalInstance.close('修改成功');
                        })
                    };
                    $scope.delete = function(){
                        CarService.deleteCarTemplate(item.id).then(function(){
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
                $scope.queryCarTemplateList();
            })
        };

        $scope.setCarTemplateChoice = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop:'false',
                resolve: {
                    item: function(){
                        return item;
                    }
                },
                size:'lg',
                templateUrl :'module_car/tpl/dialog-set-cartemplate-choice.html',
                controller:function($scope,RestApi){
                    $scope.item=item;
                   CarService.getCarTreeList().then(function(response){
                       $scope.carTreeList = response;
                       CarService.getCarTemplateChoiceList($scope.item.id).then(function(response){
                           $scope.carTemplateChoiceList = response;
                           angular.forEach($scope.carTemplateChoiceList,function(item){
                               for(var i = 0 ;i<$scope.carTreeList.length;i++){
                                   if($scope.carTreeList[i].id == item.carDataId){
                                       $scope.carTreeList[i].checked=true;
                                       break;
                                   }
                               }
                           })
                       })
                       $scope.carTree = ToolsService.convertArrayToTree($scope.carTreeList,{
                           idKey: 'id',
                               parentKey: 'parentId',
                               childrenKey: 'children'
                       });
                   });
                    $scope.ok=function(){
                        var checkList = ToolsService.getTreeCheckedList($scope.carTree);
                        CarService.saveCarTemplateChoice($scope.item.id,checkList).then(function(){
                            modalInstance.close('修改成功');
                        })
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                toaster.pop('success', '操作提醒',response );
                $scope.queryCarTemplateList();
            })
        }
    })
;