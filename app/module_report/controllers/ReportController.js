'use strict';

/* Controllers */
// signin controllers
angular.module("pu.report.controllers")
        .controller('ReportController',function ($scope, $rootScope, $state, toaster,$uibModal,modal,ReportService){
        $scope.openReportUrl = function(url){
            window.open('#/report/credit?hiddenAsideFolded=true', "", "height="+$scope.screenHeight+",width="+$scope.screenWidth+", toolbar =no, menubar=no,   location=no, status=no");
        };
        $scope.exportCreditInfo = function(){
            $scope.loading = ReportService.exportCreditInfo().then(function(response){
                var ossKey = response.ossKey;
                var link = document.createElement('a');
                link.href=SERVER_URL.OSS_URL+ossKey;
                link.click();
                window.URL.revokeObjectURL(link.href);
            })
        }

        $scope.exportCollectionLog = function(){
            $scope.loading = ReportService.exportCollectionLog().then(function(response){
                var ossKey = response.ossKey;
                var link = document.createElement('a');
                link.href=SERVER_URL.OSS_URL+ossKey;
                link.click();
                window.URL.revokeObjectURL(link.href);
            })
        }

        $scope.exportOverdueCollection = function(){
            $scope.loading = ReportService.exportOverdueCollection().then(function(response){
                var ossKey = response.ossKey;
                var link = document.createElement('a');
                link.href=SERVER_URL.OSS_URL+ossKey;
                link.click();
                window.URL.revokeObjectURL(link.href);
            })
        }
    })
;