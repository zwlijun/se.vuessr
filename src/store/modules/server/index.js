/**********************************************************
 * Copyright (c) SESHENGHUO.COM All rights reserved       *
 **********************************************************/

/**
 * 服务器Store配置
 * @charset utf-8
 * @author lijun
 * @git: https://github.com/zwlijun/se.vuessr
 * @date 2019.2
 */
'use strict';

import VUESSRContext from "~conf/server/context";
import {SEO, OGP} from "~lib/utils/head";

export default {
    namespaced: true,
    state() {
        return VUESSRContext;
    },
    mutations: {
        service(state, serviceName){
            state.service = serviceName;
        },
        title(state, title){
            state.title = title;
        },
        nonce(state, nonce){
            state.nonce = nonce;
        },
        client(state, client){
            state.client = client;
        },
        server(state, server){
            state.server = server;
        },
        meta(state, meta){
            state.meta = meta;
        },
        seo(state, seo){
            state.seo = Object.assign((state.seo || {}), seo);
            state.seoMeta = SEO(state.seo);
        },
        ogp(state, ogp){
            state.ogp = Object.assign((state.ogp || {}), ogp);
            state.ogpMeta = OGP(state.ogp);
        }
    }
};