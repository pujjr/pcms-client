/**验证裸车价**/
angular.module("app").
    directive('verifyAddonFee',function(defaultErrorMessageResolver){
    return {
        restrict:'A',
        require:'ngModel',
        scope : {
            rule : '=verifyAddonFee'
        },
        link: function ($scope, ele, attributes, ngModelController) {
            ngModelController.$validators.verifyAddonFee = function(modelVal){
                if(modelVal==undefined || modelVal == 0){
                    return true;
                }
                if($scope.rule == undefined){
                    return true;
                }
                if($scope.rule.hasOwnProperty('minAddonFee') && $scope.rule.hasOwnProperty('maxAddonFee')){
                    if( modelVal >= $scope.rule.minAddonFee && modelVal<=$scope.rule.maxAddonFee){
                        return true;
                    }else{
                        defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                            errorMessages['verifyAddonFee'] = $scope.rule.minAddonFee+'<=加装费<='+$scope.rule.maxAddonFee;
                        });
                        return false;
                    }
                }else{
                    return true;
                }

            };
            $scope.$watch('verifyAddonFee', function() {
                ngModelController.$validate();
            });
        }
    }
});
