/**********************************************************
 * Copyright (c) SESHENGHUO.COM All rights reserved       *
 **********************************************************/

/**
 * 定时器
 * @charset utf-8
 * @author lijun
 * @git: https://github.com/zwlijun/se.vuessr
 * @date 2019.3
 */
'use strict';

import Handler from "./handler";
import Serializable from "./serializable";

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating     
// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel  
// MIT license
(function(){
    let lastTime = 0;
    let vendors = ['ms', 'moz', 'webkit', 'o'];

    for(let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame  = window[vendors[x] + 'CancelAnimationFrame']
                                    || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
 
    if(!window.requestAnimationFrame){
        window.requestAnimationFrame = function(callback, element) {
            let currTime = new Date().getTime();
            let timeToCall = Math.max(0, 16 - (currTime - lastTime));
            
            let id = window.setTimeout(function(){
                callback(currTime + timeToCall);
            }, timeToCall);

            lastTime = currTime + timeToCall;

            return id;
        };
    }
 
    if(!window.cancelAnimationFrame){
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());

const rAF = requestAnimationFrame;
const cAF = cancelAnimationFrame;

let Timer = function(name, fps, handler){
    this.name = name || Serializable.UUID(32);
    this.fps = fps || 0;
    this.handler = handler || null;
    this.timerId = null;
    this.isRunning = false;
    this.elapsedTime = 0;
    this.element = null;
};

Timer.prototype = {
    setTimerFPS: function(fps){
        this.fps = fps;
    },
    setTimerHandler: function(handler){
        this.handler = handler;
    },
    setElement: function(el){
        this.element = el;
    },
    toFPS: function(millisecond){
        return 1000 / millisecond;
    },
    toMillisecond: function(fps){
        return 1000 / fps;
    },
    start: function(){
        let _ins = this;
        let now = (new Date().getTime());
        let lastTime = now;
        let time = now;

        if(true !== _ins.isRunning){
            _ins.isRunning = true;

            const fn = function(){
                time = (new Date().getTime());

                if(_ins.fps === 0 || (_ins.fps > 0 && (time - lastTime) > (1000 / _ins.fps))){
                    _ins.elapsedTime = time - lastTime;

                    lastTime = time;
                    
                    Handler.execHandler(_ins.handler, [_ins]);
                }

                if(true === _ins.isRunning){
                    _ins.timerId = _ins.element ? rAF(fn, _ins.element) : rAF(fn);
                }
            };

            fn();
        }
    },
    stop: function(){
        if(true === this.isRunning){
            if(null != this.timerId){
                cAF(this.timerId);
                this.timerId = null;
            }

            this.isRunning = false;
        }
    },
    toggle: function(){
        if(true === this.isRunning){
            this.stop();
        }else{
            this.start();
        }
    },
    destroy: function(){
        let _timer = this;
        let name = _timer.name;

        _timer.stop();

        _timer.element = null;
        _timer.elapsedTime = 0;
        _timer.fps = 0;
        _timer.timerId = null;
        _timer.handler = null;

        Timer.TimerPool[name] = undefined;
        delete Timer.TimerPool[name];
    }
};

Timer.TimerPool = {};

const _public = {
	"getTimer": function(name, fps, handler){
        name = name || "timer_" + Serializable.UUID(32);
        fps = fps || 0;
        handler = handler || null;
        
        let timer = Timer.TimerPool[name] || (Timer.TimerPool[name] = new Timer(name, fps, handler));

        return timer;
    },
    "toFPS": function(millisecond){
        return 1000 / millisecond;
    },
    "toMillisecond": function(fps){
        return 1000 / fps;
    }
};

export default _public;
