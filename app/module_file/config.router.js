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
                .state('app.file', {
                    url: '/file',
                    abstract: true,
                    templateUrl: 'module_file/tpl/content-manage.html'
                })
                //产品管理-查询产品列表
                .state('app.file.directory', {
                    url: '/directory',
                    templateUrl: 'module_file/tpl/directory-manage.html',
                    controller: 'DirectoryController'
                })

        }
    ]
);