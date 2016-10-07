/**验证开票裸车价**/
angular.module("app").
    directive('verifyInvoiceSalePrice',function(defaultErrorMessageResolver){
    return {
        restrict:'A',
        require:'ngModel',
        scope : {
            salePrice : '=verifyInvoiceSalePrice'
        },
        link: function ($scope, ele, attributes, ngModelController) {
            ngModelController.$validators.verifyInvoiceSalePrice = function(modelVal){
                if(modelVal==undefined || modelVal == 0){
                    return true;
                }
                if($scope.salePrice == undefined){
                    return true;
                }
                if( modelVal >= parseFloat($scope.salePrice*(1-0.03)) && modelVal<=parseFloat($scope.salePrice)*(1+0.03)){
                    return true;
                }else{
                    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                        errorMessages['verifyInvoiceSalePrice'] = '开票裸车价需在裸车价正负3%范围内';
                    });
                    return false;
                }
            };
            $scope.$watch('verifyInvoiceSalePrice', function() {
                ngModelController.$validate();
            });
        }
    }
});
