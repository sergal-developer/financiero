export default function AboutDirective() {
    let directive = {
        restrict: 'E',
        templateUrl: 'directives/about/about.html',
        scope: {},
        link: function(scope) {},
        controller: AboutController,
        controllerAs: 'vm',
        bindToController: true
    }

    return directive;
}

class AboutController {
    constructor() { }
}