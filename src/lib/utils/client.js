/**********************************************************
 * Copyright (c) SESHENGHUO.COM All rights reserved       *
 **********************************************************/

/**
 * 客户端主求参数/URL解析处理类
 * @charset utf-8
 * @author lijun
 * @git: https://github.com/zwlijun/se.vuessr
 * @date 2019.3
 */
'use strict';

import {assign} from "./serializable"

const _public = {
    /**
     * 过滤XSS的非法字符
     * @param String str 需要进行过滤的字符串
     */
    filterScript: function(str){
        let text = document.createTextNode(str);
        let parser = document.createElement("div");
        let value = "";

        parser.appendChild(text);

        value = parser.innerHTML;
        
        text = null; parser = null;

        return value;
    },         
    /**
     * 获取url中的参数信息
     * @param String key 参数名
     * @param String querystring 查询串
     * @return String key所对应的值，如果不存在返回null
     */
    getParameter:function(key, querystring){
        let search = (querystring || document.location.search);
        let pattern = new RegExp("[\?&]"+key+"\=([^&#\?]*)", "g");
        let matcher = pattern.exec(search);
        let items = null;
        
        if(null != matcher){
            items = matcher[1];
        }

        if(null != items){
            items = this.filterScript(items);
        }

        pattern = null;

        return items;
    },
    fix: function(url){
        let startWiths = /^([a-z0-9\-_]+):\/\//i;

        if(startWiths.test(url)){
            return url;
        }

        let protocol = location.protocol;
        let hostname = location.hostname;
        let port = location.port;
        let pathname = location.pathname;
        let ch1 = url.substr(0, 1);
        let ch2 = url.substr(0, 2);
        let host = protocol + "//" + hostname + (port ? ":" + port : "");
        let current = pathname.replace(/\/([^\/]+)$/, "/");

        // console.log(pathname, current);

        if(ch2 == "//"){
            return protocol + url;
        }

        if(ch1 == "/"){
            return host + url;
        }

        return host + current + url;
    },
    /**
     * 解析URL
     * @method parseURL
     * @param String url 需要解析的URL
     * @param boolean autofix 是否自动修复
     * @return Object items {String url, String protocol, String host, String port, String pathname, String search, String hash, String user, String password, String filename}
     */
    parseURL : function(url, autofix){
        let p = /^([^\:\/\?&\#]+\:)\/\/(([\w\W]+)(\:([\w\W]+)\@))?([^\:\/\?&\#]+)(\:([\d]+))?(\/?[^\?&\#\:]*\/)?([^\/&\#\?\:]+)?(\?[^\?#]*)?(\#[\w\W]*)?$/;
        //[
        // 0: "ftp://carlli:123@ftp.domain.com:21000/www/test/a?sss=123&t=123&o=000#!asd=123",  //原串
        // 1: "ftp:",                    //protocol
        // 2: "carlli:123@",             //auth info
        // 3: "carlli",                  //user
        // 4: ":123",                    //password
        // 5: "123",                     //password
        // 6: "ftp.domain.com",          //host
        // 7: ":21000",                  //port
        // 8: "21000",                   //port
        // 9: "/www/test/",              //pathname
        // 10: "a",                      //filename
        // 11:"?sss=123&t=123&o=000",    //search
        // 12:"#!asd=123"                //hash
        //]
        
        let loc = autofix !== false ? this.fix(url) : url;
        let r0 = p.exec(loc)||[];
        
        let path = r0[9] || "";
        let file = r0[10] || "";

        let o = {
            url:       (r0[0] || ""),            
            protocol:  (r0[1] || ""),
            user:      (r0[3] || ""),
            password:  (r0[5] || ""),
            host:      (r0[6] || ""),
            port:      (r0[8] || ""),
            search:    (r0[11] || ""),
            hash:      (r0[12] || ""),
            pathname:  path + file,
            filename:  file
        };
        p = null;
        r0 = null;

        return o;
    },
    append : function(url, data){
        let urlInfo = this.parseURL(url);
        let protocol = urlInfo.protocol;
        let host = urlInfo.host;
        let port = urlInfo.port;
        let pathname = urlInfo.pathname;
        let search = urlInfo.search;
        let hash = urlInfo.hash;

        let querystring = this.merge(search, data);
        let _url = protocol + "//" 
                 + host 
                 + (port ? ":" + port : "") 
                 + pathname 
                 + (querystring ? "?" + querystring : "") 
                 + hash;

        return _url;
    },
    merge: function(data1, data2){
        let _data1 = this.serialized(data1);
        let _data2 = this.serialized(data2);
        let newData = assign(_data1, _data2);

        return this.stringify(newData);
    },
    /**
     * 将querystring转换成map对象
     * @param String qs URL查询串
     * @return Object items
     */
    serialized : function(qs){
        if(!qs){
            return {};
        }
        
        let ch = qs.substring(0, 1);
        let search = (("?&".indexOf(ch) == -1) ? "?" + qs : qs);
        let pattern = /[\?&]([^\?&=#]+)=([^&#\?]*)/g;
        let matcher = null;
        let items = {};
        let key = null;
        let value = null;
        let tmp = null;

        while(null != (matcher = pattern.exec(search))){
            key = matcher[1];
            value = decodeURIComponent(this.filterScript(matcher[2]));
            
            if(key in items){
                if(items[key] instanceof Array  && items[key].constructor == Array){ //数组
                    items[key].push(value);
                }else{
                    tmp = items[key];
                    items[key] = [tmp].concat(value);
                }
            }else{
                items[key] = value;
            }
        }
        pattern = null; matcher = null;

        return items;
    },
    /**
     * 将paramters还原成querystring
     * @param Object o URL查询串MAP对象
     * @return String str
     */
    stringify : function(o){
        let tmp = [];
        let str = "";
        let items = null;
        
        for(let name in o){
            if(o.hasOwnProperty(name)){
                items = o[name];
                
                if(items instanceof Array && items.constructor == Array){ //数组
                    for(let i = 0, j = items.length; i < j; i++){
                        tmp.push(name + "=" + encodeURIComponent(items[i]));
                    }
                }else{
                    tmp.push(name + "=" + encodeURIComponent(o[name]));
                }
            }
        }

        str = tmp.join("&");
        tmp = null; o = null;
        return str;
    }
};

export default _public;