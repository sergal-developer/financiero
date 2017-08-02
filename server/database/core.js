var config = require('../config/config.js'),
    fs = require('fs'),
    file = config.database.file,
    exists = fs.existsSync(file),
    tables = config.database.querys.table;

// Configuration of db sqlite
var sqlite3 = require("sqlite3").verbose();
var db = null;
    if(!exists) {
		fs.openSync(file, "w");
        db = new sqlite3.Database(file);
        createTables(db);
	} else {
        db = new sqlite3.Database(file);
    }

// Include models and helpers 
var models = require('./models/models');
var helpersData = require('./helpers-data');

// initialize database
function createTables(db) {
    loadModelSQLFile((sql) => {
        var sqlc = sql.replace(/\r/g, "").replace(/\n/g, "").replace(/\t/g, "")
        var statements = sqlc.split("GO");
        try {
            for(var i in statements)
            {
                if(statements[i]) {
                    db.run(statements[i], function(err, res) {
                        if(err) {
                            console.log(`error: ${err} \n in STATEMENT: ${ statements[i] }`);
                            return;
                        }
                    });
                }
            }
            console.log("DB file creation success");
        } catch(error) {
            console.error(error);
        }
    });
}

function loadModelSQLFile(callback) {
    var file = config.database.fileSchema;
    fs.readFile(file, "utf8", function(err, contents) {
        callback(contents);
    });
}

//ERROR LOG
function Data(data, isError, message) {
    isError = isError || false;
    message = message || "";
    return {data: data, error: isError, message: message}
}

//#region Functions-Types-Table
var TypesCore = {
    findAllTypes: () => {
        return new Promise(function (resolve, reject) {
            db.serialize(function() { 
                var query = helpersData.buildQuery(tables.types, "findAll");
                db.all(query, function(err, rows) {
                    if(err) return reject(Data(null, true, err));
                    return resolve(Data(rows));
                });
            });
        });
    },
    findByIdTypes: (id) => {
        return new Promise(function (resolve, reject) {
            db.serialize(function() { 
                var query = helpersData.buildQuery(tables.types, "findById", id);
                db.all(query, function(err, rows) {
                    if(err) return reject(Data(null, true, err));
                    return resolve(Data(rows));
                });
            });
        });
    },
    findByNameTypes: (name) => {
        return new Promise(function (resolve, reject) {
            var query = helpersData.buildQuery(tables.types, "findByName", name);
            db.all(query, function(err, rows) {
                if(err) return reject(Data(null, true, err));
                return resolve(Data(rows));
            });
        });
    },
    findAnyNameTypes: (name) => {
        return new Promise(function (resolve, reject) {
            var query = helpersData.buildQuery(tables.types, "findAnyName", name);
            db.all(query, function(err, rows) {
                if(err) return reject(Data(null, true, err));
                return resolve(Data(rows));
            });
        });
    },
    addType: (type) => {
        return new Promise(function (resolve, reject) {
            try {
                // check if name exist
                TypesCore.findByNameTypes(type.name).then((response) => {
                    if(response.data.length === 0) {
                        var ob = {};
                        ob = helpersData.mergeObjects(models.type, type);
                        ob = helpersData.toSQLData(ob);
                        var query = helpersData.buildQuery(tables.types, "add", 
                            ob.name, ob.icon, ob.isentry);
                        db.run(query);
                        
                        return resolve(Data(true, false, `TYPES has been updated`));
                    }
                    return resolve(Data(false, true, `TYPES can't update in addType`));
                }, (error) => {
                    return reject(Data(false, true, error));
                });
                
            } catch(err) {
                console.error('error: ', err);
                return reject(Data(false, true, err));
            }
        });
    },
    updateType: (id, type) => {
        return new Promise(function (resolve, reject) {
            try {
                // check if id exist
                TypesCore.findByIdTypes(id).then((response) => {
                    if(response.data.length !== 0) {                    
                        var ob = {};
                        ob = helpersData.mergeObjects(models.type, type);
                        ob = helpersData.toSQLData(ob);
                        
                        var query = helpersData.buildQuery(tables.types, "update",
                            ob.name, ob.icon, ob.isentry, id);
                        db.run(query);
                        
                        return resolve(Data(true, false, `TYPES has been updated`));
                    }
                    return resolve(Data(false, true, `TYPES can't update in updateType`));
                }, (error) => {
                    return reject(Data(false, true, error));
                });
                
            } catch(err) {
                console.error('error: ', err);
                return reject(Data(false, true, err));
            }
        });
    },
    deleteType: (id) => {
        return new Promise(function (resolve, reject) {
            try {
                // check if id exist
                TypesCore.findByIdTypes(id).then((response) => {
                    if(response.data.length !== 0) {
                        var query = helpersData.buildQuery(tables.types, "delete", id);
                        db.run(query);
                        return resolve(Data(true, false, `TYPES has been deleted`));
                    }
                    return resolve(Data(false, true, `TYPES can't delete in deleteType`));
                }, (error) => {
                    return reject(Data(false, true, error));
                });
                
            } catch(err) {
                console.error('error: ', err);
                return reject(Data(false, true, err));
            }
        });
    }
}
//#endregion Functions-Types-Table

