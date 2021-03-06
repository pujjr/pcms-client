angular.module('pu.access.services')
    .service('AuthService', ['$rootScope', 'AuthRestangular', '$state', '$q', 'CarCreditRestangular','BackgroundRestApi', '$uibModal', 'toaster','$timeout','RestApi','ipCookie',
        function ($rootScope, AuthRestangular, $state, $q, CarCreditRestangular,BackgroundRestApi, $uibModal, toaster,$timeout,RestApi,ipCookie) {
        var isAuth = false;
        var authResource = {};
        var timer;
        var doHeartBeat = function(){
            BackgroundRestApi.all("/sysaccount/heartbeat").post().then(function(){
                $rootScope.loginStatus = "在线";
            },function(){
                $rootScope.loginStatus = "离线";
            });
        }
        var uploadStatus  = function(){
            timer = $timeout(function(){
                doHeartBeat();
                uploadStatus();
            },30000);
        };
        this.login = function (id, passwd) {
            var user = {};
            user.accountId = id;
            user.password = passwd;
            var defered = $q.defer();
            AuthRestangular.all('auth').post(user).then(function (response) {
                if (response.successResponse) {
                    //保存登陆验证成功信息
                    ipCookie("Authorization", response.data.Authorization);
                    ipCookie("account", response.data.account);
                    //window.localStorage.Authorization = response.data.Authorization;
                    //window.localStorage.account = angular.toJson(response.data.account);
                    $rootScope.Authorization = response.data.Authorization;
                    $rootScope.account = response.data.account;
                    //先报一次心跳
                    doHeartBeat();
                    //再启动心跳服务
                    uploadStatus();
                    //获取用户授权功能
                    RestApi.all('sysaccount').all("authmenu").all(id).getList().then(function (response) {
                        authResource = {};
                        angular.forEach(response, function (item) {
                            authResource[item.menuId] = 'all';
                        })
                        isAuth = true;
                        defered.resolve();
                    });
                }
                else {
                    defered.reject(response.message);
                }
            })
            return defered.promise;
        };
        this.hasAuthResource = function (resourceId) {
            return authResource[resourceId] == 'all';
        };
        this.isAuth = function () {
            return isAuth;
        };
        this.modifyPasswd = function (oldPasswd, newPasswd) {
            var user = {};
            //user.accountId = angular.fromJson(window.localStorage.account).id;
            user.oldPasswd = oldPasswd;
            user.newPasswd = newPasswd;
            var defered = $q.defer();
            RestApi.all('sysaccount').all('modifyPasswd').post(user).then(function (response) {
                defered.resolve();
            }, function (response) {
                defered.reject(response.message);
            })
            return defered.promise;
        };
        this.reLogin = function () {
            var $uibModalInstance = $uibModal.open({
                animation: true,
                backdrop: true,
                templateUrl: 'app/login/tpl/dialog-relogin.html',
                controller: function ($scope, AuthService) {
                    $scope.reLogin = function () {
                        AuthService.login($scope.user.accountid, $scope.user.passwd).then(function (response) {
                            $uibModalInstance.close();
                            toaster.pop('success', '操作提醒', '重新登陆成功');
                        }, function (response) {
                            $scope.errmsg = response;
                        })
                    };
                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                }
            });
        };
        this.isWeakPasswd = function (val) {
            var regx = /^[0-9]+$|^[a-z]+$/;
            return regx.test(val) || val.length < 8;
        };
        //用户登出
        this.signup = function () {
            RestApi.all("/sysaccount/loginout").post();
            $timeout.cancel(timer);
            isAuth = false;
            authResource = {};
            ipCookie.remove("Authorization");
            ipCookie.remove("account");
            ipCookie.remove("authMenu");

        };
        this.initUserFormCookie = function () {
            //从cookie获取token信息
            $rootScope.Authorization  = ipCookie("Authorization");
            if($rootScope.Authorization==undefined){
                $state.go("access.signin");
            }else{
                //从cookie获取账户信息
                $rootScope.account = ipCookie("account");
                RestApi.all('sysaccount').all("authmenu").all($rootScope.account.accountId).getList().then(function (response) {
                    angular.forEach(response, function (item) {
                        authResource[item.menuId] = 'all';
                    })
                    isAuth = true;
                    //这里是刷新页面后要重新启动心跳检查
                    doHeartBeat();
                    uploadStatus();
                });
            }
        };
        this.resetPasswd = function (id) {
            var defered = $q.defer();
            RestApi.all("accounts").all("resetPasswd").post(id).then(function (response) {
                defered.resolve();
            }, function (response) {
                defered.reject(response.message);
            });
            return defered.promise;
        }
    }]);
