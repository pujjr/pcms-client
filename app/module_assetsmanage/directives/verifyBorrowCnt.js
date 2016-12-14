/**验证借阅数量**/
angular.module("app").
    directive('verifyBorrowCnt',function(defaultErrorMessageResolver){
    return {
        restrict:'A',
        require:'ngModel',
        scope : {
            remainCnt : '=verifyBorrowCnt'
        },
        link: function ($scope, ele, attributes, ngModelController) {
            ngModelController.$validators.verifyBorrowCnt = function(modelVal){
                if(modelVal==undefined || modelVal == 0){
                    return true;
                }
                if($scope.remainCnt == undefined){
                    return true;
                }
                if( modelVal <= parseInt($scope.remainCnt)){
                    return true;
                }else{
                    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                        errorMessages['verifyBorrowCnt'] = '借阅数量大于剩余数量';
                    });
                    return false;
                }
            };
            $scope.$watch('verifyBorrowCnt', function() {
                ngModelController.$validate();
            });
        }
    }
});
