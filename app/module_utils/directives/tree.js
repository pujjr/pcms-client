'use strict';

/**
 * @ngdoc directive
 * @name widgetApp.directive:tree
 * @description
 * # tree
 */
angular.module('pu.utils.directives')
  .directive('tree', function ($compile) {
        return {
            restrict: "E",
            scope: {
                treeData: '=',
                canChecked:'=',
                nameField:'@',
                checkHandle:'&',
                mode:'@'
            },
            controller:function($scope){

              $scope.$itemClicked=function(item) {
                  $scope.$emit('nodeClicked');
                  $scope.$broadcast('parentNodeClicked');
                  $scope.treeData.isSelected =true ;

              };
                $scope.$on('childNodeChecked',function(event){
                    if(event.targetScope!=event.currentScope){
                        event.currentScope.treeData.checked=false;
                        angular.forEach(event.currentScope.treeData.children,function(object){
                            if(object.checked==true){
                                event.currentScope.treeData.checked=true;
                            }
                        })
                        console.log(event.currentScope.treeData+" receive childNodeChecked Event")
                    }
                });
                $scope.$on('parentNodeChecked',function(event){
                    if(event.targetScope!=event.currentScope) {
                        event.currentScope.treeData.checked=event.targetScope.treeData.checked;
                        console.log(event.currentScope.treeData + " receive parentNodeChecked Event")
                    }
                });
                $scope.$on("parentNodeClicked",function(event){
                    if(event.targetScope!=event.currentScope) {
                        event.currentScope.treeData.isSelected = false;
                        angular.forEach(event.currentScope.treeData.children,function(object){
                            object.isSelected = false;
                        })
                    }
                });
                $scope.unSelectChildNode = function(node){
                    if(node.children!=undefined && node.children.length>0){
                        angular.forEach(node.children,function(object){
                            object.isSelected = false;
                            if(object.children!=undefined && object.children.length>0){
                                $scope.unSelectChildNode(object);
                            }
                        });
                    }
                }
                $scope.$on("nodeClicked",function(event){
                    if(event.targetScope!=event.currentScope) {
                        event.currentScope.treeData.isSelected = false;
                        $scope.unSelectChildNode(event.currentScope.treeData);
                    }
                });
                $scope.$isLeaf=function(item){
                    if(item == undefined || item.children == undefined)
                        return true;
                    return item.children.length==0||!item.children;
                };
                $scope.$itemChecked=function(item){
                    if($scope.mode!='uncascade'){
                        $scope.$emit('childNodeChecked');
                        $scope.$broadcast('parentNodeChecked');
                    }
                    if($scope.checkHandle !=undefined){
                        $scope.checkHandle(item);
                    }
                };
                $scope.$getItemIcon=function(item){
                    if($scope.$isLeaf(item)){
                        return "fa fa-folder";
                    };
                    return item.$$expanded==true?"fa fa-caret-down fa-lg":"fa fa-caret-right fa-lg";
                };
                $scope.$itemExpand=function(item){
                    item.$$expanded=!item.$$expanded;
                };
                $scope.$getNodeCss = function(item){
                    if( $scope.treeData !=undefined && item.isSelected){
                        return 'treeNode_sel';
                    }else{
                        return 'treeNode';
                    }
                }

            },
            templateUrl:'module_utils/tpl/treenode.html',
            compile: function(tElement, tAttr) {
                var contents = tElement.contents().remove();
                var compiledContents;
                return function(scope, iElement, iAttr) {
                    if(!compiledContents) {
                        compiledContents = $compile(contents);
                    };
                    compiledContents(scope, function(clone, scope) {
                        iElement.append(clone);
                    });
                };
            }
        };
    });
