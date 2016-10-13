'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .config(
    ['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                //目录管理
                .state('app.file', {
                    url: '/file',
                    abstract: true,
                    templateUrl: 'module_file/tpl/content-manage.html'
                })
                //目录管理-配置文件目录
                .state('app.file.directory', {
                    url: '/directory',
                    templateUrl: 'module_file/tpl/directory-manage.html',
                    controller: 'DirectoryController'
                })
                //目录分类管理-查询分类列表
                .state('app.file.category', {
                    url: '/category',
                    templateUrl: 'module_file/tpl/category-manage.html',
                    controller: 'CategoryController'
                })
                //目录分类管理-查询分类列表
                .state('app.file.template', {
                    url: '/template',
                    templateUrl: 'module_file/tpl/template-manage.html',
                    controller: 'TemplateController'
                })
                .state('app.template',{
                    url:'/template/config',
                    abstract:true,
                    template: '<div ui-view=""></div>'
                })
                .state('app.template.config-step1',{
                    url:'/config-step1/:tplId',
                    templateUrl:'module_file/tpl/template-config-step1.html',
                    controller:'TemplateController'
                })
                .state('app.template.config-step2',{
                    url:'/config-step2/:tplId',
                    templateUrl:'module_file/tpl/template-config-step2.html',
                    controller:'TemplateController'
                })

        }
    ]
);