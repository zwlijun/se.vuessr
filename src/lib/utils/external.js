/**********************************************************
 * Copyright (c) SESHENGHUO.COM All rights reserved       *
 **********************************************************/

/**
 * External
 * @charset utf-8
 * @author lijun
 * @git: https://github.com/zwlijun/se.vuessr
 * @date 2019.4
 */
'use strict';

import runtime from "./runtime";
import {assign, find} from "../extends/object";
import {parseURL} from "./client";

let __global = runtime.global();

function result(url, code, result, msg){
    const ret = {
        "code": code,
        "result": result,
        "msg": msg
    };

    console.log(`external.request(${url})`, ret.code, "-", ret.msg);

    return ret;
}

const _public = {
    define: function(scheme, metaData){
        __global = assign(__global[scheme] || (__global[scheme] = {}), metaData || {});
    },
    request: function(url, args){
        const URLInfo = parseURL(url, false);
        const protocol = URLInfo.protocol;
        const scheme = protocol.replace(":", "");
        const path = (URLInfo.host + URLInfo.pathname).replace("/" + URLInfo.filename, "");
        const methodName = URLInfo.filename;
        const hash = (URLInfo.hash).substring(1);

        if(!scheme){
            return result(url, -1, null, "scheme not defined");
        }

        const block = __global[scheme];

        if(!block){
            return result(url, -2, null, `scheme(${scheme}) metadata not found`);
        }

        const pkg = find(block, path);

        if(!pkg){
            return result(url, -3, null, `package(${package}) is not defined in scheme(${scheme})`);
        }

        const method = pkg[methodName];

        if(!method){
            return result(url, -3, null, `method(${methodName}) is not defined in package(${package})`);
        }

        if(!method.apply){
            return result(url, -4, null, `method(${methodName}) is not a function`);
        }

        return result(url, 0, method.apply(block, [hash].concat(args)), "success");
    }
};

export default _public;