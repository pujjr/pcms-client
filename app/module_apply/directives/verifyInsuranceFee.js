/**验证保险费**/
angular.module("app").
    directive('verifyInsuranceFee',function(defaultErrorMessageResolver,ToolsService){
    return {
        restrict:'A',
        require:'ngModel',
        scope : {
            purchaseTax:'=',
            salePrice:'=',
            rule : '=verifyInsuranceFee'
        },
        link: function ($scope, ele, attributes, ngModelController) {
            ngModelController.$validators.verifyInsuranceFee = function(modelVal){
                if(modelVal==undefined || modelVal ==''){
                    return true;
                }
                if( $scope.verifyFunc(modelVal)){
                    return true;
                }else{
                    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                        errorMessages['verifyInsuranceFee'] =$scope.errmsg;
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
                        if($scope.rule.hasOwnProperty('minInsuranceFee') && $scope.rule.hasOwnProperty('maxInsuranceFee')){
                            if( modelVal >= $scope.rule.minInsuranceFee && modelVal<=$scope.rule.maxInsuranceFee&&((modelVal+$scope.purchaseTax)<=$scope.rule.insuranceFeePercent/100*$scope.salePrice)){
                                return true;
                            }else{
                                $scope.errmsg=$scope.rule.minInsuranceFee+'<=保险费<='+$scope.rule.maxInsuranceFee+',并且（购置税+保险费）不大于裸车价'+$scope.rule.insuranceFeePercent+"%";
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
            }
            $scope.$watch('verifyInsuranceFee', function() {
                ngModelController.$validate();
            });
        }
    }
});
