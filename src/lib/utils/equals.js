/**********************************************************
 * Copyright (c) SESHENGHUO.COM All rights reserved       *
 **********************************************************/

/**
 * equals
 * @charset utf-8
 * @author lijun
 * @git: https://github.com/zwlijun/se.vuessr
 * @date 2019.3
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

function str(obj){
    return "" + obj;
}

function bool(obj){
    return new Boolean(obj).valueOf();
}

function num(obj){
    return new Number(obj).valueOf();
}

function func(obj){
    let str = obj.toString();

    str = str.replace(/^([\t\r\n ]+)|([\t\r\n ]+)$/mg, "");

    return str;
}

function arr(o0, o1){
    if(o0.length !== o1.length){
        return false;
    }

    let result = true;
    for(let i = 0, size = o0.length; i < size; i++){
        if(!equals(o0[i], o1[i])){
            result = false;
            break;
        }
    }

    return result;
}

function obj(o0, o1){
    if(!arr(Object.keys(o0), Object.keys(o1))){
        return false;
    }

    if(!arr(Object.entries(o0), Object.entries(o1))){
        return false;
    }

    return true;
}

function nodes(o0, o1){
    //todo
    let s0 = o0.length;
    let s1 = o1.length;

    if(s0 !== s1){
        return false;
    }

    let n0 = null;
    let n1 = null;

    for(let i = 0; i < s0; i++){
        n0 = s0[i];
        n1 = s1[i];

        if(n0.outerHTML !== n1.outerHTML){
            return false;
        }
    }

    return true;
}

function equals(obj1, obj2){
    if(obj1 === obj2){
        return true;
    }

    let type1 = dataType(obj1);
    let type2 = dataType(obj2);

    if(type1 !== type2){
        return false;
    }

    switch(type1){
        case "regexp":
        case "string":
        case "text":
            return str(obj1) === str(obj2);
        case "boolean":
            return bool(obj1) === bool(obj2);
        case "number":
            return num(obj1) === num(obj2);
        case "date":
            return +obj1 === +obj2;
        case "function":
            return func(obj1) === func(obj2);
        case "array":
            return arr(obj1, obj2);
        case "node":
            return obj1.outerHTML === obj2.outerHTML;
        case "nodelist":
            return nodes(obj1, obj2);
        case "object":
            return obj(obj1, obj2);
    }

    return false;
}


export default equals;
