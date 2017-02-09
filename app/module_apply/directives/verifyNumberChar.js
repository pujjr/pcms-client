/**验证是否全数字、字母**/
angular.module("app").
    directive('verifyNumberChar',function(defaultErrorMessageResolver){
    return {
        restrict:'A',
        require:'ngModel',
        scope : {},
        link: function ($scope, ele, attributes, ngModelController) {
            ngModelController.$validators.verifyNumberChar = function(modelVal){
                if(modelVal==undefined || modelVal == 0){
                    return true;
                }
                if( $scope.verifyFunc(modelVal)){
                    return true;
                }else{
                    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                        errorMessages['verifyNumberChar'] =$scope.errmsg;
                    });
                    return false;
                }
            };
            $scope.$watch('verifyNumberChar', function() {
                ngModelController.$validate();
            });
            $scope.verifyFunc=function(num){
                if (!(/^[0-9a-zA-Z]+$/.test(num))) {
                    $scope.errmsg='输入格式错误，只能输入数字[0-9]、字母[a-zA-Z]';
                    return false;
                }else{
                    return true;
                }
            }
        }
    }
});
