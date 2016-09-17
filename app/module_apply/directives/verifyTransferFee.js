/**验证裸车价**/
angular.module("app").
    directive('verifyTransferFee',function(defaultErrorMessageResolver){
    return {
        restrict:'A',
        require:'ngModel',
        scope : {
            rule : '=verifyTransferFee'
        },
        link: function ($scope, ele, attributes, ngModelController) {
            ngModelController.$validators.verifyTransferFee = function(modelVal){
                if(modelVal==undefined){
                    return true;
                }
                if($scope.rule == undefined){
                    return true;
                }
                if($scope.rule.hasOwnProperty('minTransferFee') && $scope.rule.hasOwnProperty('maxTransferFee')){
                    if( modelVal >= $scope.rule.minTransferFee && modelVal<=$scope.rule.maxTransferFee){
                        return true;
                    }else{
                        defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                            errorMessages['verifyTransferFee'] = $scope.rule.minTransferFee+'<=过户费<='+$scope.rule.maxTransferFee;
                        });
                        return false;
                    }
                }else{
                    return true;
                }

            };
            $scope.$watch('verifyTransferFee', function() {
                ngModelController.$validate();
            });
        }
    }
});
