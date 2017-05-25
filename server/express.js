var express = require('express'),
	fs = require('fs'),
	path = require('path'),
	config = require('./config/config.js'),
	bodyParser = require('body-parser');
    request = require('request');

function createApp() {
    var app = express();
    app.use(bodyParser.urlencoded({
		extended: false
	}));
	app.use(bodyParser.json());

    app.use(config.server.appUrl, express.static(__dirname + '/../app/financial/'));
    app.use(config.server.appLibs, express.static(__dirname + '/../bower_components/'));
	app.use('/', require('./routes'));

	return app;
}

module.exports = {
	createApp : createApp
};