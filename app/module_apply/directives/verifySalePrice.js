/**验证裸车价**/
angular.module("app").
    directive('verifySalePrice',function(defaultErrorMessageResolver){
    return {
        restrict:'A',
        require:'ngModel',
        scope : {
            rule : '=verifySalePrice'
        },
        link: function ($scope, ele, attributes, ngModelController) {
            ngModelController.$validators.verifySalePrice = function(modelVal){
                if(modelVal==undefined || modelVal == 0){
                    return true;
                }
                if($scope.rule == undefined){
                    return true;
                }
                if($scope.rule.hasOwnProperty('minSalePrice') && $scope.rule.hasOwnProperty('maxSalePrice')){
                    if( modelVal >= $scope.rule.minSalePrice && modelVal<=$scope.rule.maxSalePrice){
                        return true;
                    }else{
                        defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                            errorMessages['verifySalePrice'] = $scope.rule.minSalePrice+'<=裸车价<='+$scope.rule.maxSalePrice;
                        });
                        return false;
                    }
                }else{
                    return false;
                }
            };
            $scope.$watch('verifySalePrice', function() {
                ngModelController.$validate();
            });
        }
    }
});
