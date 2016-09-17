/**验证裸车价**/
angular.module("app").
    directive('verifyServiceFee',function(defaultErrorMessageResolver){
    return {
        restrict:'A',
        require:'ngModel',
        scope : {
            rule : '=verifyServiceFee'
        },
        link: function ($scope, ele, attributes, ngModelController) {
            ngModelController.$validators.verifyServiceFee = function(modelVal){
                if(modelVal==undefined){
                    return true;
                }
                if($scope.rule == undefined){
                    return true;
                }
                if($scope.rule.hasOwnProperty('minServiceFee') && $scope.rule.hasOwnProperty('maxServiceFee')){
                    if( modelVal >= $scope.rule.minServiceFee && modelVal<=$scope.rule.maxServiceFee){
                        return true;
                    }else{
                        defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                            errorMessages['verifyServiceFee'] = $scope.rule.minServiceFee+'<=服务费<='+$scope.rule.maxServiceFee;
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
