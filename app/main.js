angular.module("app")
    .controller("AppController", function ($scope,$window, AuthService, $rootScope, modal,$timeout,TaskService,QueryService,SmsService,$uibModal) {

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
        }
    })
