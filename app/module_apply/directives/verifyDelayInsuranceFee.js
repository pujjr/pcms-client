/**验证裸车价**/
angular.module("app").
    directive('verifyDelayInsuranceFee',function(defaultErrorMessageResolver,ToolsService){
    return {
        restrict:'A',
        require:'ngModel',
        scope : {
            financeFee:'=',
            rule : '=verifyDelayInsuranceFee'
        },
        link: function ($scope, ele, attributes, ngModelController) {
            ngModelController.$validators.verifyDelayInsuranceFee = function(modelVal){
                if(modelVal==undefined || modelVal ==''){
                    return true;
                }
                if( $scope.verifyFunc(modelVal)){
                    return true;
                }else{
                    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                        errorMessages['verifyDelayInsuranceFee'] =$scope.errmsg;
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
                        if($scope.rule.hasOwnProperty('minDelayInsuranceFee') && $scope.rule.hasOwnProperty('maxDelayInsuranceFee')){
                            if( modelVal >= $scope.rule.minDelayInsuranceFee && modelVal<=$scope.rule.maxDelayInsuranceFee){
                                //验证购置税+保险费+服务费+过户费+安装费+延保费≤裸车价*比例
                                if($scope.rule.hasOwnProperty('maxTotalFeePercent') && $scope.rule.hasOwnProperty('maxTotalFeePercent')){
                                    var totalFee = 0.00;
                                    if(!isNaN(parseFloat($scope.financeFee.purchaseTax))&& $scope.financeFee.purchaseTax!=""&& $scope.financeFee.purchaseTax!=undefined && $scope.financeFee.purchaseTax !=null){
                                        totalFee += parseFloat($scope.financeFee.purchaseTax);
                                    }
                                    if(!isNaN(parseFloat($scope.financeFee.serviceFee))&& $scope.financeFee.serviceFee!=""&& $scope.financeFee.serviceFee!=undefined&& $scope.financeFee.serviceFee !=null){
                                        totalFee += parseFloat($scope.financeFee.serviceFee);
                                    }
                                    if(!isNaN(parseFloat($scope.financeFee.insuranceFee))&& $scope.financeFee.insuranceFee!=""&& $scope.financeFee.insuranceFee!=undefined&& $scope.financeFee.insuranceFee !=null){
                                        totalFee += parseFloat($scope.financeFee.insuranceFee);
                                    }
                                    if(!isNaN(parseFloat($scope.financeFee.addonFee))&& $scope.financeFee.addonFee!=""&& $scope.financeFee.addonFee!=undefined&& $scope.financeFee.addonFee !=null){
                                        totalFee += parseFloat($scope.financeFee.addonFee);
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
                                $scope.errmsg=$scope.rule.minDelayInsuranceFee+'<=延保费<='+$scope.rule.maxDelayInsuranceFee;
                                return false;
                            }
                        }else{
                            return true;
                        }
                    }else{
                        $scope.errmsg='金额应大于0 ';
                        return false;
                    }
                }
            };
            $scope.$watch('verifyInsuranceFee', function() {
                ngModelController.$validate();
            });
        }
    }
});
