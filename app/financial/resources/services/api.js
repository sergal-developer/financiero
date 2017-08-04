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
            console.error(response.statusText);
        }
    }

    call(path, method, body, headers, convertResponseToJSON) {
        var url = path;
        var options = {
            method: method || 'GET',
            headers: headers || {"Content-Type": "application/json"}
        };

        if ((method === 'POST' || method === 'PUT') && body) {
            options.body = JSON.stringify(body);
        }

        convertResponseToJSON = convertResponseToJSON || false;

        options.headers = new Headers(options.headers);

        return fetch(url, options)
            .then(this.checkStatus)
            .then(function (response) {
                return response.json();
            }).catch(function (error) {
                console.log('Request Failed:', error)
            });
    }

}


export default new ApiService();