//#region Functions-Currency-Table
var CurrencyCore = {
    findAllCurrencies: () => {
        return new Promise(function (resolve, reject) {
            db.serialize(function() { 
                var query = helpersData.buildQuery(tables.currency, "findAll");
                db.all(query, function(err, rows) {
                    if(err) return reject(Data(null, true, err));
                    return resolve(Data(rows));
                });
            });
        });
    },
    findByIdCurrencies: (id) => {
        return new Promise(function (resolve, reject) {
            db.serialize(function() { 
                var query = helpersData.buildQuery(tables.currency, "findById", id);   
                db.all(query, function(err, rows) {
                    if(err) return reject(Data(null, true, err));
                    return resolve(Data(rows));
                });
            });
        });
    },
    findByNameCurrencies: (name) => {
        return new Promise(function (resolve, reject) {
            var query = helpersData.buildQuery(tables.currency, "findByName", name);
            db.all(query, function(err, rows) {
                if(err) return reject(Data(null, true, err));
                return resolve(Data(rows));
            });
        });
    },
    findAnyNameCurrencies: (name) => {
        return new Promise(function (resolve, reject) {
            var query = helpersData.buildQuery(tables.currency, "findAnyName", name);
            db.all(query, function(err, rows) {
                if(err) return reject(Data(null, true, err));
                return resolve(Data(rows));
            });
        });
    },
    addCurrency: (currency) => {
        return new Promise(function (resolve, reject) {
            try {
                // check if name exist
                CurrencyCore.findByNameCurrencies(currency.name).then((response) => {
                    if(response.data.length === 0) {
                        var ob = {};
                        ob = helpersData.mergeObjects(models.currency, currency);
                        ob = helpersData.toSQLData(ob);

                        var query = helpersData.buildQuery(tables.currency, "add", 
                            ob.name, ob.symbol, ob.prefix);                    
                        db.run(query);
                        
                        return resolve(Data(true, false, `Currency has been updated`));
                    }
                    return resolve(Data(false, true, `Currency can't update in addCurrency`));
                }, (error) => {
                    return reject(Data(false, true, error));
                });
                
            } catch(err) {
                console.error('error: ', err);
                return reject(Data(false, true, err));
            }
        });
    },
    updateCurrency: (id, currency) => {
        return new Promise(function (resolve, reject) {
            try {
                // check if id exist
                CurrencyCore.findByIdCurrencies(id).then((response) => {
                    if(response.data.length !== 0) {
                        var ob = {};
                        ob = helpersData.mergeObjects(models.currency, currency);
                        ob = helpersData.toSQLData(ob);

                        var query = helpersData.buildQuery(tables.currency, "update", 
                            ob.name, ob.symbol, ob.prefix, id); 
                        db.run(query);
                        
                        return resolve(Data(true, false, `Currency has been updated`));
                    }
                    return resolve(Data(false, true, `Currency can't update in updateCurrency`));
                }, (error) => {
                    return reject(Data(false, true, error));
                });
                
            } catch(err) {
                console.error('error: ', err);
                return reject(Data(false, true, err));
            }
        });
    },
    deleteCurrency: (id) => {
        return new Promise(function (resolve, reject) {
            try {
                // check if id exist
                CurrencyCore.findByIdCurrencies(id).then((response) => {
                    if(response.data.length !== 0) {
                        var query = helpersData.buildQuery(tables.currency, "delete", id); 
                        db.run(query);
                        return resolve(Data(true, false, `Currency has been deleted`));
                    }
                    return resolve(Data(false, true, `Currency can't delete in deleteCurrency`));
                }, (error) => {
                    return reject(Data(false, true, error));
                });
                
            } catch(err) {
                console.error('error: ', err);
                return reject(Data(false, true, err));
            }
        });
    }
}
//#endregion Functions-Currency-Table

