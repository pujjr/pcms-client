angular.module('app')
    .run(
    ['$rootScope', '$state', '$stateParams', '$cacheFactory', 'AuthService',
        function ($rootScope, $state, $stateParams, $cacheFactory, AuthService,QueryService) {
            $rootScope.$state = $state;
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
        //cfpLoadingBarProvider.includeSpinner = true;
        //cfpLoadingBarProvider.includeBar = true;
        //cfpLoadingBarProvider.spinnerTemplate = "<span>Loading...</span>";
    }])
    .value('cgBusyDefaults',{
        message:'正在加载'
    });