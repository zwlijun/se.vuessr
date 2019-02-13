/**********************************************************
 * Copyright (c) SESHENGHUO.COM All rights reserved       *
 **********************************************************/

/**
 * VUE Router
 * @charset utf-8
 * @author lijun
 * @git: https://github.com/zwlijun/se.vuessr
 * @date 2019.2
 */
'use strict';

import Vue from "vue";
import Router from "vue-router";

//-------------------------------------------[[
import views from "./views";
//-------------------------------------------]]

Vue.use(Router);

export function createRouter () {
    const options = {
        "mode": 'history',
        "routes": [
            ...views
        ]
    };

    return new Router(options)
};