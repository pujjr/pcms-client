angular.module('pu.access.services')
    .service('AuthService', ['$rootScope', 'AuthRestangular', '$state', '$q', 'CarCreditRestangular','BackgroundRestApi', '$uibModal', 'toaster','$timeout','RestApi',
        function ($rootScope, AuthRestangular, $state, $q, CarCreditRestangular,BackgroundRestApi, $uibModal, toaster,$timeout,RestApi) {
        var isAuth = false;
        var authResource = {};
        var timer;
        var uploadStatus  = function(){
            timer = $timeout(function(){
                BackgroundRestApi.all("/sysaccount/heartbeat").post().then(function(){
                    $rootScope.loginStatus = "在线";
                },function(){
                    $rootScope.loginStatus = "离线";
                });
                uploadStatus();
            },60000);
        };
        this.login = function (id, passwd) {
            var user = {};
            user.accountId = id;
            user.password = passwd;
            var defered = $q.defer();
            AuthRestangular.all('auth').post(user).then(function (response) {
                if (response.successResponse) {
                    window.localStorage.Authorization = response.data.Authorization;
                    window.localStorage.account = angular.toJson(response.data.account);
                    $rootScope.account = response.data.account;
                    uploadStatus();
                    RestApi.all('sysaccount').all("authmenu").all(id).getList().then(function (response) {
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
            user.accountId = angular.fromJson(window.localStorage.account).id;
            user.oldPasswd = oldPasswd;
            user.newPasswd = newPasswd;
            var defered = $q.defer();
            CarCreditRestangular.all('accounts').all('modifyPasswd').post(user).then(function (response) {
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
            var regx = /^[0-9]+$|^[a-z]+$|^[A-Z]+$/;
            return regx.test(val) || val.length < 8;
        };
        this.signup = function () {
            CarCreditRestangular.all("/sysaccount/loginout").post();
            $timeout.cancel(timer);
            isAuth = false;
            authResource = {};
            window.localStorage.removeItem("Authorization");
            window.localStorage.removeItem("account");

        };
        this.initUserInfo = function () {
            $rootScope.account = window.localStorage.account;
            CarCreditRestangular.all('sysaccount').all("authmenu").all($rootScope.account.accountId).getList().then(function (response) {
                angular.forEach(response, function (item) {
                    authResource[item.menuId] = 'all';
                })
                isAuth = true;
            });
        };
        this.resetPasswd = function (id) {
            var defered = $q.defer();
            CarCreditRestangular.all("accounts").all("resetPasswd").post(id).then(function (response) {
                defered.resolve();
            }, function (response) {
                defered.reject(response.message);
            });
            return defered.promise;
        }
    }]);
