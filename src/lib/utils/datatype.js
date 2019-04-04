/**********************************************************
 * Copyright (c) SESHENGHUO.COM All rights reserved       *
 **********************************************************/

/**
 * 数据类型检测
 * @charset utf-8
 * @author lijun
 * @git: https://github.com/zwlijun/se.vuessr
 * @date 2019.4
 */
'use strict';

function dataType(obj){
    if(isHTMLElement(obj)){
        return "node";
    }else if(isHTMLElementCollection(obj)){
        return "nodelist";
    }

    let str = Object.prototype.toString.call(obj);
    let type = (str.substring(str.indexOf(" ") + 1, str.indexOf("]"))).toLowerCase();

    return type;
}

function isHTMLElement(obj){
    return obj instanceof Node;
}

function isHTMLElementCollection(obj){
    return obj instanceof NodeList;
}

const _public = {
    type: function(obj){
        return dataType(obj);
    },
    isHTMLElement: function(obj){
        return isHTMLElement(obj);
    },
    isHTMLElementCollection: function(obj){
        return isHTMLElementCollection(obj);
    },
    isWindow: function(obj){
        let _ret = false;
        try{
            _ret = obj.window === window;
        }catch(e){
            _ret = false;
        }

        return _ret;
    },
    isGlobal: function(obj){
        let _ret = false;
        try{
            _ret = obj.global === global;
        }catch(e){
            _ret = false;
        }

        return _ret;
    },
    isObject: function(obj){
        return "object" === dataType(obj);
    },
    isPlainObject: function(obj){
        if(!this.isObject(obj) 
            || this.isHTMLElement(obj) 
                || this.isHTMLElementCollection(obj)
                    || this.isWindow(obj)
                        || this.isGlobal(obj)) {
            return false;
        }

        let tmp = {};
        let hasOwn = tmp.hasOwnProperty;

        if(obj.constructor 
            && !hasOwn.call(obj, "constructor") 
                && !hasOwn.call(obj.constructor.prototype || {}, "isPrototypeOf")){
            return false;
        }

        let key;
        for(key in obj){}

        return undefined === key || hasOwn.call(obj, key);
    },
    isEmptyObject: function(obj){
        let key;
        for(key in obj){
            return false;
        }

        return true;
    },
    isString: function(obj){
        return "string" === dataType(obj);
    },
    isNumber: function(obj){
        return "number" === dataType(obj);
    },
    isInt: function(obj){
        if(this.isNumber(obj)){
            return obj === Math.floor(obj);
        }

        return false;
    },
    isFloat: function(obj){
        if(this.isNumber(obj)){
            return obj !== Math.floor(obj);
        }

        return false;
    },
    isBoolean: function(obj){
        return (true === obj || false === obj);
    },
    isNull: function(obj){
        return (null === obj);
    },
    isUndefined: function(obj){
        return (undefined === obj);
    },
    isEmptyString: function(obj){
        if(this.isString(obj)){
            obj = obj.replace(/^([\s]+)|([\s]+)$/, "");

            return "" === obj;
        }

        return false;
    },
    isArray: function(){
        if(Array.isArray){
            return Array.isArray(obj);
        }

        return "array" === dataType(obj)
    },
    isFunction: function(obj){
        return "function" === dataType(obj);
    },
    isDate: function(obj){
        return "date" === dataType(obj);
    },
    isRegExp: function(obj){
        return "regexp" === dataType(obj);
    }
};

export default _public;
