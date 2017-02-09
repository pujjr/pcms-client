/**验证是否为金额并且大于等于0**/
angular.module("app").
    directive('verifyAmountP',function(defaultErrorMessageResolver){
    return {
        restrict:'A',
        require:'ngModel',
        scope : {},
        link: function ($scope, ele, attributes, ngModelController) {
            ngModelController.$validators.verifyAmountP = function(modelVal){
                if(modelVal==undefined || modelVal ==''){
                    return true;
                }
                if( $scope.verifyFunc(modelVal)){
                    return true;
                }else{
                    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                        errorMessages['verifyAmountP'] =$scope.errmsg;
                    });
                    return false;
                }
            };
            $scope.$watch('verifyAmountP', function() {
                ngModelController.$validate();
            });
            $scope.verifyFunc=function(num){
                if (!(/^[0-9]{1}$|^[1-9]{1}[0-9]*$|^[1-9]{1}[0-9]*[.]{1}[0-9]{1,2}$|^0[.]{1}[0-9]{1,2}$/.test(num))) {
                    $scope.errmsg='请输入正确的金额';
                    return false;
                }else{
                    return true;
                }
            }
        }
    }
});
