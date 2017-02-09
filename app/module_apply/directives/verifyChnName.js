/**验证中文名字**/
angular.module("app").
    directive('verifyChnName',function(defaultErrorMessageResolver,$timeout,$q){
        return {
            restrict:'A',
            require:'ngModel',
            scope : {
                'ngModel':'='
            },
            link: function ($scope, ele, attributes, ngModelController) {
                defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                    errorMessages['verifyChnName'] ='姓名格式错误，只能包含中文或·';
                });
                ngModelController.$asyncValidators.verifyChnName = function(modelVal){
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
                $scope.$watch('verifyChnName', function() {
                    ngModelController.$validate();
                });
                $scope.verifyFunc=function(val){
                    if(val==undefined || val == ''){
                        return true;
                    }
                    if (!(/^[\u4E00-\u9FA5\uF900-\uFA2D]+$|^[\u4E00-\u9FA5\uF900-\uFA2D]+[·]{1}[\u4E00-\u9FA5\uF900-\uFA2D]+$/.test(val))) {
                        return false;
                    }else{
                        return true;
                    }
                };
            }
        }
    });
