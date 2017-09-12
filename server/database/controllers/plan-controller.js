var databaseCore = require('../core');


function findAll(req, res) {
    databaseCore.getPlans().then((data) => {
        res.send(data);
    }, (error) => {
        console.error('error: ', error);
    });
}

function findById(req, res) {    
    if(req.params.id) {
        var id = Number(req.params.id);
        databaseCore.getPlansFilter({ id: id }).then((data) => {
            res.send(data);
        }, (error) => {
            console.error('error: ', error);
        });
    }
}

function findAnyName(req, res) {    
    if(req.params.name) {
        databaseCore.getPlansFilter({ name: req.params.name }).then((data) => {
            res.send(data);
        }, (error) => {
            console.error('error: ', error);
        });
    }
}

function add(req, res) {
    if(req.body) {
        databaseCore.addPlans(req.body).then((data) => {
            res.send(data);
        }, (error) => {
            console.error('error: ', error);
        });
    }
}

function update(req, res) {
    if(req.params.id && req.body) {
        req.body.id = Number(req.params.id);
        databaseCore.updatePlans(req.body).then((data) => {
            res.send(data);
        }, (error) => {
            console.error('error: ', error);
        });
    }
}

function deleteById(req, res) {
    if(req.params.id) {
        var id = Number(req.params.id);
        databaseCore.deletePlans(id).then((data) => {
            res.send(data);
        }, (error) => {
            console.error('error: ', error);
        });
    }
}

module.exports = {
    findAll: findAll,
    findById: findById,
    findAnyName: findAnyName,
    add: add,
    update: update,
    deleteById: deleteById
}