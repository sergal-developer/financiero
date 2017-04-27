var express = require('express'),
	fs = require('fs'),
	path = require('path'),
	config = require('./config/config.js'),
	bodyParser = require('body-parser');
	// apiData = require('./api.data.js'),
	// model = require('../database/model.js'),
	// helper = require('./helpers.js');
	// helper.extendString(String);

exports.createApp = function (callback) {
	var app = express();
	app.use(bodyParser.urlencoded({
		extended: false
	}));
	app.use(bodyParser.json());
	app.use(express.static('.'));

	app.use('/', express.static(__dirname + '/../app/financiero/'));
	app.use('/libs', express.static(__dirname + '/../bower_components'));
	
	app.get('/home', function (req, res) {
		res.sendFile(path.join(__dirname + '/../appanciero/index.html'));
	});

	app.get('/login', function(req, res, next) {
		res.sendFile(path.join(__dirname + '/../app/financiero/index.html'));
	});

    /*
	
	*/
	return app;
}