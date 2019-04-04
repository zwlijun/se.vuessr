/**********************************************************
 * Copyright (c) SESHENGHUO.COM All rights reserved       *
 **********************************************************/

/**
 * Handler
 * @charset utf-8
 * @author lijun
 * @git: https://github.com/zwlijun/se.vuessr
 * @date 2019.3
 */
'use strict';

const _public = {
	/**
     * 创建一个合法的handler
     * @param  {[type]} handler [description]
     * @return {[type]}         [description]
     */
    createHandler: function(handler){
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
    },
	/**
     * 执行回调
     * @param  {[type]} handler [description]
     * @param  {[type]} args    [description]
     * @return {[type]}         [description]
     */
    execHandler: function(handler, args){
        let _args = [].concat(args || []);
        let _handler = this.createHandler(handler);

        if(_handler){
            let $callback = _handler.callback || null;
            let $args = _args.concat(_handler.args || []);
            let $context = _handler.context || null;

            if($callback && $callback.apply){
                return $callback.apply($context, $args);
            }
        }

        return undefined;
    }
};

export default _public;