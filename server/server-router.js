var express = require('express');
var router = express.Router();

    router.get('*', reditect);

function reditect(req, res) {
    res.sendFile(express.static(__dirname + '/../app/financial/'));
}


module.exports = router;