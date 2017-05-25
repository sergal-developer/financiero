var fs = require('fs'),
    path = require('path'),
    config = require('./config/config.js'),
    serverExpress = require('./express.js');

var app = serverExpress.createApp(); 

module.exports = app;

app.listen(config.server.port, function () {
    console.log('Server ready in http://localhost:' + config.server.port + config.server.appUrl + '/');
});

