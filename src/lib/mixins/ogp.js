/**********************************************************
 * Copyright (c) SESHENGHUO.COM All rights reserved       *
 **********************************************************/

/**
 * VUE Mixins - OGP
 * @charset utf-8
 * @author lijun
 * @git: https://github.com/zwlijun/se.vuessr
 * @date 2019.2
 */
'use strict'; 

import {OGP} from "~lib/utils/head";

function getContent(vm){
	const {ogp} = vm.$options;

	if(ogp){
		return typeof(ogp) === "function" ? ogp.apply(vm, []) : ogp;
	}

	return "";
}

const serverMixin = {
	created(){
		const ogp = getContent(this);

		if(ogp){
			this.$ssrContext.ogp = ogp;
			this.$ssrContext.ogpMeta = OGP(ogp);
		}
	}
};

const clientMixin = {
	mounted(){
		const ogp = getContent(this);

		if(ogp){
			this.$options.ogp = ogp;
			this.$options.ogpMeta = OGP(ogp);
		}
	}
};

export default process.env.VUE_ENV === 'server' ? serverMixin : clientMixin;