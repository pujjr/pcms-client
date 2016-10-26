'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .config(
    ['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                //合同管理
                .state('app.contract',{
                    abstract:true,
                    url:'/contract',
                    templateUrl:'module_contract/tpl/contract-manage.html',
                    controller:'ContractController'
                })
                //合同管理-合同信息管理
                .state('app.contract.contractinfo',{
                    url:'/contractinfo',
                    templateUrl:'module_contract/tpl/contractinfo-list.html',
                    controller: 'ContractInfoController'
                })
                //合同管理-合同模板管理
                .state('app.contract.contracttemplate',{
                    url:'/contracttemplate',
                    templateUrl:'module_contract/tpl/contracttemplate-list.html',
                    controller: 'ContractTemplateController'
                })

        }
    ]
);