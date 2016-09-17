/**验证裸车价**/
angular.module("app").
    directive('verifyDelayInsuranceFee',function(defaultErrorMessageResolver){
    return {
        restrict:'A',
        require:'ngModel',
        scope : {
            rule : '=verifyDelayInsuranceFee'
        },
        link: function ($scope, ele, attributes, ngModelController) {
            ngModelController.$validators.verifyDelayInsuranceFee = function(modelVal){
                if(modelVal==undefined){
                    return true;
                }
                if($scope.rule == undefined){
                    return true;
                }
                if($scope.rule.hasOwnProperty('minDelayInsuranceFee') && $scope.rule.hasOwnProperty('maxDelayInsuranceFee')){
                    if( modelVal >= $scope.rule.minDelayInsuranceFee && modelVal<=$scope.rule.maxDelayInsuranceFee){
                        return true;
                    }else{
                        defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                            errorMessages['verifyDelayInsuranceFee'] = $scope.rule.minDelayInsuranceFee+'<=延保费<='+$scope.rule.maxDelayInsuranceFee;
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
