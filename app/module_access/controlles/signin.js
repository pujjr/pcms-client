'use strict';

/* Controllers */
// signin controllers
angular.module('pu.access.controllers')
    .controller('SigninFormController', ['$scope', '$http', '$rootScope', '$state', 'AuthRestangular', 'CarCreditRestangular', 'AuthService',
        function ($scope, $http, $rootScope, $state, AuthRestangular, CarCreditRestangular, AuthService) {
            $scope.user = {};
            $scope.authError = null;

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