//#region Functions-Users-Table
var UserCore = {
    findAllUsers: () => {
        return new Promise(function (resolve, reject) {
            db.serialize(function() { 
                var query = helpersData.buildQuery(tables.user, "findAll");
                db.all(query, function(err, rows) {
                    if(err) return reject(Data(null, true, err));
                    return resolve(Data(rows));
                });
            });
        });
    },
    findByIdUsers: (id) => {
        return new Promise(function (resolve, reject) {
            db.serialize(function() { 
                var query = helpersData.buildQuery(tables.user, "findById", id);
                db.all(query, function(err, rows) {
                    if(err) return reject(Data(null, true, err));
                    return resolve(Data(rows));
                });
            });
        });
    },
    findByNameUsers: (name) => {
        return new Promise(function (resolve, reject) {
            var query = helpersData.buildQuery(tables.user, "findByName", name);
            db.all(query, function(err, rows) {
                if(err) return reject(Data(null, true, err));
                return resolve(Data(rows));
            });
        });
    },
    findAnyNameUsers: (name) => {
        return new Promise(function (resolve, reject) {
            var query = helpersData.buildQuery(tables.user, "findAnyName", name);
            db.all(query, function(err, rows) {
                if(err) return reject(Data(null, true, err));
                return resolve(Data(rows));
            });
        });
    },
    addUser: (user) => {
        return new Promise(function (resolve, reject) {
            try {
                // check if name exist
                UserCore.findByNameUsers(user.name).then((response) => {
                    if(response.data.length === 0) {
                        var ob = {};
                        ob = helpersData.mergeObjects(models.user, user);
                        ob = helpersData.toSQLData(ob);
                        var query = helpersData.buildQuery(tables.user, "add",
                        ob.username, ob.password, ob.givenname, 
                        ob.middlename, ob.familyname, ob.email, 
                        ob.gender, ob.birthdate);
                        db.run(query);
                        
                        return resolve(Data(true, false, `User has been updated`));
                    }
                    return resolve(Data(false, true, `User can't update in addUser`));
                }, (error) => {
                    return reject(Data(false, true, error));
                });
                
            } catch(err) {
                console.error('error: ', err);
                return reject(Data(false, true, err));
            }
        });
    },
    updateUser: (id, user) => {
        return new Promise(function (resolve, reject) {
            try {
                // check if id exist
                UserCore.findByIdUsers(id).then((response) => {
                    if(response.data.length !== 0) { 
                        var ob = {};
                        ob = helpersData.mergeObjects(models.user, user);
                        ob = helpersData.toSQLData(ob);

                        var query = helpersData.buildQuery(tables.user, "update",
                        ob.username, ob.password, ob.givenname, 
                        ob.middlename, ob.familyname, ob.email, 
                        ob.gender, ob.birthdate, id);
                        db.run(query);
                        
                        return resolve(Data(true, false, `User has been updated`));
                    }
                    return resolve(Data(false, true, `User can't update in updateUser`));
                }, (error) => {
                    return reject(Data(false, true, error));
                });
                
            } catch(err) {
                console.error('error: ', err);
                return reject(Data(false, true, err));
            }
        });
    },
    deleteUser: (id) => {
        return new Promise(function (resolve, reject) {
            try {
                // check if id exist
                UserCore.findByIdUsers(id).then((response) => {
                    if(response.data.length !== 0) {
                        var query = helpersData.buildQuery(tables.user, "delete", id);
                        db.run(query);
                        return resolve(Data(true, false, `User has been deleted`));
                    }
                    return resolve(Data(false, true, `User can't delete in deleteUser`));
                }, (error) => {
                    return reject(Data(false, true, error));
                });
                
            } catch(err) {
                console.error('error: ', err);
                return reject(Data(false, true, err));
            }
        });
    }
}
//#endregion Functions-Users-Table

