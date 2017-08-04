var config = require('../config/config.js'),
    low = require('lowdb'),
    db = low('./server/database/dbfinanciero.json'),
    models = require('./models/models');

function identity(modelName) {
    var index = db.get(modelName).last().value();
    if(typeof index == "undefined")
        index = {
            id: 0
        };
    return index.id + 1;
}

function startDataBase() {
    db.defaults({ 
            users: [], 
            currency: [], 
            wallets: [], 
            temporality: [], 
            categories: [], 
            transactions: [],
            plans: []
         }).write();
}

function ParseToModel(item, model) {
    var result = model;
    for(var key in model) {
        if(item[key] != undefined || item[key] != null)
            result[key] = item[key];
        else if(!(result[key] != undefined || result[key] != null))  
            result[key] = null
    }
    return result;
}

var Currency = {
    all: () => {
        return new Promise(function (resolve, reject) {
            try {
                var result = db.get('currency')
                    .value();

                if(typeof result == "undefined")
                    result = [];
                
                resolve(result);
            } catch (error) {
                reject(error);
            }
        })
    },
    allFilter: (filter) => {
        return new Promise(function (resolve, reject) {
            try {
                var result = db.get('currency')
                    .find(filter)
                    .value();

                if(typeof result == "undefined")
                    result = [];

                resolve(result);
            } catch (error) {
                reject(error);
            }
        })
    },
    add: (item) => {
        return new Promise(function (resolve, reject) {
            try {
                // assing item into model 
                var temp = ParseToModel(item, models.currency);
                // validate if exist item
                var valid = db.get('currency')
                    .filter({ name: temp.name })
                    .value();
                
                // save object
                if(valid.length == 0) {
                    // generate new identified
                    var index = identity('currency');
                    temp.id = index;

                    var post = db.get('currency')
                        .push(temp)
                        .last()
                        .assign({ id: index })
                        .write();

                    console.log('post: ', post);
                    resolve(post);
                    
                }

                resolve("[]");
            } catch (error) {
                reject(error);
            }
        });
    },
    update: (item) => {
        return new Promise(function (resolve, reject) {
            try {
                // assing item into model 
                var temp = ParseToModel(item, models.currency);
                // save object
                db.get('currency')
                    .find({ id: temp.id })
                    .assign(temp)
                    .write();

                resolve(temp);
            } catch (error) {
                reject(error);
            }
        })
    },
    remove: (value) => {
        return new Promise(function (resolve, reject) {
            try {
                // remove object
                db.get('currency')
                    .remove({ id: value })
                    .write();
                resolve(true);
            } catch (error) {
                reject(error);
            }
        })
    }
};

module.exports = {
    startDataBase: startDataBase, 
    //Currencies
    getCurrency: Currency.all, 
    getCurrencyFilter: Currency.allFilter,
    addCurrency: Currency.add,
    updateCurrency: Currency.update, 
    deleteCurrency: Currency.remove,

};