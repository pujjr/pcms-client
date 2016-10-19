/**验证裸车价**/
angular.module("app").
    directive('verifyServiceFee',function(defaultErrorMessageResolver){
    return {
        restrict:'A',
        require:'ngModel',
        scope : {
            salePrice:'=',
            rule : '=verifyServiceFee'
        },
        link: function ($scope, ele, attributes, ngModelController) {
            ngModelController.$validators.verifyServiceFee = function(modelVal){
                if(modelVal==undefined || modelVal == 0){
                    return true;
                }
                if($scope.rule == undefined){
                    return true;
                }
                if($scope.rule.hasOwnProperty('minServiceFee') && $scope.rule.hasOwnProperty('maxServiceFee')){
                    if( modelVal >= $scope.rule.minServiceFee && modelVal<=$scope.rule.maxServiceFee&&(modelVal<=$scope.rule.serviceFeePercent/100*$scope.salePrice)){
                        return true;
                    }else{
                        defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                            errorMessages['verifyServiceFee'] = $scope.rule.minServiceFee+'<=服务费<='+$scope.rule.maxServiceFee+',并不大于裸车价'+$scope.rule.serviceFeePercent+"%";
                        });
                        return false;
                    }
                }else{
                    return false;
                }
            };
            $scope.$watch('verifyServiceFee', function() {
                ngModelController.$validate();
            });
        }
    }
});