//#region Functions-Wallets-Table
var WalletCore = {
    findAllWallets: () => {
        return new Promise(function (resolve, reject) {
            db.serialize(function() { 
                var query = helpersData.buildQuery(tables.wallet, "findAll");
                db.all(query, function(err, rows) {
                    if(err) return reject(Data(null, true, err));
                    return resolve(Data(rows));
                });
            });
        });
    },
    findByIdWallets: (id) => {
        return new Promise(function (resolve, reject) {
            db.serialize(function() { 
                var query = helpersData.buildQuery(tables.wallet, "findById", id);
                db.all(query, function(err, rows) {
                    if(err) return reject(Data(null, true, err));
                    return resolve(Data(rows));
                });
            });
        });
    },
    findByNameWallets: (name) => {
        return new Promise(function (resolve, reject) {
            var query = helpersData.buildQuery(tables.wallet, "findByName", name);
            db.all(query, function(err, rows) {
                if(err) return reject(Data(null, true, err));
                return resolve(Data(rows));
            });
        });
    },
    findAnyNameWallets: (name) => {
        return new Promise(function (resolve, reject) {
            var query = helpersData.buildQuery(tables.wallet, "findAnyName", name);
            db.all(query, function(err, rows) {
                if(err) return reject(Data(null, true, err));
                return resolve(Data(rows));
            });
        });
    },
    addWallet: (Wallet) => {
        return new Promise(function (resolve, reject) {
            try {
                // check if name exist
                WalletCore.findByNameWallets(Wallet.name).then((response) => {
                    if(response.data.length === 0) {
                        var ob = {};
                        ob = helpersData.mergeObjects(models.wallet, Wallet);
                        ob = helpersData.toSQLData(ob);

                        var query = helpersData.buildQuery(tables.wallet, "add", 
                        ob.name, ob.balance, ob.idcurrency, ob.iduser);                        
                        db.run(query);
                        
                        return resolve(Data(true, false, `Wallet has been updated`));
                    }
                    return resolve(Data(false, true, `Wallet can't update in addWallet`));
                }, (error) => {
                    return reject(Data(false, true, error));
                });
                
            } catch(err) {
                console.error('error: ', err);
                return reject(Data(false, true, err));
            }
        });
    },
    updateWallet: (id, Wallet) => {
        return new Promise(function (resolve, reject) {
            try {
                // check if id exist
                WalletCore.findByIdWallets(id).then((response) => {
                    if(response.data.length !== 0) { 
                        var ob = {};
                        ob = helpersData.mergeObjects(models.wallet, Wallet);
                        ob = helpersData.toSQLData(ob);

                        var query = helpersData.buildQuery(tables.wallet, "updat", 
                        ob.name, ob.balance, ob.idcurrency, ob.iduser, id);                        
                        db.run(query);
                        
                        return resolve(Data(true, false, `Wallet has been updated`));
                    }
                    return resolve(Data(false, true, `Wallet can't update in updateWallet`));
                }, (error) => {
                    return reject(Data(false, true, error));
                });
                
            } catch(err) {
                console.error('error: ', err);
                return reject(Data(false, true, err));
            }
        });
    },
    deleteWallet: (id) => {
        return new Promise(function (resolve, reject) {
            try {
                // check if id exist
                WalletCore.findByIdWallets(id).then((response) => {
                    if(response.data.length !== 0) {
                        var query = helpersData.buildQuery(tables.wallet, "delete", id);                        
                        db.run(query);
                        return resolve(Data(true, false, `Wallet has been deleted`));
                    }
                    return resolve(Data(false, true, `Wallet can't delete in deleteWallet`));
                }, (error) => {
                    return reject(Data(false, true, error));
                });
                
            } catch(err) {
                console.error('error: ', err);
                return reject(Data(false, true, err));
            }
        });
    }
}
//#endregion Functions-Wallets-Table

