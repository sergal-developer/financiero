var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    router = express.Router();

    router.get('', reditect);
    router.get('home', reditect);
    router.get('budget-view', reditect);
    router.get('settings', reditect);
    router.get('admin', reditect);
    router.get('error', reditect);
   
function reditect(req, res) {
    var source = path.join(__dirname, '../', '/app/financial/index.html');
    app.use(config.server.appUrl, express.static(__dirname + '/app/financial/'));
    fs.readFile(source, 'utf8', function(err, text){
        res.send(text);
    });
}

module.exports = router;