var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    config = require('./server/config/config.js'),
	bodyParser = require('body-parser');
    request = require('request'),
    coreData = require('./server/database/core');
    app = express();

function createApp(app) {
    coreData.startDataBase();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.all('/*', function(req, res, next) {
        // CORS headers
        res.header("Access-Control-Allow-Origin", config.server.apiConfig.cords.access); // restrict it to the required domain
        res.header('Access-Control-Allow-Methods', config.server.apiConfig.cords.methods);
        res.header('Access-Control-Allow-Headers', config.server.apiConfig.cords.headers);
        next();
    });
    
    // app.use(config.server.appUrl,  require('./server/server-router.js'));
    app.use(config.server.appUrl, express.static(__dirname + '/app/financial/'));
    app.use(config.server.appUrl + "home", express.static(__dirname + '/app/financial/'));
    app.use(config.server.appUrl + "budget-view", express.static(__dirname + '/app/financial/'));
    app.use(config.server.appUrl + "settings", express.static(__dirname + '/app/financial/'));
    app.use(config.server.appUrl + "admin", express.static(__dirname + '/app/financial/'));
    app.use(config.server.appUrl + "error", express.static(__dirname + '/app/financial/'));
    
	app.use(config.server.appLibs, express.static(__dirname + '/bower_components/'));
	app.use("/database", express.static(__dirname + '/database/'));
    app.use('/data', require('./server/database/api-routes.js'));
}

module.exports = createApp(app);

var port = process.env.PORT || config.server.port;
app.listen(config.server.port, function () {
    console.log('Server ready in http://localhost:' + port + config.server.appUrl + '/');
});