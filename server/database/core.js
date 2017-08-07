var config = require('../config/config.js'),
    low = require('lowdb'),
    db = low('./server/database/dbfinanciero.json', {
        autosave: true, // automatically save database on change (default: true)
        async: true     // asynchronous write (default: true)
    }),
    models = require('./models/models');

function identity(modelName) {
    var index = db.get(modelName).map('id').last().value();
    if(typeof index == "undefined")
        index = 0
    return ++index;
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
    var result = {};
    for(var key in model) {
        if(item[key] != undefined || item[key] != null)
            result[key] = item[key];
        else if(!(result[key] != undefined || result[key] != null))
            result[key] = null
    }
    return result;
}

var Currency = {
    modelName: 'currency',
    all: () => {
        return new Promise(function (resolve, reject) {
            try {
                var result = db.get(Currency.modelName)
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
                var result = db.get(Currency.modelName)
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
                item = ParseToModel(item, models.currency);
                // validate if exist item
                var valid = db.get(Currency.modelName)
                    .map('name')
                    .filter({ name: item.name })
                    .value();
                // save object
                if(valid.length == 0) {    
                    // generate new identified
                    item.id = identity(Currency.modelName);
                    var post = db.get(Currency.modelName)
                        .push(item)
                        .write();

                    resolve(post);
                } else {
                    resolve("[]");
                }
            } catch (error) {
                reject(error);
            }
        });
    },
    update: (item) => {
        return new Promise(function (resolve, reject) {
            try {
                // save object
                db.get(Currency.modelName)
                    .find({ id: item.id })
                    .assign(item)
                    .write();

                resolve(item);
            } catch (error) {
                reject(error);
            }
        })
    },
    remove: (value) => {
        return new Promise(function (resolve, reject) {
            try {
                // remove object
                db.get(Currency.modelName)
                    .remove({ id: value })
                    .write();
                resolve(true);
            } catch (error) {
                reject(error);
            }
        })
    }
};

var Users = {
    modelName: 'users',
    all: () => {
        return new Promise(function (resolve, reject) {
            try {
                var result = db.get(Users.modelName)
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
                var result = db.get(Users.modelName)
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
                item = ParseToModel(item, models.user);
                // validate if exist item
                var valid = db.get(Users.modelName)
                    .map('username')
                    .filter({ username: item.username })
                    .value();
                // save object
                if(valid.length == 0) {    
                    // generate new identified
                    item.id = identity(Users.modelName);
                    var post = db.get(Users.modelName)
                        .push(item)
                        .write();

                    resolve(post);
                } else {
                    resolve("[]");
                }
            } catch (error) {
                reject(error);
            }
        });
    },
    update: (item) => {
        return new Promise(function (resolve, reject) {
            try {
                // save object
                db.get(Users.modelName)
                    .find({ id: item.id })
                    .assign(item)
                    .write();

                resolve(item);
            } catch (error) {
                reject(error);
            }
        })
    },
    remove: (value) => {
        return new Promise(function (resolve, reject) {
            try {
                // remove object
                db.get(Users.modelName)
                    .remove({ id: value })
                    .write();
                resolve(true);
            } catch (error) {
                reject(error);
            }
        })
    }
};

var Wallets = {
    modelName: 'wallets',
    all: () => {
        return new Promise(function (resolve, reject) {
            try {
                var result = db.get(Wallets.modelName)
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
                var result = db.get(Wallets.modelName)
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
                item = ParseToModel(item, models.wallet);
                // validate if exist item
                var valid = db.get(Wallets.modelName)
                    .map('name')
                    .filter({ name: item.name })
                    .value();
                // save object
                if(valid.length == 0) {    
                    // generate new identified
                    item.id = identity(Wallets.modelName);
                    var post = db.get(Wallets.modelName)
                        .push(item)
                        .write();

                    resolve(post);
                } else {
                    resolve("[]");
                }
            } catch (error) {
                reject(error);
            }
        });
    },
    update: (item) => {
        return new Promise(function (resolve, reject) {
            try {
                // save object
                db.get(Wallets.modelName)
                    .find({ id: item.id })
                    .assign(item)
                    .write();

                resolve(item);
            } catch (error) {
                reject(error);
            }
        })
    },
    remove: (value) => {
        return new Promise(function (resolve, reject) {
            try {
                // remove object
                db.get(Wallets.modelName)
                    .remove({ id: value })
                    .write();
                resolve(true);
            } catch (error) {
                reject(error);
            }
        })
    }
};

var Categories = {
    modelName: 'categories',
    all: () => {
        return new Promise(function (resolve, reject) {
            try {
                var result = db.get(Categories.modelName)
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
                var result = db.get(Categories.modelName)
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
                item = ParseToModel(item, models.categories);
                // validate if exist item
                var valid = db.get(Categories.modelName)
                    .map('name')
                    .filter({ name: item.name })
                    .value();
                // save object
                if(valid.length == 0) {    
                    // generate new identified
                    item.id = identity(Categories.modelName);
                    var post = db.get(Categories.modelName)
                        .push(item)
                        .write();

                    resolve(post);
                } else {
                    resolve("[]");
                }
            } catch (error) {
                reject(error);
            }
        });
    },
    update: (item) => {
        return new Promise(function (resolve, reject) {
            try {
                // save object
                db.get(Categories.modelName)
                    .find({ id: item.id })
                    .assign(item)
                    .write();

                resolve(item);
            } catch (error) {
                reject(error);
            }
        })
    },
    remove: (value) => {
        return new Promise(function (resolve, reject) {
            try {
                // remove object
                db.get(Categories.modelName)
                    .remove({ id: value })
                    .write();
                resolve(true);
            } catch (error) {
                reject(error);
            }
        })
    }
};

var Transactions = {
    modelName: 'transactions',
    all: () => {
        return new Promise(function (resolve, reject) {
            try {
                var result = db.get(Transactions.modelName)
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
                var result = db.get(Transactions.modelName)
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
                item = ParseToModel(item, models.transaction);
                // generate new identified
                item.id = identity(Transactions.modelName);
                var post = db.get(Transactions.modelName)
                    .push(item)
                    .write();

                resolve(post);
            } catch (error) {
                reject(error);
            }
        });
    },
    update: (item) => {
        return new Promise(function (resolve, reject) {
            try {
                // save object
                db.get(Transactions.modelName)
                    .find({ id: item.id })
                    .assign(item)
                    .write();

                resolve(item);
            } catch (error) {
                reject(error);
            }
        })
    },
    remove: (value) => {
        return new Promise(function (resolve, reject) {
            try {
                // remove object
                db.get(Transactions.modelName)
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
    //Users
    getUsers: Users.all,
    getUsersFilter: Users.allFilter,
    addUsers: Users.add,
    updateUsers: Users.update,
    deleteUsers: Users.remove,
    //Wallets
    getWallets: Wallets.all,
    getWalletsFilter: Wallets.allFilter,
    addWallets: Wallets.add,
    updateWallets: Wallets.update,
    deleteWallets: Wallets.remove,
    //Categories
    getCategories: Categories.all,
    getCategoriesFilter: Categories.allFilter,
    addCategories: Categories.add,
    updateCategories: Categories.update,
    deleteCategories: Categories.remove,
    //Transactions
    getTransactions: Transactions.all,
    getTransactionsFilter: Transactions.allFilter,
    addTransactions: Transactions.add,
    updateTransactions: Transactions.update,
    deleteTransactions: Transactions.remove,

};