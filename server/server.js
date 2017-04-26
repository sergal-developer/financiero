var fs = require('fs'),
    path = require('path'),
    config = require('./config/config.js'),
    server_core = require('./core.js');

var app = server_core.createApp();

module.exports = app;

app.listen(config.server.port, function () {
    console.log('listening on port http://localhost:' + config.server.port + '/' + config.appName);
});

