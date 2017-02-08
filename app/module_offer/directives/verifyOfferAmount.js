/**验证减免金额**/
angular.module("app").
    directive('verifyOfferAmount',function(defaultErrorMessageResolver){
    return {
        restrict:'A',
        require:'ngModel',
        scope : {
            verifyOfferAmount:'='
        },
        link: function ($scope, ele, attributes, ngModelController) {
            ngModelController.$validators.verifyOfferAmount = function(modelVal){
                if(modelVal==undefined || modelVal == 0){
                    return true;
                }
                if( modelVal <= $scope.verifyRemissionAmount){
                    return true;
                }else{
                    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                        errorMessages['verifyOfferAmount'] = "报盘不得大于应还金额";
                    });
                    return false;
                }
            };
            $scope.$watch('verifyOfferAmount', function() {
                ngModelController.$validate();
            });
        }
    }
});
