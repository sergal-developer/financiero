export default function AvatarDirective() {
    let directive = {
        restrict: 'E',
        templateUrl: 'directives/avatar/avatar.html',
        scope: {
            user: '=',
            only: "@", //avatar || username
        },
        link: function(scope) {},
        controller: AvatarController,
        controllerAs: 'vm',
        bindToController: true
    }
    return directive;
}

class AvatarController {
    constructor() { 
    }
    
    getInitials() {
        if(this.user) {
            var first = this.user.givenname.replace(' ', '')[0];
            var second = this.user.familyname.replace(' ', '')[0];
            return `${first}${second}`;
        }
        return "-";
    }
}