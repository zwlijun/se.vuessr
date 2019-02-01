/**********************************************************
 * Copyright (c) SESHENGHUO.COM All rights reserved       *
 **********************************************************/

/**
 * 数据请求
 * @charset utf-8
 * @author lijun
 * @git: https://github.com/zwlijun/se.vuessr
 * @date 2019.2
 */
'use strict';

const axios = require("axios");

/**
 * 构造方法
 * @param String name
 */
function XNet(name) {
    this.name = name; //实例名称
    this.showLoading = false; //是否显示loading
    this.loadingText = "Loading"; //loading提示语
    this.context = null; //上下文
    this.onBefore = null; //发请求前前
    this.onSuccess = null; //请求成功
    this.onError = null; //请求失败
    this.onComplete = null; //请求完成
    this.onCancel = null; //请求取消
    this.onTimeout = null; //请求超时
    this.onAborted = null; //请求中断
    this.onRequestError = null; //请求错误
    this.onResponseError = null; //响应错误
    this.onServiceError = null; //数据服务错误
    this.onNetworkError = null; //网络请求错误
    this.dataTransform = null; //数据转换器
    this.axios = axios.create({
        "headers": {
            "X-Requested-With": "XMLHttpRequest"
        },
        "method": XNet.POST,
        "responseType": "json",
        "responseEncoding": "utf8",
        "timeout": 15 * 1000  //15秒超时
    });
}

//定义静态属性
XNet.GET        = "GET";
XNet.POST       = "POST";
XNet.PUT        = "PUT";
XNet.HEAD       = "HEAD";
XNet.OPTIONS    = "OPTIONS";
XNet.DELETE     = "DELETE";
XNet.PATCH      = "PATCH";
XNet.PAGE_SIZE  = 20;
XNet.ref        = new Map(); //实例缓存

