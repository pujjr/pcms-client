angular.module('pu.system.services')
    .service("MerchantService",function($window,RestApi,$uibModal){
        this.queryMerchantList = function(enabled,chnlType){
            return RestApi.all("/merchant").getList({'enabled':enabled,'chnlType':chnlType});
        };
        this.addMerchant = function(item){
            return RestApi.all("/merchant").post(item);
        };
        this.modifyMerchant = function(item){
            return RestApi.one("/merchant",item.id).customPUT(item);
        };
        this.deleteMerchant = function(id){
            return RestApi.one("/merchant",id).remove();
        };
        this.selectMerchant = function(){
            var $uibModalInstance = $uibModal.open({
                animation: true,
                backdrop: true,
                templateUrl: 'module_system/tpl/dialog-merchant-sel.html',
                controller: function ($scope) {
                    $scope.item = {};
                    $scope.enabledMerchantList = RestApi.all("/merchant").getList({'enabled':true,'chnlType':'shkkqd01'}).$object;
                    $scope.ok = function(item) {
                        $uibModalInstance.close($scope.item);
                    };
                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                size: 'md'
            });
            return $uibModalInstance.result;
        }
    });
