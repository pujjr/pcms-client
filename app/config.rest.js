angular.module('app')
    .factory('AuthRestangular', ['Restangular', 'modal', function (Restangular, modal) {
        return Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(SERVER_URL.AUTH_SERVER_URL);
            RestangularConfigurer.setErrorInterceptor(function (response, deferred, responseHandler) {
                modal.error("系统错误，请重试");
            });
        });
    }])
    .factory('BackgroundRestApi', ['Restangular', 'modal','$rootScope', function (Restangular,modal,$rootScope) {
        return Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(SERVER_URL.API_SERVER_URL);
            RestangularConfigurer.setFullRequestInterceptor(function (element, operation, route, url, headers, params, httpConfig) {
                return {
                    headers: {
                        'Authorization': $rootScope.Authorization
                    }
                };
            });
        });
    }])
    .factory('RestApi', ['Restangular', '$state', 'modal', '$rootScope', '$injector', function (Restangular, $state, modal, $rootScope, $injector) {
        return Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(SERVER_URL.API_SERVER_URL);
            RestangularConfigurer.setFullRequestInterceptor(function (element, operation, route, url, headers, params, httpConfig) {
                var page = {};
                if (operation == 'getList') {
                    page.pageSize = params.pageSize || $rootScope.paginationInfo.pageSize;
                    page.curPage = params.curPage || $rootScope.paginationInfo.curPage;
                };
                angular.extend($rootScope.vm,page);
                angular.extend($rootScope.vm, params);
                var newHeaders = {
                    'Authorization': $rootScope.Authorization
                };
                angular.extend(newHeaders,headers);
                return {
                    headers: newHeaders,
                    params:$rootScope.vm
                };
            });
            RestangularConfigurer.setErrorInterceptor(function (response, deferred, responseHandler) {
                var AuthService = $injector.get('AuthService');
                if (response.status == 401) {
                    if (AuthService.isAuth()) {
                        AuthService.reLogin();
                    } else {
                        modal.error("未授权操作，请重新登陆");
                        $state.go('access.signin');
                    }

                }else if(response.status ==404){

                }
                else {
                    modal.error("查询数据错误，请重试！");
                }
                ;
            });
            RestangularConfigurer.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
                if (data.successResponse == false) {
                    modal.error(data.message);
                    return deferred.reject();
                } else {
                    if (operation == 'getList') {
                        if (angular.isArray(data)) {
                            return data;
                        } else {
                            //如果为getList操作返回的不是Array对象则为翻页数据需特殊处理
                            $rootScope.paginationInfo.totalItem = data.totalItem;
                            return data.data;
                        }
                    } else {
                        return data;
                    }
                }
            });
        });
    }])
    .factory('QuestionRestangular',function(CarCreditRestangular){
        return RestApi.withConfig(function(RestangularConfigurer){
            RestangularConfigurer.setBaseUrl(SERVER_URL.API_SERVER_URL);
        })
    })
    .factory('CarCreditRestangular',function(RestApi){
        return  RestApi.withConfig(function(RestangularConfigurer){
            RestangularConfigurer.setBaseUrl(SERVER_URL.API_SERVER_URL);
        })
    })

