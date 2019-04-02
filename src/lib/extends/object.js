/**********************************************************
 * Copyright (c) SESHENGHUO.COM All rights reserved       *
 **********************************************************/

/**
 * 对象扩展类
 * @charset utf-8
 * @author lijun
 * @git: https://github.com/zwlijun/se.vuessr
 * @date 2019.4
 */
'use strict';

function isHTMLElement(obj){
    return obj instanceof Node;
}

function isHTMLElementCollection(obj){
    return obj instanceof NodeList;
}

function isDirectAssignmentVariable(v){
    if(Object.isFrozen(v) 
        || Object.values(v || 0).length === 0 
            || Array.isArray(v) 
                || isHTMLElement(v) 
                    || isHTMLElementCollection(v)){
        //TODO
        return true;
    }

    return false;
}

export default const {
	/**
     * Object.assign() 的深度访问实现
     * 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
     * @param  {...[type]} args [description]
     * @return {[type]}         [description]
     */
    assign: function(...args){
        let items = Array.from(arguments);
        let size = items.length;

        if(size === 0){
            return {};
        }

        if(size == 1){
            return items[0] || {};
        }

        let a = items.shift();
        let b = items.shift();

        let x = Object.assign({}, a);

        for(let key in b){
            if(b.hasOwnProperty(key)){
                if(key in a){
                    if(isDirectAssignmentVariable(b[key]) || isDirectAssignmentVariable(a[key])){
                        x[key] = b[key];
                    }else{
                        x[key] = this.assign.apply(this, [a[key], b[key]]);
                    }
                }else{
                    x[key] = b[key];
                }
            }
        }

        if(size > 2){
            items.unshift(x);
            x = this.assign.apply(this, items);
        }

        return x;
    },
    /**
     * 根据路径查找对象值
     * @param  {[type]} obj       查找的对象
     * @param  {[type]} paths     路径
     * @param  {[type]} separator 路径分隔符
     * @return {[type]}           [description]
     */
    find: function(obj, paths, separator){
        let items = paths.split(separator || "/");
        let size = items.length;
        let o = undefined;
        let key = null;

        let tmp = undefined;
        for(let i = 0; i < size; i++){
            key = items[i];

            if(!key){
                continue;
            }

            if(key.indexOf("[") !== -1 && key.indexOf("]") !== -1){
                let s1 = key.substring(0, key.indexOf("["));
                let s2 = Number(key.substring(key.indexOf("[") + 1, key.indexOf("]")));

                tmp = tmp[s1][s2];
            }else{
                tmp = tmp[key];
            }
        }

        o = tmp;

        return o;
    }
}