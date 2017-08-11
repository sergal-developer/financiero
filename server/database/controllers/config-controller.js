var databaseCore = require('../core');


function findAll(req, res) {
    databaseCore.getConfig().then((data) => {
        res.send(data);
    }, (error) => {
        console.error('error: ', error);
    });
}

function add(req, res) {
    if(req.body) {
        databaseCore.addConfig(req.body).then((data) => {
            res.send(data);
        }, (error) => {
            console.error('error: ', error);
        });
    }
}

function update(req, res) {
    if(req.params.id && req.body) {
        req.body.id = Number(req.params.id);
        databaseCore.updateConfig(req.body).then((data) => {
            res.send(data);
        }, (error) => {
            console.error('error: ', error);
        });
    }
}

function deleteById(req, res) {
    if(req.params.id) {
        var id = Number(req.params.id);
        databaseCore.deleteConfig(id).then((data) => {
            res.send(data);
        }, (error) => {
            console.error('error: ', error);
        });
    }
}

module.exports = {
    findAll: findAll,
    add: add,
    update: update,
    deleteById: deleteById
}