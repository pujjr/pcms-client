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
                //工作组管理
                .state('app.sysworkgroup',{
                    abstract: true,
                    url:'/sysworkgroup',
                    template:'<div ui-view=""></div>',
                    controller: 'SysWorkgroupController'
                })
                //工作组管理-查询工作组列表
                .state('app.sysworkgroup.list',{
                    url:'/list',
                    templateUrl:'module_system/tpl/sysworkgroup-list.html'
                })
                //系统参数管理
                .state('app.sysparam',{
                    abstract: true,
                    url:'/sysparam',
                    template:'<div ui-view=""></div>',
                    controller: 'SysParamController'
                })
                //参数管理-查询参数列表
                .state('app.sysparam.list',{
                    url:'/list',
                    templateUrl:'module_system/tpl/sysparam-list.html'
                })
                //银行信息管理
                .state('app.bankinfo',{
                    abstract: true,
                    url:'/bankinfo',
                    template:'<div ui-view=""></div>',
                    controller: 'BankController'
                })
                //银行信息管理-查询列表
                .state('app.bankinfo.list',{
                    url:'/list',
                    templateUrl:'module_system/tpl/bankinfo-list.html'
                })
                //单位信息管理
                .state('app.unitinfo',{
                    abstract: true,
                    url:'/unitinfo',
                    template:'<div ui-view=""></div>',
                    controller: 'UnitInfoController'
                })
                //银行信息管理-查询列表
                .state('app.unitinfo.list',{
                    url:'/list',
                    templateUrl:'module_system/tpl/unitinfo-list.html'
                })
                //商户信息管理
                .state('app.merchant',{
                    abstract: true,
                    url:'/merchant',
                    template:'<div ui-view=""></div>',
                    controller: 'MerchantController'
                })
                //银行信息管理-查询列表
                .state('app.merchant.list',{
                    url:'/list',
                    templateUrl:'module_system/tpl/merchant-list.html'
                })
                //保险公司参数管理
                .state('app.insurance',{
                    abstract: true,
                    url:'/insurance',
                    template:'<div ui-view=""></div>',
                    controller: 'InsuranceController'
                })
                //保险公司参数管理-查询列表
                .state('app.insurance.list',{
                    url:'/list',
                    templateUrl:'module_system/tpl/insurancecompany-list.html'
                })
                //菜单管理
                .state('app.sysmenu',{
                    abstract: true,
                    url:'/sysmenu',
                    template:'<div ui-view=""></div>',
                    controller: 'SysMenuController'
                })
                //菜单管理-查询菜单列表
                .state('app.sysmenu.list', {
                    url: '/list',
                    templateUrl: 'module_system/tpl/sysmenu-list.html'
                })
                //角色管理
                .state('app.sysrole',{
                    abstract: true,
                    url:'/sysrole',
                    template:'<div ui-view=""></div>',
                    controller: 'SysRoleController'
                })
                //角色管理-查询角色列表
                .state('app.sysrole.list', {
                    url: '/list',
                    templateUrl: 'module_system/tpl/sysrole-list.html'
                })
        }
    ]
);