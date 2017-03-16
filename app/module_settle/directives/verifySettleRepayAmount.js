/**验证减免金额**/
angular.module("app").
    directive('verifySettleRepayAmount',function(defaultErrorMessageResolver){
    return {
        restrict:'A',
        require:'ngModel',
        scope : {
            applyVo:'='
        },
        link: function ($scope, ele, attributes, ngModelController) {
            ngModelController.$validators.verifySettleRepayAmount = function(modelVal){
                if(modelVal==undefined || modelVal == 0){
                    return true;
                }
                var total = $scope.applyVo.feeItem.settleTotalAmount;
                if(!isNaN($scope.applyVo.remissionFeeItemVo.capital)&& $scope.applyVo.remissionFeeItemVo.capital!=undefined){
                    total  -= $scope.applyVo.remissionFeeItemVo.capital;
                }

                if(!isNaN($scope.applyVo.remissionFeeItemVo.interest)&&  $scope.applyVo.remissionFeeItemVo.interest!=undefined){
                    total  -= $scope.applyVo.remissionFeeItemVo.interest;
                }

                if(!isNaN($scope.applyVo.remissionFeeItemVo.overdueAmount)&& $scope.applyVo.remissionFeeItemVo.overdueAmount!=undefined){
                    total  -= $scope.applyVo.remissionFeeItemVo.overdueAmount;
                }
                if(!isNaN($scope.applyVo.remissionFeeItemVo.otherFee)&& $scope.applyVo.remissionFeeItemVo.otherFee!=undefined){
                    total  -= $scope.applyVo.remissionFeeItemVo.otherFee;
                }
                if(!isNaN($scope.applyVo.remissionFeeItemVo.otherOverdueAmount)&&  $scope.applyVo.remissionFeeItemVo.otherOverdueAmount!=undefined){
                    total  -= $scope.applyVo.remissionFeeItemVo.otherOverdueAmount;
                }
                if(!isNaN($scope.applyVo.remissionFeeItemVo.lateFee)&& $scope.applyVo.remissionFeeItemVo.lateFee!=undefined){
                    total  -= $scope.applyVo.remissionFeeItemVo.lateFee;
                }
                if( Math.abs(modelVal-total)<0.0001|| modelVal-total>0){
                    return true;
                }else{
                    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                        errorMessages['verifySettleRepayAmount'] = "入账金额不得小于结清总额";
                    });
                    return false;
                }
            };
            $scope.$watch('verifySettleRepayAmount', function() {
                ngModelController.$validate();
            });
        }
    }
});
