'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .config(
    ['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                //产品管理
                .state('app.product', {
                    url: '/product',
                    templateUrl: 'module_product/tpl/product-manage.html',
                    controller:function($scope,$state){
                        $scope.productConfig = function(){
                            $state.go('app.product.config');
                        }
                        $scope.productRuleConfig = function(){
                            $state.go('app.product.rule');
                        }
                    }
                })
                //产品管理-查询产品列表
                .state('app.product.config', {
                    url: '/config',
                    templateUrl: 'module_product/tpl/product-config.html',
                    controller: 'ProductController'
                })
                //产品管理-产品规则模板管理
                .state('app.product.rule', {
                    url: '/rule',
                    templateUrl: 'module_product/tpl/product-rule-list.html',
                    controller: 'ProductRuleController'
                })

        }
    ]
);