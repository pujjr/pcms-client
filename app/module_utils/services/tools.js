angular.module('pu.utils.services')
    .service("ToolsService",function(RestApi){
        this.convertArrayToTree=function(data,options){
            {
                options = options || {};
                var ID_KEY = options.idKey || 'id';
                var PARENT_KEY = options.parentKey || 'parent';
                var CHILDREN_KEY = options.childrenKey || 'children';
                var ignoreTopLevel = options.ignoreTopLevel || false;

                var tree = [],
                    childrenOf = {};
                var item, id, parentId;

                for (var i = 0, length = data.length; i < length; i++) {
                    data[i].$$expanded = true;
                    item = data[i];
                    id = item[ID_KEY];
                    parentId = item[PARENT_KEY] || 0;
                    // every item may have children
                    childrenOf[id] = childrenOf[id] || [];
                    // init its children
                    item[CHILDREN_KEY] = childrenOf[id];
                    if (parentId != 0) {
                        // init its parent's children object
                        childrenOf[parentId] = childrenOf[parentId] || [];
                        // push it into its parent's children object
                        childrenOf[parentId].push(item);
                    } else {
                        tree.push(item);
                    }
                };
                if(ignoreTopLevel){
                    return tree[0].children[0];
                }
                return tree[0];
            }
        };
        this.getDateDiff = function getDateDiff(startDate,endDate)
        {
            var pattern = /(\d{4})(\d{2})(\d{2})/;
            var startDate = startDate.replace(pattern, '$1-$2-$3');
            var endDate = endDate.replace(pattern, '$1-$2-$3');
            var startTime = new Date(Date.parse(startDate)).getTime();
            var endTime = new Date(Date.parse(endDate)).getTime();
            var dates = Math.abs((startTime - endTime))/(1000*60*60*24);
            return  dates;
        };
        this.getServerDateTime = function(){
           return  RestApi.one("common","getSystemDate").get();
        };
        this.getTreeCheckedList = function(tree){
            var checkList = [];
            if(tree.checked){
                checkList.push(tree);
            }
            for(var i = 0;i<tree.children.length;i++){
                checkList=checkList.concat(this.getTreeCheckedList(tree.children[i]));
            }
            return checkList;
        };
    });
