/**验证裸车价**/
angular.module("app").
    directive('verifyAddonFee',function(defaultErrorMessageResolver,ToolsService){
    return {
        restrict:'A',
        require:'ngModel',
        scope : {
            rule : '=verifyAddonFee'
        },
        link: function ($scope, ele, attributes, ngModelController) {
            ngModelController.$validators.verifyAddonFee = function(modelVal){
                if(modelVal==undefined || modelVal ==''){
                    return true;
                }
                if( $scope.verifyFunc(modelVal)){
                    return true;
                }else{
                    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                        errorMessages['verifyAddonFee'] =$scope.errmsg;
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
                        if($scope.rule.hasOwnProperty('minAddonFee') && $scope.rule.hasOwnProperty('maxAddonFee')){
                            if( modelVal >= $scope.rule.minAddonFee && modelVal<=$scope.rule.maxAddonFee){
                                return true;
                            }else{
                                $scope.errmsg = $scope.rule.minAddonFee+'<=加装费<='+$scope.rule.maxAddonFee;
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
            $scope.$watch('verifyAddonFee', function() {
                ngModelController.$validate();
            });
        }
    }
});
