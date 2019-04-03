/**********************************************************
 * Copyright (c) SESHENGHUO.COM All rights reserved       *
 **********************************************************/

/**
 * 运行环境
 * @charset utf-8
 * @author lijun
 * @git: https://github.com/zwlijun/se.vuessr
 * @date 2019.4
 */
'use strict';

function getGlobalObject(type){
	let obj = undefined;

    try{
        if("window" == type){
            obj = (window.window === window) ? window : undefined;
        }else if("global" == type){
            obj = (global.global === global) ? global : undefined;
        }
    }catch(e){
    	obj = undefined;
    }finally{
    	return obj;
    }
}

export default const {
	__global: {},
	node: function(){
		return !!getGlobalObject("global");
	},
	browser: function(){
		return !!getGlobalObject("window");
	},
	global: function(){
		return getGlobalObject("window") || getGlobalObject("global") || this.__global;
	}
}