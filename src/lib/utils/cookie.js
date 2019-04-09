/**********************************************************
 * Copyright (c) SESHENGHUO.COM All rights reserved       *
 **********************************************************/

/**
 * Cookie处理
 * @charset utf-8
 * @author lijun
 * @git: https://github.com/zwlijun/se.vuessr
 * @date 2019.3
 */
'use strict';

const Cookie = {
    encode: function(str){
        return encodeURIComponent(str);
    },
    decode: function(str){
        return decodeURIComponent(str);
    },
    parse: function(){
        let items = {};

        try{
            let cookie = document.cookie || "";
            let pairs = cookie.split(/ *; */);
            let size = pairs.length;
            let item = null;
            let kv = null;

            for(let i = 0; i < size; i++){
                item = pairs[i];

                if(!item){
                    continue;
                }

                kv = item.split("=");

                items[Cookie.decode(kv[0])] = Cookie.decode(kv[1] || "");
            }
        }catch(e){
            items = {};
        }finally{
            return items;
        }
    },
    ipv4: function(domain){
        let pattern = /^[\d]{1,3}(\.[\d]{1,3}){3}$/; //d.d.d.d
        pattern.lastIndex = 0;

        return pattern.test(domain);
    },
    ipv6: function(domain){
        let patterns = [
            /^[\da-f]{1,4}(:[\da-f]{1,4}){7}$/i,  //IPv6全地址 X:X:X:X:X:X:X:X
            /^::$/,  //X:X:X:X:X:X:X:X
            /^::[\da-f]{1,4}(:[\da-f]{1,4})*$/i,  //::X:X, ::X
            /^([\da-f]{1,4}:)*([\da-f]{1,4})::$/i,  //X::, X:X::
            /^([\da-f]{1,4}:)*([\da-f]{1,4})::([\da-f]{1,4})(:[\da-f]{1,4})*$/i,  //X:X::X:X, X::X, X::X:X, X:X::X
            /^[\da-f]{1,4}(:[\da-f]{1,4}){5}:[\d]{1,3}(\.[\d]{1,3}){3}$/i, //X:X:X:X:X:X:d.d.d.d
            /^::[\d]{1,3}(\.[\d]{1,3}){3}$/i, //::d.d.d.d
            /^::[\da-f]{1,4}(:[\da-f]{1,4})*:[\d]{1,3}(\.[\d]{1,3}){3}$/i, //::X:X:d.d.d.d, ::X:d.d.d.d
            /^([\da-f]{1,4}:)*([\da-f]{1,4})::[\d]{1,3}(\.[\d]{1,3}){3}$/i,  //X::d.d.d.d, X:X::d.d.d.d
            /^([\da-f]{1,4}:)*([\da-f]{1,4})::([\da-f]{1,4})(:[\da-f]{1,4})*:[\d]{1,3}(\.[\d]{1,3}){3}$/i  //X:X::X:X:d.d.d.d, X::X:d.d.d.d, X::X:X:d.d.d.d, X:X::X:d.d.d.d
        ];

        for(let i = 0; i < patterns.length; i++){
            pattern = patterns[i];
            pattern.lastIndex = 0;

            if(pattern.test(domain)){
                return true;
            }
        }

        return false;
    },
    domain: function(isFullDomain){
        let domain = document.domain;

        if(true === isFullDomain){
            return domain;
        }

        let items = domain.split(".");
        let size = items.length;

        if(!Cookie.ipv4(domain) && !Cookie.ipv6(domain)){
            domain = items.slice(size - 2).join(".");
        }

        return domain;
    },
    path: function(isFullPath){
        if(true === isFullPath){
            let path = location.pathname || "/";

            path = path.replace(/\/[^\/]+$/g, "/");
        }else{
            path = "/";
        }

        return path;
    },
    set: function(name, value, options){
        let opts = options || {};
        let str = Cookie.encode(name) + '=' + Cookie.encode("" + value);

        if(null === value || undefined === value){
            opts.maxage = -10000;
        }

        if(opts.maxage){
            opts.expires = new Date(+new Date + opts.maxage);
        }

        if(opts.expires){
            str += '; expires=' + opts.expires.toUTCString();
        }
        if(opts.secure){
            str += '; secure';
        }

        if(!opts.path){
            opts.path = Cookie.path();
        }
        str += '; path=' + opts.path;

        if(!opts.domain){
            opts.domain = Cookie.domain();
        }
        str += '; domain=' + opts.domain;

        document.cookie = str;
    },
    get: function(name){
        let cookies = Cookie.parse();

        return cookies[name] || "";
    },
    remove: function(name){
        let value = Cookie.get(name);

        if(!!value){
            Cookie.set(name, value, {
                "maxage": -10000
            });
        }
    }
};

export default Cookie;