XNet.prototype = {
    /**
     * 构建参数
     */
    createOptions: function(options){
        this.showLoading = true === options["showLoading"];
        this.loadingText = options["loadingText"] || "Loading";
        this.onBefore = options["onBefore"] || null;
        this.onSuccess = options["onSuccess"] || null;
        this.onError = options["onError"] || null;
        this.onComplete = options["onComplete"] || null;
        this.onCancel = options["onCancel"] || null;
        this.onTimeout = options["onTimeout"] || null;
        this.onAborted = options["onAborted"] || null;
        this.onRequestError = options["onRequestError"] || null;
        this.onResponseError = options["onResponseError"] || null;
        this.onServiceError = options["onServiceError"] || null;
        this.onNetworkError = options["onNetworkError"] || null;
        this.dataTransform = options["dataTransform"] || function(resp){
            let dataSource = Object.assgin({}, resp);
            let newResp = {
                "code": dataSource["code"],
                "message": dataSource["message"],
                "success": "0" === dataSource["code"],
                "recordSize": dataSource["recordSize"] || 0,
                "pageSize": dataSource["pageSize"] || XNet.PAGE_SIZE,
                "pageIndex": dataSource["pageIndex"] || 1,
                "data": dataSource.data || {},
                "dataSource": dataSource
            };

            return newResp;
        };
        //-----------------------------------------------------------
        const context = Object.assgin({}, options["context"] || {});
        if("context" in options){
            delete options["context"];
        };

        this.context = Object.assgin({
            "name": this.name,
            "showLoading": this.showLoading,
            "loadingText": this.loadingText,
            "onBefore": this.onBefore,
            "onSuccess": this.onSuccess,
            "onError": this.onError,
            "onComplete": this.onComplete,
            "onCancel": this.onCancel,
            "onTimeout": this.onTimeout,
            "onAborted": this.onAborted,
            "onRequestError": this.onRequestError,
            "onResponseError": this.onResponseError,
            "onServiceError": this.onServiceError,
            "onNetworkError": this.onNetworkError,
            "dataTransform": this.dataTransform
        }, context, options);
    },
    /**
     * 处理loading
     * @param Boolean visible
     */
    dealLoading: function(visible){
        let xnet = this;
        let context = xnet.context;

        if(true === context.showLoading){
            //@todo
            if(true === visible){
                //@todo -> show
            }else{
                //@todo -> hide
            }
        }
    },
    /**
     * 分发事件回调
     * @param String type
     * @param Array args
     */
    dispatch: function(type, args){
        let xnet = this;
        let context = xnet.context;
        let listener = "on" + type.charAt(0).toUpperCase() + type.substring(1);

        if((listener in context) && context[listener] && context[listener].apply){
            context[listener].apply(context, [].concat(args || []))
        }
    },
    /**
     * 发送请求前处理方法
     */
    beforeSend: function(){
        let xnet = this;

        xnet.dealLoading(true);
        xnet.dispatch("before", [])
    },
    /**
     * 取消请求
     * @param String message
     */
    cancel: function(message){
        let xnet = this;

        if(xnet.cancelTokenSource){
            xnet.cancelTokenSource.cancel(message);
        }
    },
    /**
     * 解析错误
     * @param Object err
     */
    parseError: function(err){
        let xnet = this;

        //Request aborted'  ECONNABORTED
        //Network Error
        //timeout of  ECONNABORTED
        if("message" in err){
            let message = (err["message"] || "").toLowerCase();

            if(message.includes("aborted")){
                xnet.dispatch("aborted", [err]);
            }else if(message.includes("network error")){
                xnet.dispatch("networkError", [err])
            }else if(message.includes("timeout")){
                xnet.dispatch("timeout", [err]);
            }
        }
    },
    /**
     * 日志
     * @param String message
     */
    log: function(message){
        console && console.log(message);
    },
    /**
     * 发送请求
     */
    send: function(){
        const startTime = Date.now();

        let xnet = this;
        let context = xnet.context;
        let http = xnet.axios;
        let interceptors = http.interceptors;

        let CancelToken = http.CancelToken;
        let cancelTokenSource = CancelToken.source();

        xnet.cancelTokenSource = cancelTokenSource;
        xnet.context = Object.assgin({
            "cancelToken": cancelTokenSource.token
        }, context);

        //请求拦截器
        interceptors.request.use((config) => {
            xnet.beforeSend();

            return config;
        }, (error) => {
            xnet.dealLoading(false);
            //@todo

            return Promise.reject(error);
        });
        //响应拦截器
        interceptors.response.use((resp) => {
            xnet.dealLoading(false);

            //数据转换器
            resp = context.dataTransform.apply(context, [resp]);

            if(true === resp.success){
                return resp;
            }else{
                return Promise.reject({
                    "xnet": resp
                });
            }
        }, (error) => {
            xnet.dealLoading(false);
            //@todo

            return Promise.reject(error);
        });

        http.request(context).then((resp) => {
            xnet.log(`${context.url} -> response time: ${Date.now() - startTime}ms`);
            
            xnet.dispatch("complete", [resp, true]);
            xnet.dispatch("success", [resp]);
        }).catch((err) => {
            xnet.log(`${context.url} -> response time: ${Date.now() - startTime}ms`);

            xnet.dispatch("complete", [err, false]);
            xnet.dispatch("error", [err]);

            if(http.isCancel(err)){
                xnet.dispatch("cancel", [err]);
            }else{
                if(err.response){
                    xnet.dispatch("resposneError", [err]);
                }else if(err.request){
                    xnet.dispatch("requestError", [err]);                    
                }else if(err.xnet){
                    xnet.dispatch("serviceError", [err.xnet]);
                }

                xnet.parseError(err);
            }
        })
    }
};

/**
 * 创建一个XNet实例
 * @param String name
 */
XNet.create = function(name){
    if(!XNet.ref.has(name)){
        XNet.ref.set(name, new XNet(name));
    }

    let xnet = XNet.ref.get(name);

    return {
        createOptions: function(options){
            xnet.createOptions(options);
        },
        send: function(){
            xnet.send();
        },
        cancel: function(message){
            xnet.cancel(message);
        }
    };
}

/**
 * 获取一个XNet实例，如果不存在返回null
 * @param String name
 */
XNet.getInstance = function(name){
    if(!XNet.ref.has(name)){
        return null;
    }

    return XNet.create(name);
}

/**
 * 执行
 * @param String name
 * @param Object options 
 */
XNet.exec = function(name, options){
    const xnet = XNet.create(name);

    xnet.createOptions(options || {});
    xnet.send();
}

export {create, getInstance, exec};
