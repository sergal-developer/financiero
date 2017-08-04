var express = require('express');
var router = express.Router();
var types = require('./controllers/type-controller');
var currency = require('./controllers/currency-controller');
var user = require('./controllers/user-controller');
var wallet = require('./controllers/wallet-controller');
var transaction = require('./controllers/transaction-controller');
var plan = require('./controllers/plan-controller');

//#region Router-Currency-Data
    router.get('/currency', currency.findAll);
    router.get('/currency/name/:name', currency.findAnyName);
    router.get('/currency/:id', currency.findById);
    router.post('/currency', currency.add);
    router.put('/currency/:id', currency.update);
    router.delete('/currency/:id', currency.deleteById);
//#endregion Router-Currency-Data

//#region Router-Types-Data
    // router.get('/types', types.findAll);
    // router.get('/types/:name', types.findAnyName);
    // router.get('/type/:id', types.findById);
    // router.post('/type', types.add);
    // router.put('/type/:id', types.update);
    // router.delete('/type/:id', types.deleteById);
//#endregion Router-Types-Data



//#region Router-users-Data
    // router.get('/users', user.findAll);
    // router.get('/users/:name', user.findAnyName);
    // router.get('/user/:id', user.findById);
    // router.post('/user', user.add);
    // router.put('/user/:id', user.update);
    // router.delete('/user/:id', user.deleteById);
//#endregion Router-users-Data

//#region Router-Wallets-Data
    // router.get('/wallets', wallet.findAll);
    // router.get('/wallets/:name', wallet.findAnyName);
    // router.get('/wallet/:id', wallet.findById);
    // router.post('/wallet', wallet.add);
    // router.put('/wallet/:id', wallet.update);
    // router.delete('/wallet/:id', wallet.deleteById);
//#endregion Router-Wallets-Data

//#region Router-transactions-Data
    // router.get('/transactions', transaction.findAll);
    // router.get('/transactions/:name', transaction.findAnyName);
    // router.get('/transaction/:id', transaction.findById);
    // router.post('/transaction', transaction.add);
    // router.put('/transaction/:id', transaction.update);
    // router.delete('/transaction/:id', transaction.deleteById);
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