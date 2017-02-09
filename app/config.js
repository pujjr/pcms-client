angular.module('app')
    .run(
    ['$rootScope', '$state', '$stateParams', '$cacheFactory', 'AuthService',
        function ($rootScope, $state, $stateParams, $cacheFactory, AuthService,QueryService) {
            $rootScope.$state = $state;
            $rootScope.tabData   = [
                {
                    heading: '申请单查询',
                    route:   'app.query.applylist'
                },
                {
                    heading: 'Accounts',
                    route:   'app.product'
                }
            ];
            $rootScope.$stateParams = $stateParams;
            $rootScope.cache = $cacheFactory('$rootScope');
            $rootScope.resetCache = function () {
                $rootScope.paginationInfo = {
                    totalItem: 0,
                    pageSize: 10,
                    curPage: 1,
                    maxSize: 5
                };
                $rootScope.vm = {};
            };
            $rootScope.resetPage = function(){
                $rootScope.paginationInfo = {
                    totalItem: 0,
                    pageSize: 10,
                    curPage: 1,
                    maxSize: 5
                };
            }
            //注册路由变更成功处理方法
            $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
                var data = {};
                data.paginationInfo = $rootScope.paginationInfo;
                data.vm = $rootScope.vm;
                $rootScope.cache.put(fromState.name, data);
                $rootScope.cache.put("previousStateName", fromState.name);
                $rootScope.cache.put("previousStateParams",fromParams);
                if ($rootScope.stateConvertType != "toback") {
                    $rootScope.resetCache();
                }
                $rootScope.stateConvertType = "";
            });
            //注册路由变更开始处理方法
            $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
                console.log("stateChangeStart");
            });
            //返回上级路由
            $rootScope.back = function () {
                var previousStateName = $rootScope.cache.get("previousStateName");
                var previousStateParams = $rootScope.cache.get("previousStateParams");
                var data = $rootScope.cache.get(previousStateName);
                $rootScope.paginationInfo = data.paginationInfo;
                $rootScope.vm = data.vm;
                $rootScope.stateConvertType = "toback";
                //$state.go(previousStateName);
                $state.transitionTo(previousStateName,previousStateParams);
            };
            //检查资源授权
            $rootScope.hasPrimission = function (resourceId) {
                return AuthService.hasAuthResource(resourceId);
            };
            //重置缓存
            $rootScope.resetCache();
            //重cookie验证用户
            AuthService.initUserFormCookie();

        }
    ])
    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = true;
        cfpLoadingBarProvider.includeBar = true;
        cfpLoadingBarProvider.spinnerTemplate = "<span>Loading...</span>";
    }])
    //表单验证中文提示
    .run([
        'defaultErrorMessageResolver',
        function (defaultErrorMessageResolver) {
            // passing a culture into getErrorMessages('fr-fr') will get the culture specific messages
            // otherwise the current default culture is returned.
            defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                errorMessages['date'] = '请输入合法的日期';
                errorMessages['email'] = '请输入合法的邮箱地址';
                errorMessages['max'] = '请输入的最大数值 {0}';
                errorMessages['min'] = '请输入的最小数值 {0}';
                errorMessages['maxlength'] = '请输入的最大长度 {0}';
                errorMessages['minlength'] = '请输入的最小长度 {0}';
                errorMessages['number'] = '请输入的合法的数值';
                errorMessages['required'] = '必填项';
            });
        }
    ])
    //加载进度条提示消息
    .value('cgBusyDefaults',{
        message:'正在加载数据，请稍候'
    })
    //配置iframe跨域访问白名单
    .config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://view.officeapps.live.com/**']);
});
