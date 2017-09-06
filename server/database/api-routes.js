var express = require('express');
var router = express.Router();
var categories = require('./controllers/categories-controller');
var currency = require('./controllers/currency-controller');
var user = require('./controllers/user-controller');
var wallet = require('./controllers/wallet-controller');
var transaction = require('./controllers/transaction-controller');
var plan = require('./controllers/plan-controller');
var config = require('./controllers/config-controller')

//#region Router-config-Data
    router.get('/config', config.findAll);
    router.post('/config', config.add);
    router.put('/config/:id', config.update);
    router.delete('/config/:id', config.deleteById);
//#endregion Router-config-Data

//#region Router-Currency-Data
    router.get('/currency', currency.findAll);
    router.get('/currency/name/:name', currency.findAnyName);
    router.get('/currency/:id', currency.findById);
    router.post('/currency', currency.add);
    router.put('/currency/:id', currency.update);
    router.delete('/currency/:id', currency.deleteById);
    router.delete('/currency/batch/:array', currency.deleteBatch);
//#endregion Router-Currency-Data

//#region Router-categories-Data
    router.get('/categories', categories.findAll);
    router.get('/categories/name/:name', categories.findAnyName);
    router.get('/categories/:id', categories.findById);
    router.post('/categories', categories.add);
    router.put('/categories/:id', categories.update);
    router.delete('/categories/:id', categories.deleteById);
    router.delete('/categories/batch/:array', categories.deleteBatch);
    // router.delete('/currency/batch/:array', currency.deleteBatch);
//#endregion Router-categories-Data

//#region Router-users-Data
    router.get('/users', user.findAll);
    router.get('/users/username/:name', user.findAnyName);
    router.get('/users/:id', user.findById);
    router.post('/users', user.add);
    router.put('/users/:id', user.update);
    router.delete('/users/:id', user.deleteById);
//#endregion Router-users-Data

//#region Router-Wallets-Data
    router.get('/wallets', wallet.findAll);
    router.get('/wallets/name/:name', wallet.findAnyName);
    router.get('/wallets/:id', wallet.findById);
    router.post('/wallets', wallet.add);
    router.put('/wallets/:id', wallet.update);
    router.delete('/wallets/:id', wallet.deleteById);
    router.delete('/wallets/batch/:array', wallet.deleteBatch);
//#endregion Router-Wallets-Data

//#region Router-transactions-Data
    router.get('/transactions', transaction.findAll);
    router.get('/transactions/name/:name', transaction.findAnyName);
    router.get('/transactions/:id', transaction.findById);
    router.post('/transactions', transaction.add);
    router.put('/transactions/:id', transaction.update);
    router.delete('/transactions/:id', transaction.deleteById);
    router.delete('/transactions/batch/:array', transaction.deleteBatch);
//#endregion Router-Wallets-Data

//#region Router-plans-Data
    // router.get('/plans', plan.findAll);
    // router.get('/plans/:name', plan.findAnyName);
    // router.get('/plan/:id', plan.findById);
    // router.post('/plan', plan.add);
    // router.put('/plan/:id', plan.update);
    // router.delete('/plan/:id', plan.deleteById);
//#endregion Router-Wallets-Data

module.exports = router;