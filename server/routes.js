const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bodyParser = require('body-parser');
const request = require('request');

//TODO: Try to use riot-router as the express router.

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.get('/home', function (req, res) {
    res.sendFile(path.join(__dirname + '/../app/financial/index.html'));
});

router.get('/login', function(req, res, next) {
    res.sendFile(path.join(__dirname + '/../app/financial/index.html'));
});

module.exports = router;