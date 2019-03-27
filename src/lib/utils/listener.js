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

import equals from "./equals";

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

    /**
     * 创建一个合法的handler
     * @param  {[type]} handler [description]
     * @return {[type]}         [description]
     */
    createHandler(handler){
        let _handler = null;

        if(Object.isFrozen(handler)){
            return _handler;
        }

        let def = {
            "callback": null,
            "args": [],
            "context": null
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

    /**
     * 检测是否存在
     * @param  {[type]} key     [description]
     * @param  {[type]} handler [description]
     * @return {[type]}         [description]
     */
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

    /**
     * 添加一个回调句柄
     * @param {[type]} eventType [description]
     * @param {[type]} handler   [description]
     */
    add(eventType, handler){
        const key = "on" + eventType;
        const conf = this.handlers;
        const _handler = null;

        if(null !== (_handler = this.createHandler(handler)) && !this.existed(eventType, handler)){
            conf[key].push(handler);

            this._handlers[key] = conf[key];
        }
    }

    /**
     * 移除所有handler或指定的handler
     * @param  {[type]} eventType [description]
     * @param  {[type]} handler   [description]
     * @return {[type]}           [description]
     */
    remove(eventType, handler){
        const key = "on" + eventType;
        const conf = this.handlers;
        const _handler = this.createHandler(handler);

        if(key in conf){
            if(!_handler){
                delete this._handlers[key];
                this._handlers[key] = null;
            }else{
                const items = conf[key] || [];
                const size = items.length;
                for(let i = 0; i < size; i++){
                    if(equals(_handler, items[i])){
                        this._handlers[key].splice(i, 1);
                        break;
                    }
                }
            }
        }
    }

    /**
     * 执行回调
     * @param  {[type]} handler [description]
     * @param  {[type]} args    [description]
     * @return {[type]}         [description]
     */
    execHandler(handler, args){
        const _args = [].concat(args || []);
        const _handler = this.createHandler(handler);

        if(_handler){
            const $callback = _handler.callback || null;
            const $args = _args.concat(_handler.args || []);
            const $context = _handler.context || null;

            if($callback && $callback.apply){
                return $callback.apply($context, $args);
            }
        }

        return undefined;
    }

    /**
     * 执行所有注册的回调
     * @param  {[type]} eventType [description]
     * @param  {[type]} args      [description]
     * @return {[type]}           [description]
     */
    exec(eventType, args){
        const key = "on" + eventType;
        const conf = this.handlers;
        const items = conf[key] || [];
        const size = items.length;

        for(let i = 0; i < size; i++){
            this.execHandler(items[i], args)
        }
    }
}


export default Listener;