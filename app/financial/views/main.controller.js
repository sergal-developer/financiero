class MainController {
    constructor($rootScope) {
        this.$rootScope = $rootScope;
        
        //Global Variables
        this.$rootScope.user = {};
        this.$rootScope.searchCriteria = "";

        this.$rootScope.user  = this.getCurrentUser();
    }

    getCurrentUser() {
        let user = {
            id: '_0012',
            userName: "gabrant1988",
            givenName: "Sergio",
            middleName: "Antonio",
            familyName: "Gallegos",
            title: "Profesor",
            email: "sergio.gallegos@live.com.mx",
            password: "4Ntoni0",
            gender: "M",
            birthDate: "",
            jobtitle: "Developer",
            departament: "Web UI",
            company: "Glo",
            street: "12, 385",
            city: "Ne",
            zipCode: "54334",
            coutry: "",
            mobilePhone: "5516322613",
            webPage: "http://www.sergiogallegos.com",
            isAvailable: true,
            avatar: {
                isAvailable: true, 
                urlImage: "./assets/avatars/user-21312.png"
            }
        }

        this.$rootScope.user = user;
        return user;
    }


}

MainController.$inject = ['$rootScope'];

export default MainController;