//#region Functions-Transaction-Table
var TransactionCore = {
    findAllTransactions: () => {
        return new Promise(function (resolve, reject) {
            db.serialize(function() { 
                var query = helpersData.buildQuery(tables.transaction, "findAll"); 
                db.all(query, function(err, rows) {
                    if(err) return reject(Data(null, true, err));
                    return resolve(Data(rows));
                });
            });
        });
    },
    findByIdTransactions: (id) => {
        return new Promise(function (resolve, reject) {
            db.serialize(function() { 
                var query = helpersData.buildQuery(tables.transaction, "findById", id); 
                db.all(query, function(err, rows) {
                    if(err) return reject(Data(null, true, err));
                    return resolve(Data(rows));
                });
            });
        });
    },
    findAnyNameTransactions: (name) => {
        return new Promise(function (resolve, reject) {
            var query = helpersData.buildQuery(tables.transaction, "findByName", name);
            db.all(query, function(err, rows) {
                if(err) return reject(Data(null, true, err));
                return resolve(Data(rows));
            });
        });
    },
    addTransaction: (Transaction) => {
        return new Promise(function (resolve, reject) {
            try {
                var ob = {};
                ob = helpersData.mergeObjects(models.transaction, Transaction);
                ob = helpersData.toSQLData(ob);

                var query = helpersData.buildQuery(tables.transaction, "add", 
                ob.description, ob.value, ob.update, ob.idcurrency, ob.idwallet, 
                ob.idtype, ob.idcurrency, ob.isbudget); 
                db.run(query);

                return resolve(Data(true, false, `Transaction has been updated`));
            } catch(err) {
                console.error('error: ', err);
                return reject(Data(false, true, err));
            }
        });
    },
    updateTransaction: (id, Transaction) => {
        return new Promise(function (resolve, reject) {
            try {
                // check if id exist
                TransactionCore.findByIdTransactions(id).then((response) => {
                    if(response.data.length !== 0) { 
                        var ob = {};
                        ob = helpersData.mergeObjects(models.transaction, Transaction);
                        ob = helpersData.toSQLData(ob);

                        var query = helpersData.buildQuery(tables.transaction, "update", 
                        ob.description, ob.value, ob.update, ob.idcurrency, ob.idwallet, 
                        ob.idtype, ob.idcurrency, ob.isbudget, id);                 
                        db.run(query);
                        
                        return resolve(Data(true, false, `Transaction has been updated`));
                    }
                    return resolve(Data(false, true, `Transaction can't update in updateTransaction`));
                }, (error) => {
                    return reject(Data(false, true, error));
                });
                
            } catch(err) {
                console.error('error: ', err);
                return reject(Data(false, true, err));
            }
        });
    },
    deleteTransaction: (id) => {
        return new Promise(function (resolve, reject) {
            try {
                // check if id exist
                TransactionCore.findByIdTransactions(id).then((response) => {
                    if(response.data.length !== 0) {
                        var query = helpersData.buildQuery(tables.transaction, "delete", id); 
                        db.run(query);
                        return resolve(Data(true, false, `Transaction has been deleted`));
                    }
                    return resolve(Data(false, true, `Transaction can't delete in deleteTransaction`));
                }, (error) => {
                    return reject(Data(false, true, error));
                });
                
            } catch(err) {
                console.error('error: ', err);
                return reject(Data(false, true, err));
            }
        });
    }
}
//#endregion Functions-Transaction-Table

//#region Functions-Plan-Table
var PlanCore = {
    findAllPlans: () => {
        return new Promise(function (resolve, reject) {
            db.serialize(function() { 
                var query = helpersData.buildQuery(tables.plan, "findAll");    
                db.all(query, function(err, rows) {
                    if(err) return reject(Data(null, true, err));
                    return resolve(Data(rows));
                });
            });
        });
    },
    findByIdPlans: (id) => {
        return new Promise(function (resolve, reject) {
            db.serialize(function() { 
                var query = helpersData.buildQuery(tables.plan, "findById", id);      
                db.all(query, function(err, rows) {
                    if(err) return reject(Data(null, true, err));
                    return resolve(Data(rows));
                });
            });
        });
    },
    findByNamePlans: (name) => {
        return new Promise(function (resolve, reject) {
            var query = helpersData.buildQuery(tables.plan, "findByName", name);    
            db.all(query, function(err, rows) {
                if(err) return reject(Data(null, true, err));
                return resolve(Data(rows));
            });
        });
    },
    findAnyNamePlans: (name) => {
        return new Promise(function (resolve, reject) {
            var query = helpersData.buildQuery(tables.plan, "findAnyName", name);    
            db.all(query, function(err, rows) {
                if(err) return reject(Data(null, true, err));
                return resolve(Data(rows));
            });
        });
    },
    addPlan: (Plan) => {
        return new Promise(function (resolve, reject) {
            try {
                // check if name exist
                PlanCore.findByNamePlans(Plan.name).then((response) => {
                    if(response.data.length === 0) {
                        var ob = {};
                        ob = helpersData.mergeObjects(models.plan, Plan);
                        ob = helpersData.toSQLData(ob);

                        var query = helpersData.buildQuery(tables.plan, "add", 
                        ob.name, ob.value, ob.cutday, ob.paymentstype, 
                        ob.instalment, ob.update, ob.idwallet);
                        db.run(query);
                        
                        var pay = helpersData.getPayments(Plan.value, Plan.instalment, Plan.paymentstype, Plan.cutday);

                        /*for(var i = 0; i < Plan.instalment; i++) {
                            var tra = models.transaction;
                            tra.description , Plan.name}-${i+1}`;
                            tra.value = pay.payment;
                            tra.update = pay.dates[i + 1], 
                            tra.idcurrency =  1, 
                            tra.idwallet =  Plan.idwallet, 
                            tra.idtype =  1, 
                            tra.idplan =  1,
                            tra.isbudget =  true
                            TransactionCore.addTransaction(tra).then((res) => {
                                console.log(res.data);
                            });
                        }*/

                        return resolve(Data(true, false, `Plan has been updated`));
                    }
                    return resolve(Data(false, true, `Plan can't update in addPlan`));
                }, (error) => {
                    return reject(Data(false, true, error));
                });
                
            } catch(err) {
                console.error('error: ', err);
                return reject(Data(false, true, err));
            }
        });
    },
    updatePlan: (id, Plan) => {
        return new Promise(function (resolve, reject) {
            try {
                // check if id exist
                PlanCore.findByIdPlans(id).then((response) => {
                    if(response.data.length !== 0) { 
                        var ob = {};
                        ob = helpersData.mergeObjects(models.plan, Plan);
                        ob = helpersData.toSQLData(ob);

                        var query = helpersData.buildQuery(tables.plan, "update", 
                        ob.name, ob.value, ob.cutday, ob.paymentstype, 
                        ob.instalment, ob.update, ob.idwallet, id);
                        db.run(query);
                        
                        return resolve(Data(true, false, `Plan has been updated`));
                    }
                    return resolve(Data(false, true, `Plan can't update in updatePlan`));
                }, (error) => {
                    return reject(Data(false, true, error));
                });
                
            } catch(err) {
                console.error('error: ', err);
                return reject(Data(false, true, err));
            }
        });
    },
    deletePlan: (id) => {
        return new Promise(function (resolve, reject) {
            try {
                // check if id exist
                PlanCore.findByIdPlans(id).then((response) => {
                    if(response.data.length !== 0) {
                        var query = helpersData.buildQuery(tables.plan, "delete", id);
                        db.run(query);
                        return resolve(Data(true, false, `Plan has been deleted`));
                    }
                    return resolve(Data(false, true, `Plan can't delete in deletePlan`));
                }, (error) => {
                    return reject(Data(false, true, error));
                });
                
            } catch(err) {
                console.error('error: ', err);
                return reject(Data(false, true, err));
            }
        });
    }
}
//#endregion Functions-Plan-Table


