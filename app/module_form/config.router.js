'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .config(
    ['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                //表单管理
                .state('app.form',{
                    abstract:true,
                    url:'/form',
                    templateUrl:'module_form/tpl/form-manage.html',
                    controller:function($scope,$state){
                        $scope.goField = function(){
                            $state.go('app.form.field');
                        };
                        $scope.goTemplate = function(){
                            $state.go('app.form.template');
                        }
                    }
                })
                //表单输入域设置
                .state('app.form.field',{
                    url:'/field',
                    templateUrl:'module_form/tpl/field-list.html',
                    controller: 'FormFieldController'
                })
                //表单模板
                .state('app.form.template',{
                    url:'/template',
                    templateUrl:'module_form/tpl/template-list.html',
                    controller: 'FormFieldTemplateController'
                })

        }
    ]
);