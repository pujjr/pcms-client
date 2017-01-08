angular.module("app")
    .controller("AppController", function ($scope,$window, AuthService, $rootScope, modal,$timeout,TaskService,QueryService,SmsService) {

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
            name: '信贷审批管理系统',
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

    })
