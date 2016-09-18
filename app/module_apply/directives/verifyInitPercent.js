/**验证裸车价**/
angular.module("app").
    directive('verifyInitPercent',function(defaultErrorMessageResolver){
    return {
        restrict:'A',
        require:'ngModel',
        scope : {
            rule : '=verifyInitPercent'
        },
        link: function ($scope, ele, attributes, ngModelController) {
            ngModelController.$validators.verifyInitPercent = function(modelVal){
                if(modelVal==undefined || modelVal == 0){
                    return true;
                }
                if($scope.rule == undefined){
                    return true;
                }
                if($scope.rule.hasOwnProperty('minInitPayPercent') && $scope.rule.hasOwnProperty('maxInitPayPercent')){
                    if( modelVal >= $scope.rule.minInitPayPercent && modelVal<=$scope.rule.maxInitPayPercent){
                        return true;
                    }else{
                        defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                            errorMessages['verifyInitPercent'] = $scope.rule.minInitPayPercent+'<=首付比例<='+$scope.rule.maxInitPayPercent;
                        });
                        return false;
                    }
                }else{
                    return true;
                }

            };
            $scope.$watch('verifyInitPercent', function() {
                ngModelController.$validate();
            });
        }
    }
});
