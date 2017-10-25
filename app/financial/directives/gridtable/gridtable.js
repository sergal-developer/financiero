export default function GridTableDirective() {
    let directive = {
        restrict: 'E',
        templateUrl: 'directives/gridtable/gridtable.html',
        scope: {
            data: '=',
            headers: '='
        },
        link: function(scope) {},
        controller: GridTableController,
        controllerAs: 'vm',
        bindToController: true
    }
    return directive;
}

class GridTableController {
    constructor() { 
        
    }

    getHeaders() {
        var headers = [];
        if(this.headers && this.data) {
            this.headers.forEach(function(h) {
                headers.push(h.title); 
            }, this);
        } else if(this.data) {
            var item = this.data[0];
            for(var i in item) {
                headers.push(i);
            }
        }
        return headers;
    }

    filterData() {
        var newList = [];
        if(this.data) {
            this.data.forEach(function(element) {
                var temp = {};
                this.headers.forEach(function(h) {
                    temp[h.field] = element[h.field];
                }, this);
                newList.push(temp);
            }, this);
            return newList;
        }
        return [];
    }
}