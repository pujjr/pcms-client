'use strict';

/* Controllers */
// signin controllers
angular.module("pu.holiday.controllers")
    .controller('HolidayController',function ($scope, $rootScope, $state, toaster, $uibModal,HolidayService,uiCalendarConfig,$compile) {
        $scope.init = function(){
            var date = new Date();
            $scope.curYear = date.getFullYear();
            $scope.getHolidayList();
            $scope.showYear($scope.curYear);

        };
        $scope.getHolidayList = function(){
            HolidayService.getHolidayList().then(function(response){
               // $scope.events.length=0;
                $scope.eventSources.length=0;
                var tmp = [];
                angular.forEach(response,function(item){
                    tmp.push({id:item.id,title:item.holidayDesc,start:new Date(parseInt(item.holidayDate)),createId:item.createId,createTime:item.createTime})
                });
                $scope.eventSources.push(tmp);

            });
        };

        $scope.preYear = function(){
            $scope.curYear =  $scope.curYear -1;
            $scope.showYear($scope.curYear);
        };
        $scope.nextYear = function(){
            $scope.curYear =  $scope.curYear +1;
            $scope.showYear($scope.curYear);
        }
        $scope.showYear = function(year){
            $scope.uiConfig.calendarM1.defaultDate = year+"-01"+"-01";
            $scope.uiConfig.calendarM2.defaultDate = year+"-02"+"-01";
            $scope.uiConfig.calendarM3.defaultDate = year+"-03"+"-01";
            $scope.uiConfig.calendarM4.defaultDate = year+"-04"+"-01";
            $scope.uiConfig.calendarM5.defaultDate = year+"-05"+"-01";
            $scope.uiConfig.calendarM6.defaultDate = year+"-06"+"-01";
            $scope.uiConfig.calendarM7.defaultDate = year+"-07"+"-01";
            $scope.uiConfig.calendarM8.defaultDate = year+"-08"+"-01";
            $scope.uiConfig.calendarM9.defaultDate = year+"-09"+"-01";
            $scope.uiConfig.calendarM10.defaultDate = year+"-10"+"-01";
            $scope.uiConfig.calendarM11.defaultDate = year+"-11"+"-01";
            $scope.uiConfig.calendarM12.defaultDate = year+"-12"+"-01";
        }
        $scope.eventRender = function( event, element, view ) {
            element.attr({'tooltip': event.title,
                'tooltip-append-to-body': true});
            $compile(element)($scope);
        };
        $scope.alertEventOnClick = function(date, jsEvent, view){
            var item = {};
            item.id=date.id;
            item.holidayDesc = date.title;
            item.holidayDate = date.start._d.getTime();
            item.createId = date.createId;
            item.createTime = date.createTime;
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop:'false',
                resolve: {
                    item: function(){
                        return item;
                    }
                },
                templateUrl :'module_holiday/tpl/dialog-holiday-edit.html',
                controller:function($scope,RestApi){
                    $scope.item=item;
                    $scope.ok=function(){
                        HolidayService.modifyHoliday($scope.item).then(function(){
                            modalInstance.close('修改成功');
                        })
                    };
                    $scope.delete = function(){
                        HolidayService.deleteHoliday(item.id).then(function(){
                            modalInstance.close('删除成功');
                        })
                    }
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                toaster.pop('success', '操作提醒', response);
                $scope.getHolidayList();
            })
        };
        $scope.dayClick = function(date, jsEvent, view, resourceObj){
            console.log('Date: ' + date.format());
        };
        $scope.eventRender= function(event, element) {
            element.html(event.title);
        };
        $scope.uiConfig = {
            calendarM1:{
                height: 450,
                aspectRatio: 1,
                editable: false,
                dayNamesShort:['日', '一', '二', '三', '四', '五', '六'],
                monthNames:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
                monthNamesShort:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
                header:{
                    left: '',
                    center: 'title',
                    right: ''
                },
                fixedWeekCount:true,
                eventClick: $scope.alertEventOnClick,
                eventRender: $scope.eventRender,
                dayClick: function(date, jsEvent, view, resourceObj) {
                    $scope.dayClick(date, jsEvent, view, resourceObj)
                }
            },
            calendarM2:{
                height: 450,
                aspectRatio: 1,
                editable: false,
                fixedWeekCount:true,
                defaultDate:'2016-02-01',
                dayNamesShort:['日', '一', '二', '三', '四', '五', '六'],
                monthNames:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
                monthNamesShort:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
                header:{
                    left: '',
                    center: 'title',
                    right: ''
                },
                eventClick: $scope.alertEventOnClick,
                eventRender: $scope.eventRender,
                dayClick: function(date, jsEvent, view, resourceObj) {
                    $scope.dayClick(date, jsEvent, view, resourceObj)
                }
            },
            calendarM3:{
                height: 450,
                aspectRatio: 1,
                editable: false,
                fixedWeekCount:true,
                defaultDate:'2016-03-01',
                dayNamesShort:['日', '一', '二', '三', '四', '五', '六'],
                monthNames:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
                monthNamesShort:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
                header:{
                    left: '',
                    center: 'title',
                    right: ''
                },
                eventClick: $scope.alertEventOnClick,
                eventRender: $scope.eventRender,
                dayClick: function(date, jsEvent, view, resourceObj) {
                    $scope.dayClick(date, jsEvent, view, resourceObj)
                }
            },
            calendarM4:{
                height: 450,
                aspectRatio: 1,
                editable: false,
                fixedWeekCount:true,
                defaultDate:'2016-04-01',
                dayNamesShort:['日', '一', '二', '三', '四', '五', '六'],
                monthNames:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
                monthNamesShort:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
                header:{
                    left: '',
                    center: 'title',
                    right: ''
                },
                eventClick: $scope.alertEventOnClick,
                eventRender: $scope.eventRender,
                dayClick: function(date, jsEvent, view, resourceObj) {
                    $scope.dayClick(date, jsEvent, view, resourceObj)
                }
            },
            calendarM5:{
                height: 450,
                aspectRatio: 1,
                editable: false,
                fixedWeekCount:true,
                defaultDate:'2016-05-01',
                dayNamesShort:['日', '一', '二', '三', '四', '五', '六'],
                monthNames:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
                monthNamesShort:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
                header:{
                    left: '',
                    center: 'title',
                    right: ''
                },
                eventClick: $scope.alertEventOnClick,
                eventRender: $scope.eventRender,
                dayClick: function(date, jsEvent, view, resourceObj) {
                    $scope.dayClick(date, jsEvent, view, resourceObj)
                }
            },
            calendarM6:{
                height: 450,
                aspectRatio: 1,
                editable: false,
                fixedWeekCount:true,
                defaultDate:'2016-06-01',
                dayNamesShort:['日', '一', '二', '三', '四', '五', '六'],
                monthNames:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
                monthNamesShort:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
                header:{
                    left: '',
                    center: 'title',
                    right: ''
                },
                eventClick: $scope.alertEventOnClick,
                eventRender: $scope.eventRender,
                dayClick: function(date, jsEvent, view, resourceObj) {
                    $scope.dayClick(date, jsEvent, view, resourceObj)
                }
            },
            calendarM7:{
                height: 450,
                aspectRatio: 1,
                editable: false,
                fixedWeekCount:true,
                defaultDate:'2016-07-01',
                dayNamesShort:['日', '一', '二', '三', '四', '五', '六'],
                monthNames:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
                monthNamesShort:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
                header:{
                    left: '',
                    center: 'title',
                    right: ''
                },
                eventRender: $scope.eventRender,
                dayClick: function(date, jsEvent, view, resourceObj) {
                    $scope.dayClick(date, jsEvent, view, resourceObj)
                }
            },
            calendarM8:{
                height: 450,
                aspectRatio: 1,
                editable: false,
                fixedWeekCount:true,
                defaultDate:'2016-08-01',
                dayNamesShort:['日', '一', '二', '三', '四', '五', '六'],
                monthNames:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
                monthNamesShort:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
                header:{
                    left: '',
                    center: 'title',
                    right: ''
                },
                eventClick: $scope.alertEventOnClick,
                eventRender: $scope.eventRender,
                dayClick: function(date, jsEvent, view, resourceObj) {
                    $scope.dayClick(date, jsEvent, view, resourceObj)
                }
            },
            calendarM9:{
                height: 450,
                aspectRatio: 1,
                editable: false,
                fixedWeekCount:true,
                defaultDate:'2016-09-01',
                dayNamesShort:['日', '一', '二', '三', '四', '五', '六'],
                monthNames:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
                monthNamesShort:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
                header:{
                    left: '',
                    center: 'title',
                    right: ''
                },
                eventClick: $scope.alertEventOnClick,
                eventRender: $scope.eventRender,
                dayClick: function(date, jsEvent, view, resourceObj) {
                    $scope.dayClick(date, jsEvent, view, resourceObj)
                }
            },
            calendarM10:{
                height: 450,
                aspectRatio: 1,
                editable: false,
                fixedWeekCount:true,
                defaultDate:'2016-10-01',
                dayNamesShort:['日', '一', '二', '三', '四', '五', '六'],
                monthNames:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
                monthNamesShort:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
                header:{
                    left: '',
                    center: 'title',
                    right: ''
                },
                eventClick: $scope.alertEventOnClick,
                eventRender: $scope.eventRender,
                dayClick: function(date, jsEvent, view, resourceObj) {
                    $scope.dayClick(date, jsEvent, view, resourceObj)
                }
            },
            calendarM11:{
                height: 450,
                aspectRatio: 1,
                editable: false,
                fixedWeekCount:true,
                defaultDate:'2016-11-01',
                dayNamesShort:['日', '一', '二', '三', '四', '五', '六'],
                monthNames:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
                monthNamesShort:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
                header:{
                    left: '',
                    center: 'title',
                    right: ''
                },
                eventClick: $scope.alertEventOnClick,
                eventRender: $scope.eventRender,
                dayClick: function(date, jsEvent, view, resourceObj) {
                    $scope.dayClick(date, jsEvent, view, resourceObj)
                }
            },
            calendarM12:{
                height: 450,
                aspectRatio: 1,
                editable: false,
                fixedWeekCount:true,
                defaultDate:'2016-12-01',
                dayNamesShort:['日', '一', '二', '三', '四', '五', '六'],
                monthNames:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
                monthNamesShort:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
                header:{
                    left: '',
                    center: 'title',
                    right: ''
                },
                eventClick: $scope.alertEventOnClick,
                eventRender: $scope.eventRender,
                dayClick: function(date, jsEvent, view, resourceObj) {
                    $scope.dayClick(date, jsEvent, view, resourceObj)
                }
            }
        };
        $scope.events=[];
        $scope.eventSources = [];

        $scope.addHoliday = function(){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop:'false',
                templateUrl :'module_holiday/tpl/dialog-holiday-add.html',
                controller:function($scope,RestApi){
                    $scope.item={};
                    $scope.ok=function(){
                        modalInstance.close($scope.item);
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                HolidayService.addHoliday(response).then(function(){
                    toaster.pop('success', '操作提醒', '增加成功');
                    $scope.getHolidayList();
                })
            })
        }

        $scope.initHoliday = function(){
            var modalInstance = $uibModal.open({
                animation: false,
                backdrop:'false',
                templateUrl :'module_holiday/tpl/dialog-holiday-init.html',
                controller:function($scope,RestApi){
                    $scope.item={};
                    $scope.ok=function(){
                        modalInstance.close($scope.item);
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function(response){
                HolidayService.initHoliday(response).then(function(){
                    toaster.pop('success', '操作提醒', '增加成功');
                    $scope.getHolidayList();
                })
            })
        }
    })
;