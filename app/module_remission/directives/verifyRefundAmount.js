/**验证退款金额**/
angular.module("app").
    directive('verifyRefundAmount',function(defaultErrorMessageResolver){
    return {
        restrict:'A',
        require:'ngModel',
        scope : {
            verifyRefundAmount:'='
        },
        link: function ($scope, ele, attributes, ngModelController) {
            ngModelController.$validators.verifyRefundAmount = function(modelVal){
                if(modelVal==undefined || modelVal == 0){
                    return true;
                }
                if( modelVal <= $scope.verifyRefundAmount){
                    return true;
                }else{
                    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                        errorMessages['verifyRefundAmount'] = "退款金额不得大于挂账金额";
                    });
                    return false;
                }
            };
            $scope.$watch('verifyRefundAmount', function() {
                ngModelController.$validate();
            });
        }
    }
});
