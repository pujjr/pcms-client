/**验证裸车价**/
angular.module("app").
    directive('verifyInsuranceFee',function(defaultErrorMessageResolver){
    return {
        restrict:'A',
        require:'ngModel',
        scope : {
            rule : '=verifyInsuranceFee'
        },
        link: function ($scope, ele, attributes, ngModelController) {
            ngModelController.$validators.verifyInsuranceFee = function(modelVal){
                if(modelVal==undefined){
                    return true;
                }
                if($scope.rule == undefined){
                    return true;
                }
                if($scope.rule.hasOwnProperty('minInsuranceFee') && $scope.rule.hasOwnProperty('maxInsuranceFee')){
                    if( modelVal >= $scope.rule.minInsuranceFee && modelVal<=$scope.rule.maxInsuranceFee){
                        return true;
                    }else{
                        defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                            errorMessages['verifyInsuranceFee'] = $scope.rule.minInsuranceFee+'<=保险费<='+$scope.rule.maxInsuranceFee;
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
