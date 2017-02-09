/**验证联系人姓名是否中文，联系人1与联系人2姓名是否同一人**/
angular.module("app").
    directive('verifyLinkman',function(defaultErrorMessageResolver,$timeout,$q){
        return {
            restrict:'A',
            require:'ngModel',
            scope : {
                'linkmans':'=verifyLinkman',
                'curItem':'='
            },
            link: function ($scope, ele, attributes, ngModelController) {
                defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                    errorMessages['verifyLinkman'] ='姓名格式错误，只能包含中文或·';
                });
                ngModelController.$asyncValidators.verifyLinkman = function(modelVal){
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
                $scope.$watch('verifyLinkman', function() {
                    ngModelController.$validate();
                });
                $scope.verifyFunc=function(val){
                    if(val==undefined || val == ''){
                        return true;
                    }
                    if (!(/^[\u4E00-\u9FA5\uF900-\uFA2D]+$|^[\u4E00-\u9FA5\uF900-\uFA2D]+[·]{1}[\u4E00-\u9FA5\uF900-\uFA2D]+$/.test(val))) {
                        defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                            errorMessages['verifyLinkman'] ='姓名格式错误，只能包含中文或·';
                        });
                        return false;
                    }else{
                        //判断联系人1和2是否同1人
                        var otherItem ;
                        if($scope.curItem.seq==1){
                            otherItem = $scope.linkmans[1];
                        }else{
                            otherItem = $scope.linkmans[0];
                        }
                        if(val == otherItem.name){
                            defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                                errorMessages['verifyLinkman'] ='联系人1与联系人2姓名不能为同一人';
                            });
                            return false;
                        }
                        return true;
                    }
                };
            }
        }
    });

