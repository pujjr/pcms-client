/**验证减免金额**/
angular.module("app").
    directive('verifyRemissionAmount',function(defaultErrorMessageResolver){
    return {
        restrict:'A',
        require:'ngModel',
        scope : {
            verifyRemissionAmount:'='
        },
        link: function ($scope, ele, attributes, ngModelController) {
            ngModelController.$validators.verifyRemissionAmount = function(modelVal){
                if(modelVal==undefined || modelVal == 0){
                    return true;
                }
                if( modelVal <= $scope.verifyRemissionAmount){
                    return true;
                }else{
                    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                        errorMessages['verifyRemissionAmount'] = "减免金额不得大于应还金额";
                    });
                    return false;
                }
            };
            $scope.$watch('verifyRemissionAmount', function() {
                ngModelController.$validate();
            });
        }
    }
});
