angular.module('pu.holiday.services')
    .service("HolidayService",function($window,RestApi){
        this.getHolidayList = function(){
            return RestApi.all("/holiday").getList();
        };
        this.addHoliday = function(item){
            return RestApi.all("/holiday").post(item);
        };
        this.modifyHoliday = function(item){
            return RestApi.one("/holiday",item.id).customPUT(item);
        };
        this.deleteHoliday = function(id){
            return RestApi.one("/holiday",id).remove();
        };
        this.initHoliday = function(item){
            return RestApi.one("/holiday/initHoliday",item.year).get();
        }
    });
