angular.module('pu.system.services')
    .service("BankService",function($window,RestApi,$uibModal){
        this.queryBankInfoList = function(enabled){
            return RestApi.all("/bank").getList({'enabled':enabled});
        };
        this.addBankInfo = function(item){
            return RestApi.all("/bank").post(item);
        };
        this.modifyBankInfo = function(item){
            return RestApi.one("/bank",item.id).customPUT(item);
        };
        this.deleteBankInfo = function(id){
            return RestApi.one("/bank",id).remove();
        }
        this.queryUnionPayBankInfoList = function(){
            return RestApi.all("/bank/unionpay").getList();
        };
        this.addBankAcctInfo = function(item){
            return RestApi.all("/bank/bankacctinfo").post(item);
        };
        this.modifyBankAcctInfo = function(item){
            return RestApi.one("/bank/bankacctinfo",item.id).customPUT(item);
        };
        this.deleteBankAcctInfo = function(id){
            return RestApi.one("/bank/bankacctinfo",id).remove();
        };
        this.getBankAcctInfoList = function(purpose,enabled){
            return RestApi.all("/bank/bankacctinfo").getList({purpose:purpose,enabled:false});
        };
        this.selectBankAcct = function(purpose){
            var $uibModalInstance = $uibModal.open({
                animation: false,
                backdrop: true,
                templateUrl: 'module_system/tpl/dialog-bankacctinfo-sel.html',
                controller: function ($scope,BankService) {
                    $scope.bankAcctInfoList = BankService.getBankAcctInfoList(purpose,true).$object;
                    $scope.select = function(item) {
                        $uibModalInstance.close(item);
                    };
                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                size: 'lg'
            });
            return $uibModalInstance.result;
        }
    });
