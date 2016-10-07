/**验证裸车价**/
angular.module("app").
    directive('verifyIdno',function(defaultErrorMessageResolver){
    return {
        restrict:'A',
        require:'ngModel',
        link: function ($scope, ele, attributes, ngModelController) {
            ngModelController.$validators.verifyIdno = function(modelVal){
                if(modelVal==undefined || modelVal == 0){
                    return true;
                }
                if( $scope.IDCardCheck(modelVal)){
                    return true;
                }else{
                    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                        errorMessages['verifyIdno'] =$scope.errmsg;
                    });
                    return false;
                }
            };
            $scope.$watch('verifyIdno', function() {
                ngModelController.$validate();
            });
            $scope.IDCardCheck=function(num){
                num = num.toUpperCase();
                //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
                if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
                    $scope.errmsg='输入的身份证号长度不对，或者号码不符合规定！15位号码应全为数字，18位号码末位可以为数字或X';
                    return false;
                }else{
                    return true;
                }
            }
        }
    }
});
