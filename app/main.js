var InvoiceAreaUrl = {
    '上海市':'https://inv-veri.chinatax.gov.cn/',
    '内蒙古省':'http://www.nm-n-tax.gov.cn:8000/fpcx/nmgsfpcx/wlfpcybd_lscx.jsp',
    '北京市':'http://www.bjtax.gov.cn/ptfp/fpindex.jsp',
    '吉林省':'http://222.168.33.117:4001/wlfpcx/wlfp/fpcx.do',
    '四川省':'http://wsbs.sc-n-tax.gov.cn/fpcy/index.htm',
    '宁夏省':'http://61.133.192.35:8006/fpcx/fpcx.jsp',
    '安徽省':'http://www.ah-l-tax.gov.cn/portal/bsfu/sscx/fpzwcx/index.htm',
    '山东省':'http://www.sd-n-tax.gov.cn/col/col47487/index.html',
    '山西省':'http://202.99.207.241:7005/fpcx/fpzwQuerySubmit.do',
    '广西省':'http://www.gxgs.gov.cn/col/col123081/index.html#http://www.gxgs.gov.cn:9600/fpcxweb/fpcxPage.action',
    '新疆省':'http://www.xj-n-tax.gov.cn/zxbs/sscx/fpzwch/',
    '贵州省':'http://etax.gzgs12366.gov.cn:8080/',
    '河南省':'http://www.12366.ha.cn/003/bsfw_302/bszt_30209/ptfphb_3020905/index.html?NVG=2&LM_ID=30209',
    '湖北省':'https://swcx.hb-n-tax.gov.cn:7013/',
    '甘肃省':'http://61.178.20.153:81/BsfwtWeb/pages/cx/cxtj_fpxxcx.html',
    '云南省':'http://www.yngs.gov.cn/newWeb/template/index.jsp',
    '重庆市':'http://218.70.65.72:5000/PortalWeb/pages/sscx/cx_fplx.html',
    '黑龙江省':'http://221.212.153.203/fpcx/qtptfpcxjs.jsp',
    '辽宁省':'http://218.25.58.87:7006/wlfpcy/wlfp/fpcy_gz/index.jsp',
    '河北省':'http://dzfp.he-n-tax.gov.cn/dzfpFpywQuery.do;jsessionid=Yk_qQymJsjPWZkbkKYTWDbya9JcamBDDfds-i5dsTrgjPS6Vlh_L!-220334468',
    '海南省':'http://www.hitax.gov.cn/'
};


