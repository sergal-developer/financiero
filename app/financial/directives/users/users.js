import apiService from '../../resources/services/api';

export default () => {
    return {
        restrict: 'E',
        templateUrl: 'directives/users/users.html', 
        scope: {
            data: '=',
        },
        link: function(scope) {},
        controller: usersDirective,
        controllerAs: 'vm',
        bindToController: true
    };
}

class usersDirective {
    constructor($timeout, $scope) {
        this.scope = $scope;
        this.setupForm();
    }

    setupForm() {
        this.usersTemp = {
            username: "", 
            password: "", 
            givenname: "", 
            middlename: "", 
            familyname: "", 
            email: "", 
            gender: "", 
            birthdate: ""
        }
        this.usersTempSelected = null;
    }

    selectItem(data) {
        this.usersTemp = this.usersTempSelected = angular.copy(data);
    }

    clean(object) {
        if(object) {
            for(var key in object) {
                object[key] = null;
            }
        }
        this.usersTempSelected = null;
        return object;  
    }

    _validate(object) {
        var valid = [];
        if(object) {
            for(var key in object) {
                if((object[key] != undefined && object[key] != null) 
                        && object[key] != "" || object[key] == false) 
                    valid.push(true);
                else 
                    valid.push(false);
            }
        }
        var y = valid.indexOf(false);
        return y == -1 ? true : false;
    }

    create(data) {
        data.isentry = data.isentry || false;
        if(this._validate(data)) {
           apiService.call("/data/users", "POST", data).then((res) => {
                if(res) {
                    this.clean(data);
                    this.updateSourceData();
                }
            });
        }
        else {
            console.log("error: ", data);
        }
    }

    delete(object) {
        if(object && object.id) {
            var url = "/data/users/" + object.id;
            apiService.call(url, "DELETE").then((res) => {
                if(res) {
                    this.updateSourceData();
                }
            });
        }
    }

    update(object) {
        if(object && object.id) {
            var url = "/data/users/" + object.id;
            apiService.call(url, "PUT", object).then((res) => {
                if(res) {
                    this.updateSourceData();
                }
            });
        }
    }

    updateSourceData() {
        this.scope.$parent.vm.getData("users")
    }

    
}

usersDirective.$inject = ['$timeout', '$scope'];