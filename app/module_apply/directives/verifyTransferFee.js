/**验证裸车价**/
angular.module("app").
    directive('verifyTransferFee',function(defaultErrorMessageResolver,ToolsService){
    return {
        restrict:'A',
        require:'ngModel',
        scope : {
            rule : '=verifyTransferFee'
        },
        link: function ($scope, ele, attributes, ngModelController) {
            ngModelController.$validators.verifyTransferFee = function(modelVal){
                if(modelVal==undefined || modelVal ==''){
                    return true;
                }
                if( $scope.verifyFunc(modelVal)){
                    return true;
                }else{
                    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                        errorMessages['verifyTransferFee'] =$scope.errmsg;
                    });
                    return false;
                }
            };
            $scope.verifyFunc=function(modelVal){
                if(modelVal==undefined || modelVal == ''){
                    return true;
                }
                if($scope.rule == undefined){
                    return true;
                }
                if (!ToolsService.isValidAmount(modelVal)) {
                    $scope.errmsg='请输入正确的金额';
                    return false;
                }else{
                    if(parseFloat(modelVal)>0){
                        if($scope.rule.hasOwnProperty('minTransferFee') && $scope.rule.hasOwnProperty('maxTransferFee')){
                            if( modelVal >= $scope.rule.minTransferFee && modelVal<=$scope.rule.maxTransferFee){
                                return true;
                            }else{
                                $scope.errmsg= $scope.rule.minTransferFee+'<=过户费<='+$scope.rule.maxTransferFee;
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
            $scope.$watch('verifyTransferFee', function() {
                ngModelController.$validate();
            });
        }
    }
});
