var databaseCore = require('../core');


function findAll(req, res) {
    databaseCore.getTransactions().then((data) => {
        res.send(data);
    }, (error) => {
        console.error('error: ', error);
    });
}

function findById(req, res) {    
    if(req.params.id) {
        var id = Number(req.params.id);
        databaseCore.getTransactionsFilter({ id: id }).then((data) => {
            res.send(data);
        }, (error) => {
            console.error('error: ', error);
        });
    }
}

function findAnyName(req, res) {    
    if(req.params.name) {
        databaseCore.getTransactionsFilter({ name: req.params.name }).then((data) => {
            res.send(data);
        }, (error) => {
            console.error('error: ', error);
        });
    }
}

function add(req, res) {
    if(req.body) {
        databaseCore.addTransactions(req.body).then((data) => {
            res.send(data);
        }, (error) => {
            console.error('error: ', error);
        });
    }
}

function update(req, res) {
    if(req.params.id && req.body) {
        req.body.id = Number(req.params.id);
        databaseCore.updateTransactions(req.body).then((data) => {
            res.send(data);
        }, (error) => {
            console.error('error: ', error);
        });
    }
}

function deleteById(req, res) {
    if(req.params.id) {
        var id = Number(req.params.id);
        databaseCore.deleteTransactions(id).then((data) => {
            res.send(data);
        }, (error) => {
            console.error('error: ', error);
        });
    }
}

function deleteBatch(req, res) {
    if(req.params.array) {
        var arr = JSON.parse(req.params.array);
        databaseCore.deleteBatchTransactions(arr).then((data) => {
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
    deleteById: deleteById,
    deleteBatch: deleteBatch
}