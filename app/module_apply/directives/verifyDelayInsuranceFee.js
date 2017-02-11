/**验证裸车价**/
angular.module("app").
    directive('verifyDelayInsuranceFee',function(defaultErrorMessageResolver,ToolsService){
    return {
        restrict:'A',
        require:'ngModel',
        scope : {
            rule : '=verifyDelayInsuranceFee'
        },
        link: function ($scope, ele, attributes, ngModelController) {
            ngModelController.$validators.verifyDelayInsuranceFee = function(modelVal){
                if(modelVal==undefined || modelVal ==''){
                    return true;
                }
                if( $scope.verifyFunc(modelVal)){
                    return true;
                }else{
                    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                        errorMessages['verifyDelayInsuranceFee'] =$scope.errmsg;
                    });
                    return false;
                }
            };
            $scope.verifyFunc=function(modelVal){
                if(modelVal==undefined || modelVal == ''){
                    return true;
                }
                if (!ToolsService.isValidAmount(modelVal)) {
                    $scope.errmsg='请输入正确的金额';
                    return false;
                }else{
                    if(parseFloat(modelVal)>0){
                        if($scope.rule.hasOwnProperty('minDelayInsuranceFee') && $scope.rule.hasOwnProperty('maxDelayInsuranceFee')){
                            if( modelVal >= $scope.rule.minDelayInsuranceFee && modelVal<=$scope.rule.maxDelayInsuranceFee){
                                return true;
                            }else{
                                $scope.errmsg=$scope.rule.minDelayInsuranceFee+'<=延保费<='+$scope.rule.maxDelayInsuranceFee;
                                return false;
                            }
                        }else{
                            return true;
                        }
                    }else{
                        $scope.errmsg='金额应大于0 ';
                        return false;
                    }
                }
            };
            $scope.$watch('verifyInsuranceFee', function() {
                ngModelController.$validate();
            });
        }
    }
});