module.exports = {
    //Types
    findAllTypes: TypesCore.findAllTypes,
    findByIdTypes: TypesCore.findByIdTypes,
    findAnyNameTypes: TypesCore.findAnyNameTypes,
    addType: TypesCore.addType,
    updateType: TypesCore.updateType,
    deleteType: TypesCore.deleteType,
    //Currencies
    findAllCurrencies: CurrencyCore.findAllCurrencies, 
    findByIdCurrencies: CurrencyCore.findByIdCurrencies, 
    findAnyNameCurrencies: CurrencyCore.findAnyNameCurrencies,
    addCurrency: CurrencyCore.addCurrency,
    updateCurrency: CurrencyCore.updateCurrency, 
    deleteCurrency: CurrencyCore.deleteCurrency,
    //Users
    findAllUsers: UserCore.findAllUsers, 
    findByIdUsers: UserCore.findByIdUsers, 
    findAnyNameUsers: UserCore.findAnyNameUsers,
    addUser: UserCore.addUser,
    updateUser: UserCore.updateUser, 
    deleteUser: UserCore.deleteUser,
    //Wallet
    findAllWallet: WalletCore.findAllWallets,
    findByIdWallet: WalletCore.findByIdWallets,
    findAnyNameWallet: WalletCore.findAnyNameWallets,
    addWallet: WalletCore.addWallet,
    updateWallet: WalletCore.updateWallet,
    deleteWallet: WalletCore.deleteWallet,
    //Transaction
    findAllTransaction: TransactionCore.findAllTransactions,
    findByIdTransaction: TransactionCore.findByIdTransactions,
    findAnyNameTransaction: TransactionCore.findAnyNameTransactions,
    addTransaction: TransactionCore.addTransaction,
    updateTransaction: TransactionCore.updateTransaction,
    deleteTransaction: TransactionCore.deleteTransaction,
    //Plan
    findAllPlan: PlanCore.findAllPlans,
    findByIdPlan: PlanCore.findByIdPlans,
    findAnyNamePlan: PlanCore.findAnyNamePlans,
    addPlan: PlanCore.addPlan,
    updatePlan: PlanCore.updatePlan,
    deletePlan: PlanCore.deletePlan
}