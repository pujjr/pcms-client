/**验证是否为金额并且小于0**/
angular.module("app").
    directive('verifyAmountN',function(defaultErrorMessageResolver){
    return {
        restrict:'A',
        require:'ngModel',
        scope : {},
        link: function ($scope, ele, attributes, ngModelController) {
            ngModelController.$validators.verifyAmountN = function(modelVal){
                if(modelVal==undefined || modelVal == 0){
                    return true;
                }
                if( $scope.verifyFunc(modelVal)){
                    return true;
                }else{
                    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                        errorMessages['verifyAmountN'] =$scope.errmsg;
                    });
                    return false;
                }
            };
            $scope.$watch('verifyAmountN', function() {
                ngModelController.$validate();
            });
            $scope.verifyFunc=function(num){
                if (!(/^-([1-9]{1}$|[1-9]{1}[0-9]*$|[1-9]{1}[0-9]*[.]{1}[0-9]{1,2}$|0[.]{1}[0-9]{1,2}$)/.test(num))) {
                    $scope.errmsg='请输入正确的金额';
                    return false;
                }else{
                    return true;
                }
            }
        }
    }
});
