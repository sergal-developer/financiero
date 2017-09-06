var databaseCore = require('../core');

function findAll(req, res) {
    databaseCore.getCurrency().then((data) => {
        res.send(data);
    }, (error) => {
        console.error('error: ', error);
    });
}

function findById(req, res) {    
    if(req.params.id) {
        var id = Number(req.params.id);
        databaseCore.getCurrencyFilter({ id: id }).then((data) => {
            res.send(data);
        }, (error) => {
            console.error('error: ', error);
        });
    }
}

function findAnyName(req, res) {    
    if(req.params.name) {
        databaseCore.getCurrencyFilter({ name: req.params.name }).then((data) => {
            res.send(data);
        }, (error) => {
            console.error('error: ', error);
        });
    }
}

function add(req, res) {
    if(req.body) {
        databaseCore.addCurrency(req.body).then((data) => {
            res.send(data);
        }, (error) => {
            console.error('error: ', error);
        });
    }
}

function update(req, res) {
    if(req.params.id && req.body) {
        req.body.id = Number(req.params.id);
        databaseCore.updateCurrency(req.body).then((data) => {
            res.send(data);
        }, (error) => {
            console.error('error: ', error);
        });
    }
}

function deleteById(req, res) {
    if(req.params.id) {
        var id = Number(req.params.id);
        databaseCore.deleteCurrency(id).then((data) => {
            res.send(data);
        }, (error) => {
            console.error('error: ', error);
        });
    }
}

function deleteBatch(req, res) {
    if(req.params.array) {
        var arr = JSON.parse(req.params.array);
        console.log('arr: ', typeof arr);

        databaseCore.deleteBatchCurrency(arr).then((data) => {
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