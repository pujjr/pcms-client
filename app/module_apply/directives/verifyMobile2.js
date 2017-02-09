/**验证承租人手机号码2**/
angular.module("app").
    directive('verifyMobile2',function(defaultErrorMessageResolver){
    return {
        restrict:'A',
        require:'ngModel',
        scope : {
            'verifyMobile2':'='
        },
        link: function ($scope, ele, attributes, ngModelController) {
            ngModelController.$validators.verifyMobile2 = function(modelVal){
                if(modelVal==undefined || modelVal == 0){
                    return true;
                }
                if( $scope.mobileCheck(modelVal)){
                    return true;
                }else{
                    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                        errorMessages['verifyMobile2'] = $scope.errmsg;
                    });
                    return false;
                }
            };
            $scope.$watch('verifyMobile2', function() {
                ngModelController.$validate();
            });
            $scope.mobileCheck=function(inputString){
                var partten = /^1[3,5,8,4,7]\d{9}$/;
                if(partten.test(inputString)) {
                    if(inputString==$scope.verifyMobile2){
                        $scope.errmsg = '联系电话2不能与联系电话1为同一号码';
                        return false;
                    }
                    return true;
                }
                else {
                    $scope.errmsg = '手机号码格式错误'
                    return false;
                }
            }
        }
    }
});
