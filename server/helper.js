// Prototipes
/*****************************
# Usages 
  extending the Object of this module

  CODE {
    helper.extendString(String);
    // declare
    var result = String.format("Hello {0}", "World");
    //result print: Hello World
  }
*******************************/

function extendString(stringConstructor) {
    stringConstructor.format = function () {
        var s = arguments[0];
        for (var i = 0; i < arguments.length - 1; i++) {
            var reg = new RegExp("\\{" + i + "\\}", "gm");
            s = s.replace(reg, arguments[i + 1]);
        }
        return s;
    }
}

function extendArray(arrayConstructor) {
    arrayConstructor.diff = function (a) {
      return this.filter(function (i) {
        return !(a.indexOf(i) > -1);
      });
    };
}

//Helpers
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
function mergeObjectsUpdate(base, values) {
    var result = base;
    for(var key in base) {
        if(values[key] != undefined || values[key] != null)  
            result[key] = values[key];
         else if(!(result[key] != undefined || result[key] != null))  
            result[key] = null;
    }
    return result;
}

function exploreObject(obj) {
    for (var key in obj) {
        var val = obj[key];
            // use val
            console.log(key);
            console.log(obj[key]);
        // if (Object.prototype.hasOwnProperty.call(obj, key)) {
            
        // }
    }
}

module.exports = {
    isNumber: isNumber,
    SQLString: SQLString,
    extendArray: extendArray,
    extendString: extendString,
    toSQLData: toSQLData, 
    mergeObjects: mergeObjects,
    mergeObjectsUpdate: mergeObjectsUpdate
};
