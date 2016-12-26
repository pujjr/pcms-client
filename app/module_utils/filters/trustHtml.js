/**
 * Created by dengpan on 2016/4/22.
 */
'use strict';

/* Filters */
// need load the moment.js to use this filter.
angular.module('pu.utils.filters')
    .filter('trustHtml', function ($sce) {
        return function (input) {
            return $sce.trustAsHtml(input);
        }
    });