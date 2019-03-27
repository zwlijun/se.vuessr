/**********************************************************
 * Copyright (c) SESHENGHUO.COM All rights reserved       *
 **********************************************************/

/**
 * 内部监听器
 * @charset utf-8
 * @author lijun
 * @git: https://github.com/zwlijun/se.vuessr
 * @date 2019.3
 */
'use strict';

const equals = require("./equals");

class Listener{
	_handlers = {};

	constructor(handlers){
		this._handlers = handlers || {};
	}

	/**
	 * 获取handlers对象
	 * @return {[type]} [description]
	 */
	public get handlers(){
		return this._handlers;
	}

	createHandler(handler){
		let _handler = null;

		if(Object.isFrozen(handler)){
			return _handler;
		}

		let def = {
			"callback": null,
			"args": [],
			"context": null,
			"returnValue": false
		};

		try{
			Object.seal(def);
			Object.assign(def, handler);

			_handler = def;
		}catch(e){
			_handler = null;
		}

		return _handler;
	}


	existed(key, handler){
		const _handler = this.createHandler(handler);

		if(null == _handler){
			return true;
		}

		const conf = this.handlers;
		const items = conf["on" + key];

		if(!items){
			this._handlers["on" + key] = [];
			return false;
		}

		const size = items.length;
		for(let i = 0; i < size; i++){
			if(equals(_handler, items[i])){
				return true;
			}
		}

		return false;
	}

	add(eventType, handler){
		const key = "on" + eventType;
		const conf = this.handlers;
		const _handler = null;

		if(null !== (_handler = this.createHandler(handler)) && !this.existed(eventType, handler)){
			conf[key].push(handler);

			this._handlers[key] = conf[key];
		}
	}
}