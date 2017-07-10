class ApiService {
    constructor() { }

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
        var path = "http://localhost:5500/api";
        var headers = { 
            "Content-Type": "application/json",
            "X-Access-Token":"QVBQLUZpbmFuY2llcm8tQVBJLXMzcmcxMEFOVE9OSU80WnVyMw==",
            "Account":"sergio-gallegos" 
        }
        var urlService = `${path}/${url}`;
        
        var options = {
            method: method || 'GET', 
            headers: new Headers(headers)                                                                                                                                                                                                                                                                                               
        }

        if ((method === 'POST' || method === 'PUT') && body) {
            options.body = body;
        }
        
        return window.fetch(urlService, options)
            // .then(this.checkStatus)
            .then(function (response) {
                return response.json();
            }).catch(function (error) {
                console.log('Request Failed:', error)
            }); 
    }
}


export default new ApiService();