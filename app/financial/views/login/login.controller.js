class LoginController {
    constructor() {

        this.username = "";
        this.password = "";
    }

    validateCredentials() {
        let response = false;
        if(this.username != "" && this.password)
            response = true;
        
        return response;
    }
}

LoginController.$inject = [];

export default LoginController;