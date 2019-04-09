/**********************************************************
 * Copyright (c) SESHENGHUO.COM All rights reserved       *
 **********************************************************/

/**
 * 国际化Store配置
 * @charset utf-8
 * @author lijun
 * @git: https://github.com/zwlijun/se.vuessr
 * @date 2019.2
 */
'use strict';

import i18n from "@/i18n";

export default {
	namespaced: true,
	state() {
        return {
        	"message": i18n()
        };
    },
    mutations: {
    	message(state, payload){
    		state.message = payload;
    	}
    },
    getters: {
        message: (state) => {
            return state.message || {};
        }
    }
}