/**验证服务费**/
angular.module("app").
    directive('verifyServiceFee',function(defaultErrorMessageResolver,ToolsService){
    return {
        restrict:'A',
        require:'ngModel',
        scope : {
            salePrice:'=',
            rule : '=verifyServiceFee'
        },
        link: function ($scope, ele, attributes, ngModelController) {
            ngModelController.$validators.verifyServiceFee = function(modelVal){
                if(modelVal==undefined || modelVal ==''){
                    return true;
                }
                if( $scope.verifyFunc(modelVal)){
                    return true;
                }else{
                    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                        errorMessages['verifyServiceFee'] =$scope.errmsg;
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
                        if($scope.rule.hasOwnProperty('minServiceFee') && $scope.rule.hasOwnProperty('maxServiceFee')){
                            if( modelVal >= $scope.rule.minServiceFee && modelVal<=$scope.rule.maxServiceFee&&(modelVal<=$scope.rule.serviceFeePercent/100*$scope.salePrice)){
                                return true;
                            }else{
                                $scope.errmsg= $scope.rule.minServiceFee+'<=服务费<='+$scope.rule.maxServiceFee+',并不大于裸车价'+$scope.rule.serviceFeePercent+"%";
                                return false;
                            }
                        }else{
                            return false;
                        }
                    }else{
                        $scope.errmsg='金额应大于0 ';
                        return false;
                    }
                }
            }
            $scope.$watch('verifyServiceFee', function() {
                ngModelController.$validate();
            });

        }
    }
});
