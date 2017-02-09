/**验证单位名称**/

angular.module("app").
    directive('verifyUnitname',function(defaultErrorMessageResolver,$timeout,$q){
        return {
            restrict:'A',
            require:'ngModel',
            scope : {
                'ngModel':'='
            },
            link: function ($scope, ele, attributes, ngModelController) {
                defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                    errorMessages['verifyUnitname'] ='单位名称不能为全数字和全字符';
                });
                ngModelController.$asyncValidators.verifyUnitname = function(modelVal){
                    var defer = $q.defer();

                    $timeout(function () {
                        if ($scope.verifyFunc(modelVal)) {
                            defer.resolve();
                            console.log("resolve");
                        } else {
                            defer.reject();
                            console.log("reject");
                        }
                    }, 300,true);
                    return defer.promise;
                };
                $scope.$watch('verifyUnitname', function() {
                    ngModelController.$validate();
                });
                $scope.verifyFunc=function(val){
                    console.log(val);
                    if(val==undefined || val == ''){
                        return true;
                    }
                    if ((/^[0-9a-zA-Z\x00-\xff]+$/.test(val))) {
                        return false;
                    }else{
                        return true;
                    }
                };
            }
        }
    });

