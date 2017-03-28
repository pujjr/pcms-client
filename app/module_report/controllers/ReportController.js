'use strict';

/* Controllers */
// signin controllers
angular.module("pu.report.controllers")
        .controller('ReportController',function ($scope, $rootScope, $state, toaster,$uibModal,modal,ReportService){
        $scope.openReportUrl = function(url){
            window.open('#/report/credit?hiddenAsideFolded=true', "", "height="+$scope.screenHeight+",width="+$scope.screenWidth+", toolbar =no, menubar=no,   location=no, status=no");
        };
        $scope.exportCreditReport = function(){
            $scope.loading = ReportService.exportCreditReport().then(function(response){
                var ossKey = response.ossKey;
                var link = document.createElement('a');
                link.href=SERVER_URL.OSS_URL+ossKey;
                link.click();
                window.URL.revokeObjectURL(link.href);
            })
        }
    })
;