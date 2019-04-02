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
    try{
        let dataType = "";

        if("window" == type){
            dataType = Object.prototype.toString.call(window);
        }else if("global" == type){
            type = "object";
            dataType = Object.prototype.toString.call(global);
        }
        dataType = dataType.substring(dataType.indexOf(" ") + 1, dataType.indexOf("]"));
        dataType = dataType.toLowerCase();

        if(dataType === type){
            return obj
        }
    }catch(e){}

    return undefined;
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
		if(this.node()){
			return global;
		}

		if(this.browser()){
			return window;
		}

		return this.__global;
	}
}