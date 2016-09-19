/**
 * Created by dengpan on 2016/4/22.
 */
'use strict';

/* Filters */
// need load the moment.js to use this filter.
angular.module('pu.utils.filters')
    .filter('simpleChnUpperCase', function() {
        return function(value) {
            if(value==null || angular.isUndefined(value)){
                return '';
            }
            var map ={
                1:'一',
                2:'二',
                3:'三',
                4:'四'
            }
            return map[value];
        }
    });