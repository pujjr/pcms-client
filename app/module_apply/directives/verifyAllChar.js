/**验证是否为数字**/
angular.module("app").
    directive('verifyAllChar',function(defaultErrorMessageResolver){
    return {
        restrict:'A',
        require:'ngModel',
        scope : {},
        link: function ($scope, ele, attributes, ngModelController) {
            ngModelController.$validators.verifyAllChar = function(modelVal){
                if(modelVal==undefined || modelVal == 0){
                    return true;
                }
                if( $scope.verifyFunc(modelVal)){
                    return true;
                }else{
                    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                        errorMessages['verifyAllChar'] =$scope.errmsg;
                    });
                    return false;
                }
            };
            $scope.$watch('verifyAllChar', function() {
                ngModelController.$validate();
            });
            $scope.verifyFunc=function(num){
                if (!(/^[0-9a-zA-Z\x00-\xff]+$/.test(num))) {
                    $scope.errmsg='输入格式错误，只能输入数字、字符';
                    return false;
                }else{
                    return true;
                }
            }
        }
    }
});
