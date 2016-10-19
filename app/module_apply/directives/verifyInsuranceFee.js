/**验证保险费**/
angular.module("app").
    directive('verifyInsuranceFee',function(defaultErrorMessageResolver){
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
                if(modelVal==undefined || modelVal == 0){
                    return true;
                }
                if($scope.rule == undefined){
                    return true;
                }
                if($scope.rule.hasOwnProperty('minInsuranceFee') && $scope.rule.hasOwnProperty('maxInsuranceFee')){
                    if( modelVal >= $scope.rule.minInsuranceFee && modelVal<=$scope.rule.maxInsuranceFee&&((modelVal+$scope.purchaseTax)<=$scope.rule.insuranceFeePercent/100*$scope.salePrice)){
                        return true;
                    }else{
                        defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                            errorMessages['verifyInsuranceFee'] = $scope.rule.minInsuranceFee+'<=保险费<='+$scope.rule.maxInsuranceFee+',并且（购置税+保险费）不大于裸车价'+$scope.rule.insuranceFeePercent+"%";
                        });
                        return false;
                    }
                }else{
                    return true;
                }

            };
            $scope.$watch('verifyInsuranceFee', function() {
                ngModelController.$validate();
            });
        }
    }
});
