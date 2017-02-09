/**验证联系人是否一样**/
angular.module("app").
    directive('verifyLinkman',function(defaultErrorMessageResolver){
    return {
        restrict:'A',
        require:'ngModel',
        scope : {
            'verifyLinkman':'='
        },
        link: function ($scope, ele, attributes, ngModelController) {
            ngModelController.$validators.verifyLinkman = function(modelVal){
                if(modelVal==undefined || modelVal == ''){
                    return true;
                }
                if( $scope.verifyFunc(modelVal)){
                    return true;
                }else{
                    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                        errorMessages['verifyLinkman'] =$scope.errmsg;
                    });
                    return false;
                }
            };
            $scope.$watch('verifyLinkman', function() {
                ngModelController.$validate();
            });
            $scope.verifyFunc=function(val){
                var linkman1 = $scope.verifyLinkman[0];
                var linkman2 = $scope.verifyLinkman[1];
                return true;
            }
        }
    }
});
