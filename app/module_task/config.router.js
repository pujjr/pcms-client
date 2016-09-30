'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .config(
    ['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                //任务管理
                .state('app.task', {
                    url: '/task',
                    abstract: true,
                    template:'<div ui-view=""></div>'
                })
                //查询待办任务
                .state('app.task.todolist',{
                    url:'/todo',
                    templateUrl:'module_task/tpl/todotask-list.html',
                    controller:'TaskController'
                })
                .state('app.task.process', {
                    url: '/process',
                    abstract: true,
                    template:'<div ui-view=""></div>',
                    controller:'ApplyController'
                })
                .state('app.task.process.check',{
                    url:'/check/:procInstId/:taskId/:businessKey',
                    templateUrl:'module_task/tpl/apply-check.html',
                    controller:'CheckController'
                })
                .state('app.task.process.approve',{
                    url:'/approve/:procInstId/:taskId/:businessKey',
                    templateUrl:'module_task/tpl/apply-approve.html',
                    controller:'ApproveController'
                })
                .state('app.task.handleassignee',{
                    url:'/handleassignee',
                    templateUrl:'module_task/tpl/handleassignee-list.html',
                    controller:'AssigneeController'
                })

        }
    ]
);