angular.module('pu.loanquery.services')
    .service("LoanTaskService",function($window,RestApi,$uibModal){
        this.getLoanToDoTaskList = function(){
            return RestApi.all("/loanquery/getLoanToDoTaskList").getList();
        };
        this.inputApproveResult = function(){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop: false,
                size: 'lg',
                templateUrl: 'module_loantask/tpl/dialog-approve-result.html',
                controller: function ($scope, RestApi,SysDictService,modal) {
                    $scope.approveList = SysDictService.queryDictDataByTypeCode("fkspjglx").$object;
                    $scope.approveVo = {};
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                    $scope.ok = function(){
                        modal.confirm("操作提醒","确认提交?").then(function(){
                            modalInstance.close($scope.approveVo);
                        })
                    }
                }
            });
            return modalInstance.result;
        }
    });