angular.module("app")
    .controller("AppController", function ($scope,$window, AuthService, $rootScope, modal,$timeout,TaskService,QueryService,SmsService,$uibModal,$location) {

        var isIE = !!navigator.userAgent.match(/MSIE/i);
        isIE && angular.element($window.document.body).addClass('ie');
        isSmartDevice($window) && angular.element($window.document.body).addClass('smart');

        function isSmartDevice($window) {
            // Adapted from http://www.detectmobilebrowsers.com
            var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
            // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
            return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
        }
        $scope.app = {
            name: '信贷管理系统',
            version: 'beta 0.0.1',
            // for chart colors
            color: {
                primary: '#7266ba',
                info:    '#23b7e5',
                success: '#27c24c',
                warning: '#fad733',
                danger:  '#f05050',
                light:   '#e8eff0',
                dark:    '#3a3f51',
                black:   '#1c2b36'
            },
            settings: {
                themeID: 1,
                navbarHeaderColor: 'bg-black',
                navbarCollapseColor: 'bg-white-only',
                asideColor: 'bg-black',
                headerFixed: true,
                asideFixed: false,
                asideFolded: false,
                asideDock: false,
                container: false
            }
        }
        $scope.app.settings.headerFixed = true;
        $scope.app.settings.asideFixed =true;
        $scope.$watch('app.settings', function(){
            if( $scope.app.settings.asideDock  &&  $scope.app.settings.asideFixed ){
                // aside dock and fixed must set the header fixed.
                $scope.app.settings.headerFixed = true;
            }
        }, true);
        $scope.app.settings.navbarHeaderColor='bg-info dker';
        $scope.app.settings.navbarCollapseColor='bg-info dk';
        $scope.app.settings.asideColor='bg-black';
        $scope.signup = function () {
            modal.confirm("操作提醒", "确认登出系统？").then(function () {
                AuthService.signup();
                $rootScope.$state.go("access.signin");
            })
        };
        $scope.screenHeight = $window.innerHeight;
        $scope.screentWidth = $window.innerWidth;
        //公共方法-查询申请单反欺诈信息
        $scope.queryFraudInnerResult = function(appId){
            $scope.fraudInnerResultList = QueryService.queryFraudInnerResult(appId).$object;
        }
        //公共方法-查询历史反欺诈信息
        $scope.queryFraudHisInnerResult =  function(appId,taskNodeName){
            $scope.fraudHisResultList = QueryService.queryFraudHisResult(appId,taskNodeName).$object;
        }
        //公共方法-发送短信
        $scope.sendSms = function(appId){
            SmsService.sendSms(appId);
        };
        //公共方法-打开贷后客户详细资料
        $scope.showCustomDetail = function(appId){
            window.open("#/app/loanquery/loaninfo/detail/"+appId);
        };
        //打印PDF文件
        $scope.printPdf = function(appId,key,title){
            var modalInstance = $uibModal.open({
                animation: false,
                size:'lg',
                backdrop:'static',
                templateUrl :'module_utils/tpl/dialog-print-pdf.html',
                controller:function($scope,RestApi,TaskService){
                    $scope.appId = appId;
                    $scope.printTitle = title;
                    $scope.loading = TaskService.getContractOSSKey($scope.appId,key).then(function(response){
                        $scope.pdfUrl = SERVER_URL.OSS_URL+response.osskey;
                    })
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
        };
        //打开发票查询地址
        $scope.openInvoiceUrl = function(provinceList,areaId){
            var url;
            for(var i = 0 ;i<provinceList.length;i++){
                if(areaId == provinceList[i].id){
                    url = InvoiceAreaUrl[provinceList[i].areaName]
                    break;
                }
            }
            if(url==undefined){
                modal.error("未配置发票地址")
            }else{
                window.open(url);
            }
        };
        //打开保险公司查询地址
        $scope.openInsuranceUrl = function(companyList,companyId){
            var url;
            for(var i = 0 ;i<companyList.length;i++){
                if(companyId == companyList[i].id){
                    url = companyList[i].url;
                    break;
                }
            }
            if(url==undefined){
                modal.error("未配置保险公司地址")
            }else{
                window.open(url);
            }
        };
        //打开GPS有线网站地址
        $scope.openGpsWireUrl = function(companyList,companyId){
            var url;
            for(var i = 0 ;i<companyList.length;i++){
                if(companyId == companyList[i].id){
                    url = companyList[i].wiredUrl;
                    break;
                }
            }
            if(url==undefined){
                modal.error("未配置有线地址")
            }else{
                window.open(url);
            }
        };
        //打开GPS无线网站地址
        $scope.openGpsWirelessUrl = function(companyList,companyId){
            var url;
            for(var i = 0 ;i<companyList.length;i++){
                if(companyId == companyList[i].id){
                    url = companyList[i].wirelessUrl;
                    break;
                }
            }
            if(url==undefined){
                modal.error("未配置无线地址")
            }else{
                window.open(url);
            }
        };
        //查看审核结果
        $scope.showApplyCheckResult = function(pathId){
            var modalInstance = $uibModal.open({
                animation: false,
                size:'lg',
                backdrop:false,
                templateUrl :'module_task/tpl/dialog-showApplyCheckResult.html',
                controller:function($scope,RestApi,TaskService,SysDictService){
                    $scope.pathId = pathId;
                    $scope.loanConditionList = SysDictService.queryDictDataByTypeCode("fktj").$object;
                    $scope.checkList = SysDictService.queryDictDataByTypeCode("shrwjglx").$object;
                    $scope.checkRejectReasonList = SysDictService.queryDictDataByTypeCode("shjjyy").$object;
                    $scope.checkCancelReasonList = SysDictService.queryDictDataByTypeCode("shqxyy").$object;
                    $scope.netCheckResultList = SysDictService.queryDictDataByTypeCode("wsjg").$object;
                    $scope.telCheckResultList = SysDictService.queryDictDataByTypeCode("dsjg").$object;
                    $scope.checkVo = TaskService.getCheckVoByPathId($scope.pathId).$object;
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
        };
        $scope.app.settings.asideFolded = $location.search().hiddenAsideFolded=='true'?true:false;

    })
