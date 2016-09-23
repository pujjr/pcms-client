/**计算算法**/
angular.module('pu.system.services')
    .service("CalService",function($window,RestApi){
        //计算月租金
        this.calMonthRent = function(financeAmount,period,monthRate,repayMode){

            financeAmount = parseFloat(financeAmount);
            period = parseInt(period);
            monthRate = parseFloat(monthRate);

            //等额本息每月还款额=[贷款本金×月利率×（1+月利率）^还款月数]÷[（1+月利率）^还款月数－1]
            if(repayMode == 'hkfs01'){
                return (financeAmount*monthRate*Math.pow((1+monthRate),period)/(Math.pow((1+monthRate),period)-1)).toFixed(2);
            }
            //按月付息到期还本每月还款额 = [贷款本金 * 月利率]
            if(repayMode == 'hkfs02'){
                return parseFloat((financeAmount*monthRate).toFixed(2));
            }
            //一次付息按月还本规则每月还款额 = [贷款金额/ 融资期限]
            if(repayMode == 'hkfs03'){
                return parseFloat((financeAmount/period).toFixed(2));
            }
        }
    });
