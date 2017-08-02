var config = require('../config/config.js');

// Helpers 
function buildQuery(table, name) {
    var statement = findStatement(table, name);
    if(statement && arguments.length > 1) {
        var counter = 0;
        for(var i = 2; i < arguments.length; i++ ) {
            var reg = new RegExp("\\{" + counter + "\\}", "gm");
            statement = statement.replace(reg, arguments[i]);
            counter++;
        }
    }
    return statement; 
}

function findStatement(table, name) {
    for (var i in table) {
        if (table[i].name === name)
            return table[i].statement;
    }
    return null;
}

function SQLString(object) {
    if (!isNumber(object)) {
        return "'" + object + "'";
    }
    else {
        return object;
    }
}

function isNumber(o) {
    return !isNaN(o - 0) && o !== null && o !== "" && o !== false;
}

function toSQLData(obj) {
    var result = obj;
    for(var key in obj) {
        
        if(obj[key] != undefined || obj[key] != null)  
            result[key] = SQLString(obj[key]);
        else 
            result[key] = null;
    }
    return result;
}

function mergeObjects(base, values) {
    var result = base;
    for(var key in base) {
        if(values[key] != undefined || values[key] != null)  
        
            result[key] = values[key];
        else
            result[key] = null;
    }
    return result;
}

Date.prototype.addDays = function(days) {
  var res = new Date();
  res.setDate(this.getDate() + days);
  return res;
}

function getPayments(amount, term, paymentstype, cutday) {
    var result = amount / term;
    var dates = getDates(paymentstype, cutday, term);
    return { payment: result, dates: dates };
}

function getDates(paymentstype, cutday, term) {
    var date = new Date();
    var arrayTerm = [];
    var days = getDays(paymentstype);
    
    var tempDate = date;
    for(var i = 0; i < term; i++) {
        if(i !== 0){
            tempDate = tempDate.addDays(days);
        }

        tempDate = checkIsWeeken(tempDate);
        arrayTerm.push(tempDate);
    }

    tempDate = tempDate.addDays(days);
    tempDate = checkIsWeeken(tempDate);
    arrayTerm.push(tempDate);

    return arrayTerm;
    
}

function checkIsWeeken(tempDate) {
    // check if is isWeekend
    console.log('tempDate.getDay(): ', tempDate.getDay());
    if(tempDate.getDay() == 6)
        tempDate = tempDate.addDays(2);
    if(tempDate.getDay() == 0)
        tempDate = tempDate.addDays(1);
    return tempDate;
}

function getDays(paymentstype) {
    switch(paymentstype) {
        case 1: //Semanal Payment
            return 7;
        case 2: //Quincenal Payment
            return 15;
        case 3: //Mensual Payment
            return 30;
        case 4: //Anualidad Payment
            return 365;

    }
}

module.exports = {
    buildQuery: buildQuery,
    SQLString: SQLString,
    isNumber: isNumber,
    toSQLData: toSQLData,
    mergeObjects: mergeObjects, 
    getPayments: getPayments
}