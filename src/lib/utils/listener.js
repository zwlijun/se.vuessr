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
import Handler from "./handler";

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
        return Handler.createHandler(handler);
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
        let conf = this.handlers;
        let _handler = null;

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
        let conf = this.handlers;
        let _handler = this.createHandler(handler);

        if(key in conf){
            if(!_handler){
                delete this._handlers[key];
                this._handlers[key] = null;
            }else{
                let items = [].concat(conf[key] || []);

                for(let i = items.length - 1; i >= 0; i--){
                    if(equals(_handler, items[i])){
                        items.splice(i, 1);
                    }
                }

                this._handlers[key] = items
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
        return Handler.execHandler(handler, args);
    }

    /**
     * 执行所有注册的回调
     * @param  {[type]} eventType [description]
     * @param  {[type]} args      [description]
     * @return {[type]}           [description]
     */
    exec(eventType, args){
        const key = "on" + eventType;
        let conf = this.handlers;
        let items = conf[key] || [];
        let size = items.length;

        let results = [];
        for(let i = 0; i < size; i++){
            results.push(this.execHandler(items[i], args))
        }

        return results;
    }
}


export default Listener;