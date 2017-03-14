/**验证裸车价**/
angular.module("app").
    directive('verifyIdnoAndCheckValid',function(defaultErrorMessageResolver,ApplyService){
    return {
        restrict:'A',
        require:'ngModel',
        scope : {},
        link: function ($scope, ele, attributes, ngModelController) {
            ngModelController.$validators.verifyIdno = function(modelVal){
                if(modelVal==undefined || modelVal == 0){
                    return true;
                }
                if( $scope.IDCardCheck(modelVal)){
                    return true;
                }else{
                    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                        errorMessages['verifyIdno'] =$scope.errmsg;
                    });
                    return false;
                }
            };
            $scope.$watch('verifyIdno', function() {
                ngModelController.$validate();
            });
            $scope.IDCardCheck=function(num){
                num = num.toUpperCase();
                //身份证号码为或者18位，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
                if (!(/(^\d{17}([0-9]|X)$)/.test(num))) {
                    $scope.errmsg='输入的身份证号长度不对，或者号码不符合规定！18位号码末位可以为数字或X';
                    return false;
                }else{
                    //满足18位进行校验码判断
                   // 1、将前面的身份证号码17位数分别乘以不同的系数。从第一位到第十七位的系数分别为：7－9－10－5－8－4－2－1－6－3－7－9－10－5－8－4－2。
                    //2、将这17位数字和系数相乘的结果相加。
                    //3、用加出来和除以11，看余数是多少？
                    //4、余数只可能有0－1－2－3－4－5－6－7－8－9－10这11个数字。其分别对应的最后一位身份证的号码为1－0－X －9－8－7－6－5－4－3－2。
                    var checkBit = ['1','0','X','9','8','7','6','5','4','3','2'];
                    var modVal = (num[0]*7+num[1]*9+num[2]*10+num[3]*5+num[4]*8+num[5]*4+num[6]*2+num[7]*1+num[8]*6+num[9]*3+num[10]*7+num[11]*9+num[12]*10+num[13]*5+num[14]*8+num[15]*4+num[16]*2)%11;
                    if(checkBit[modVal]!=num[17]){
                        $scope.errmsg='身份证号码校验错误';
                        return false;
                    }
                    //强制判断身份证初始日期
                    var tmpStr = num.substring(6, 14);
                    var month = tmpStr.substring(4, 6);
                    if(parseInt(month)>12 || parseInt(month)<=0){
                        $scope.errmsg='身份证号码出生月份应为1-12';
                        return false;
                    }
                    var day = tmpStr.substring(6);
                    if(parseInt(day)>31 || parseInt(day)<=0){
                        $scope.errmsg='身份证号码出生日期应为1-31';
                        return false;
                    }
                    //检查是否存在两个月被拒绝单子
                    ApplyService.checkIdNoHas2MRefuseApply(num).then(function(response){
                        var isRefuse = response.isRefuse;
                        if(isRefuse == true){
                            $scope.errmsg='客户在两个月内存在被拒绝申请，暂时无法申请';
                            return false;
                        }
                    })
                    return true;
                }
            }
        }
    }
});
