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

        }
    ]
);