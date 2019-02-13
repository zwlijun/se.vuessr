/**********************************************************
 * Copyright (c) SESHENGHUO.COM All rights reserved       *
 **********************************************************/

/**
 * VUEX Store
 * @charset utf-8
 * @author lijun
 * @git: https://github.com/zwlijun/se.vuessr
 * @date 2019.2
 */
'use strict';

import Vue from 'vue'
import Vuex from 'vuex'

import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"
import states from "./states"
import modules from "./modules"

Vue.use(Vuex)

export function createStore () {
    const options = {
        "state": states,
        "actions": actions,
        "mutations": mutations,
        "getters": getters,
        "modules": modules
    };

    // console.log(options.modules)

    return new Vuex.Store(options);
}