/**********************************************************
 * Copyright (c) SESHENGHUO.COM All rights reserved       *
 **********************************************************/

/**
 * @views/hello
 * @charset utf-8
 * @author lijun
 * @git: https://github.com/zwlijun/se.vuessr
 * @date 2019.2
 */
'use strict';

import XNet from "~lib/net/xnet";

export default {
    namespaced: true,
    state() {
        return {
            "text": "Init"
        };
    },
    mutations: {
        text(state, payload){
            state.text = payload;
        }
    },
    actions: {
        read(context, payload){
            const result = XNet.exec("hello", {
                "url": "http://www.seshenghuo.com/hello.json",
                "method": XNet.GET,
                onSuccess: function(resp){
                    const data = resp.data;
                    context.commit("text", data.data);
                },
                onError: function(err){
                    context.commit("text", "Error!")
                }
            });

            return result;
        }
    }
};