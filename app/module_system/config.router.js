'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .config(
    ['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                //机构管理
                .state('app.sysbranch', {
                    abstract: true,
                    url: '/sysbranch',
                    template: '<div ui-view=""></div>',
                    controller: 'SysBranchController'
                })
                //经销商管理-查询经销商列表
                .state('app.sysbranch.list', {
                    url: '/list',
                    templateUrl: 'module_system/tpl/sysbranch-list.html'
                })
                //区域管理
                .state('app.sysarea',{
                    abstract: true,
                    url:'/sysarea',
                    template:'<div ui-view=""></div>',
                    controller: 'SysAreaController'
                })
                //区域管理-查询区域列表
                .state('app.sysarea.list', {
                    url: '/list',
                    templateUrl: 'module_system/tpl/sysarea-list.html'
                })
                //数据字典管理
                .state('app.sysdict',{
                    abstract: true,
                    url:'/sysdict',
                    template:'<div ui-view=""></div>',
                    controller: 'SysDictController'
                })
                //数据字典管理-查询数据字典列表
                .state('app.sysdict.list', {
                    url: '/list',
                    templateUrl: 'module_system/tpl/sysdict-list.html'
                })
                //岗位管理
                .state('app.sysjob',{
                    abstract: true,
                    url:'/sysjob',
                    template:'<div ui-view=""></div>',
                    controller: 'SysJobController'
                })
                //岗位管理-查询岗位列表
                .state('app.sysjob.list',{
                    url:'/list',
                    templateUrl:'module_system/tpl/sysjob-list.html'
                })
        }
    ]
);