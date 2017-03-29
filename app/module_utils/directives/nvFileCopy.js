angular.module('pu.utils.directives')
    .directive('nvFileCopy', function ($window) {
        return {
            restrict: 'A',
            scope:{
                uploader:'='
            },
            link: function ($scope, element, attrs) {
                element.bind("paste", function(e) {
                    console.log("file copyed");
                    event.preventDefault();
                    event.stopPropagation();
                    // 添加到事件对象中的访问系统剪贴板的接口
                    var clipboardData = e.originalEvent.clipboardData,
                        i = 0,
                        items, item, types;


                    if( clipboardData ) {
                        items = clipboardData.items;
                        if (!items) {
                            return;
                        }
                        item = items[0];
                        // 保存在剪贴板中的数据类型
                        types = clipboardData.types || [];
                        for (; i < types.length; i++) {
                            if (types[i] === 'Files') {
                                item = items[i];
                                break;
                            }
                        }
                        // 判断是否为图片数据
                        if (item && item.kind === 'file' && item.type.match(/^image\//i)) {
                            //imgReader(item);
                            var file = new File([item.getAsFile()], "image.png", {type:"image/png"});
                            $scope.uploader.addToQueue(file, undefined,undefined);
                        }
                    }
                });
            }
        };
})  