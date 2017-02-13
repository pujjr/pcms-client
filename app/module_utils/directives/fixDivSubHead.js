angular.module('pu.utils.directives')
    .directive('fixDivSubHead', function ($window) {
    return {
        restrict: 'A',
        scope:{
            screenPer:'=',
            offsetX:'=',
            offsetY:'='
        },
        link: function ($scope, element, attrs) {
            /**初始化界面高度和宽度**/
            $scope.refreshHeight = function(){
                var offsetY = 0;
                if($scope.offsetY!=undefined){
                    offsetY = $scope.offsetY;
                }
                var innerHeight = $window.innerHeight;
                var divHeight = innerHeight-50-parseInt(offsetY);
                var style={height:divHeight+'px','overflow-y': 'auto', position: 'relative', 'overflow-x': 'hidden'};
                element.css(style);
            }
            $scope.refreshHeight();
            $(window).resize(function(){
                $scope.refreshHeight();
            });
        }
    };
})  