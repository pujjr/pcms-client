/**验证服务费**/
angular.module("app").
    directive('verifyServiceFee',function(defaultErrorMessageResolver,ToolsService){
    return {
        restrict:'A',
        require:'ngModel',
        scope : {
            financeFee:'=',
            rule : '=verifyServiceFee'
        },
        link: function ($scope, ele, attributes, ngModelController) {
            ngModelController.$validators.verifyServiceFee = function(modelVal){
                if(modelVal==undefined || modelVal ==''){
                    return true;
                }
                if( $scope.verifyFunc(modelVal)){
                    return true;
                }else{
                    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                        errorMessages['verifyServiceFee'] =$scope.errmsg;
                    });
                    return false;
                }
            };
            $scope.verifyFunc=function(modelVal){
                if(modelVal==undefined || modelVal == ''){
                    return true;
                }
                if (!ToolsService.isValidAmount(modelVal)) {
                    $scope.errmsg='请输入正确的金额';
                    return false;
                }else{
                    if(parseFloat(modelVal)>0){
                        //根据裸车价验证服务费规则
                        var salePrice = $scope.financeFee.salePrice;
                        var serviceFeeRule = $scope.rule.serviceFeeRuleList;
                        for(var i=0;i<serviceFeeRule.length;i++){
                            var ruleItem = serviceFeeRule[i];
                            if(salePrice>ruleItem.minSalePrice && salePrice<=ruleItem.maxSalePrice){
                                if(modelVal<ruleItem.minServiceFee || modelVal >ruleItem.maxServiceFee ){
                                    $scope.errmsg= '裸车价在'+ruleItem.minSalePrice+'-'+ruleItem.maxSalePrice+'区间时，'+ruleItem.minServiceFee+'<=服务费<='+ruleItem.maxServiceFee;
                                    return false;
                                }
                            }
                        }
                        //验证购置税+保险费+服务费+过户费+安装费+延保费≤裸车价*比例
                        if($scope.rule.hasOwnProperty('maxTotalFeePercent') && $scope.rule.hasOwnProperty('maxTotalFeePercent')){
                            var totalFee = 0.00;
                            if(!isNaN(parseFloat($scope.financeFee.purchaseTax))&& $scope.financeFee.purchaseTax!=""&& $scope.financeFee.purchaseTax!=undefined && $scope.financeFee.purchaseTax !=null){
                                totalFee += parseFloat($scope.financeFee.purchaseTax);
                            }
                            if(!isNaN(parseFloat($scope.financeFee.addonFee))&& $scope.financeFee.addonFee!=""&& $scope.financeFee.addonFee!=undefined&& $scope.financeFee.addonFee !=null){
                                totalFee += parseFloat($scope.financeFee.addonFee);
                            }
                            if(!isNaN(parseFloat($scope.financeFee.insuranceFee))&& $scope.financeFee.insuranceFee!=""&& $scope.financeFee.insuranceFee!=undefined&& $scope.financeFee.insuranceFee !=null){
                                totalFee += parseFloat($scope.financeFee.insuranceFee);
                            }
                            if(!isNaN(parseFloat($scope.financeFee.delayInsuranceFee))&& $scope.financeFee.delayInsuranceFee!=""&& $scope.financeFee.delayInsuranceFee!=undefined&& $scope.financeFee.delayInsuranceFee !=null){
                                totalFee += parseFloat($scope.financeFee.delayInsuranceFee);
                            }
                            if(!isNaN(parseFloat($scope.financeFee.transferFee))&& $scope.financeFee.transferFee!=""&& $scope.financeFee.transferFee!=undefined&& $scope.financeFee.transferFee !=null){
                                totalFee += parseFloat($scope.financeFee.transferFee);
                            }
                            totalFee+=parseFloat(modelVal);
                            if(totalFee>$scope.financeFee.salePrice*$scope.rule.maxTotalFeePercent/100){
                                $scope.errmsg= '产品购置税+保险费+服务费+过户费+安装费+延保费≤裸车价*'+$scope.rule.maxTotalFeePercent+"%";
                                return false;
                            }else{
                                return true;
                            }
                        }else{
                            return false;
                        }
                    }else{
                        $scope.errmsg='金额应大于0 ';
                        return false;
                    }
                }
            }
            $scope.$watch('verifyServiceFee', function() {
                ngModelController.$validate();
            });

        }
    }
});
