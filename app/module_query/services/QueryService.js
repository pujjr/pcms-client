angular.module('pu.query.services')
    .service("QueryService",function($window,RestApi,$uibModal){
        this.queryApplyList = function(queryParam){
            return RestApi.all("/query/applyList").getList(queryParam);
        };
        this.queryApplyConditionLoanCommentList = function(appId){
            return RestApi.all("/query/conditionLoanCommentList").all(appId).getList();
        };
        this.getWorkflowProcessResultByAppId = function(appId){
            return RestApi.all("/query/getWorkflowProcessResult").all(appId).getList();
        };
        this.queryApplyRunPathNodeMap = function(appId){
            return RestApi.one("/query/queryApplyRunPathNodeMap",appId).get();
        };
        this.getWorkflowProcessResultByProcInstId = function(procInstId){
            return RestApi.all("/query/getWorkflowProcessResultByProcInstId").all(procInstId).getList();
        };
        this.queryFraudInnerResult = function(appId){
            return RestApi.all("/query/queryFraudInnerResult").all(appId).getList();
        };
        this.queryFraudHisResult = function(appId,taskNodeName){
            return RestApi.all("/query/queryFraudHisResult").all(appId).all(taskNodeName).getList();
        };
        this.selectApply = function(){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop: 'static',
                size: 'lg',
                templateUrl: 'module_query/tpl/select-apply-list.html',
                controller: function ($scope,QueryService,ProductService,SysDictService) {
                    $scope.productList = ProductService.queryAllProductList().$object;
                    $scope.appStatusList = SysDictService.queryDictDataByTypeCode("sqdzt").$object;
                    $scope.queryApplyList = function(){
                        $scope.applyList= QueryService.queryApplyList().$object;
                    };
                    $scope.pageChanged = function(){
                        $scope.queryApplyList();
                    }
                    $scope.select = function(item){
                        modalInstance.close(item.appId);
                    }
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            return modalInstance.result;
        };
    });
