/**验证是否全数字**/
angular.module("app").
    directive('verifyNumber',function(defaultErrorMessageResolver){
    return {
        restrict:'A',
        require:'ngModel',
        scope : {},
        link: function ($scope, ele, attributes, ngModelController) {
            ngModelController.$validators.verifyNumber = function(modelVal){
                if(modelVal==undefined || modelVal == 0){
                    return true;
                }
                if( $scope.verifyFunc(modelVal)){
                    return true;
                }else{
                    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                        errorMessages['verifyNumber'] =$scope.errmsg;
                    });
                    return false;
                }
            };
            $scope.$watch('verifyNumber', function() {
                ngModelController.$validate();
            });
            $scope.verifyFunc=function(num){
                if (!(/^[0-9]+$/.test(num))) {
                    $scope.errmsg='输入格式错误，只能输入[0-9]';
                    return false;
                }else{
                    return true;
                }
            }
        }
    }
});
