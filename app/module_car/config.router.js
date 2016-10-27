'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .config(
    ['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                //车辆管理
                .state('app.car',{
                    abstract:true,
                    url:'/car',
                    templateUrl:'module_car/tpl/car-manage.html',
                    controller:function($scope,$state){
                        $scope.goCarBrand = function(){
                            $state.go('app.car.carbrand');
                        };
                        $scope.goCarSerial = function(){
                            $state.go('app.car.carserial');
                        };
                        $scope.goCarStyle = function(){
                            $state.go('app.car.carstyle');
                        };
                        $scope.goCarTemplate = function(){
                            $state.go('app.car.cartemplate');
                        }
                    }
                })
                //品牌管理
                .state('app.car.carbrand',{
                    url:'/carbrand',
                    templateUrl:'module_car/tpl/carbrand-list.html',
                    controller: 'CarBrandController'
                })
                //车系管理
                .state('app.car.carserial',{
                    url:'/carserial',
                    templateUrl:'module_car/tpl/carserial-list.html',
                    controller: 'CarSerialController'
                })
                //车系款式管理
                .state('app.car.carstyle',{
                    url:'/carstyle',
                    templateUrl:'module_car/tpl/carstyle-list.html',
                    controller: 'CarStyleController'
                })
                //经销商可选车辆模板
                .state('app.car.cartemplate',{
                    url:'/cartemplate',
                    templateUrl:'module_car/tpl/cartemplate-list.html',
                    controller: 'CarTemplateController'
                })

        }
    ]
);