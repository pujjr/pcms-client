/**验证中文输入**/
angular.module("app").
    directive('verifyChn',function(defaultErrorMessageResolver,$timeout,$q){
    return {
        restrict:'A',
        require:'ngModel',
        scope : {
            'ngModel':'='
        },
        link: function ($scope, ele, attributes, ngModelController) {
            defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                errorMessages['verifyChn'] ='格式错误，只能输入中文';
            });
            ngModelController.$asyncValidators.verifyChn = function(modelVal){
                var defer = $q.defer();

                $timeout(function () {
                    if ($scope.verifyFunc(modelVal)) {
                        defer.resolve();
                    } else {
                        defer.reject();
                    }
                }, 300,true);
                return defer.promise;
            };
            $scope.$watch('verifyChn', function() {
                ngModelController.$validate();
            });
            $scope.verifyFunc=function(val){
                if(val==undefined || val == ''){
                    return true;
                }
                if (!(/^[\u4E00-\u9FA5\uF900-\uFA2D]*$/.test(val))) {
                    return false;
                }else{
                    return true;
                }
            };
        }
    }
});
