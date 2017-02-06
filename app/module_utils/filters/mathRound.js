/**
 * Created by dengpan on 2016/4/22.
 */
'use strict';

/* Filters */
// need load the moment.js to use this filter.
angular.module('pu.utils.filters')
    .filter('mathRound', function() {
        return function(value) {
            if(value==null || angular.isUndefined(value)){
                return '';
            }
            return value.toFixed(2);
        }
    });