/**验证裸车价**/
angular.module("app").
    directive('verifyMobile',function(defaultErrorMessageResolver){
    return {
        restrict:'A',
        require:'ngModel',
        link: function ($scope, ele, attributes, ngModelController) {
            ngModelController.$validators.verifyMobile = function(modelVal){
                if(modelVal==undefined || modelVal == 0){
                    return true;
                }
                if( $scope.mobileCheck(modelVal)){
                    return true;
                }else{
                    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                        errorMessages['verifyMobile'] ='手机号码格式错误';
                    });
                    return false;
                }
            };
            $scope.$watch('verifyMobile', function() {
                ngModelController.$validate();
            });
            $scope.mobileCheck=function(inputString){
                var partten = /^1[3,5,8,4,7]\d{9}$/;
                if(partten.test(inputString)) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    }
});
