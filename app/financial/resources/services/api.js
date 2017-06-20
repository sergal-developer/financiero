class ApiService {
    constructor() {
        this.path = "http://localhost:5500/api";
        this.headers = this.getHeaders();
    }

    getHeaders() {
        return { 
            "Content-Type": "application/json",
            "X-Access-Token":"QVBQLUZpbmFuY2llcm8tQVBJLXMzcmcxMEFOVE9OSU80WnVyMw==",
            "Account":"sergio-gallegos" 
        };
    }

    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error
        }
    }

    call(url, method, body) {
        var options = {
            method: method || 'GET', 
            headers: this.headers,
            body: '{}'
        }

        if ((method === 'POST' || method === 'PUT') && body) {
            options.body = body;
        }
        options.headers = new Headers(options.headers);
        return window.fetch(url, options)
            .then(this.checkStatus)
            .then(function (response) {
                return response.json();
            }).catch(function (error) {
                console.log('Request Failed:', error)
            }); 
    }
}


export default ApiService;