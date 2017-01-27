'use strict';

/* Controllers */
// signin controllers
angular.module('pu.access.controllers')
    .controller('SigninFormController', ['$scope', '$http', '$rootScope', '$state', 'AuthRestangular', 'CarCreditRestangular', 'AuthService',
        function ($scope, $http, $rootScope, $state, AuthRestangular, CarCreditRestangular, AuthService) {
            $scope.user = {};
            $scope.authError = null;
            $scope.slides = [{
                id:0,
                image:'http://www.pujjr.com/e/images/banner/%E7%84%A6%E7%82%B9%E5%9B%BE1.jpg'
            },{
                id:1,
                image:'http://www.pujjr.com/e/images/banner/%E9%A3%8E%E5%85%89580.jpg'
            }]
            $scope.login = function () {
                $scope.authError = null;
                AuthService.login($scope.user.accountId, $scope.user.password).then(function (response) {
                    $state.go('app.index');
                    /*
                    if (AuthService.isWeakPasswd($scope.user.password)) {
                        $state.go('access.modifyweakpasswd');
                    } else {
                        $state.go('app.index');
                    }*/

                }, function (response) {
                    $scope.authError = response;
                })
            };
        }])
;