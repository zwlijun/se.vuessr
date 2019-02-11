/**********************************************************
 * Copyright (c) SESHENGHUO.COM All rights reserved       *
 **********************************************************/

/**
 * VUE Mixins - SEO
 * @charset utf-8
 * @author lijun
 * @git: https://github.com/zwlijun/se.vuessr
 * @date 2019.2
 */
'use strict'; 

import {SEO} from "~lib/utils/head";

function getContent(vm){
	const {seo} = vm.$options;

	if(seo){
		return typeof(seo) === "function" ? seo.apply(vm, []) : seo;
	}

	return "";
}

const serverMixin = {
	created(){
		const seo = getContent(this);

		if(seo){
			this.$ssrContext.seo = seo;
			this.$ssrContext.seoMeta = SEO(seo);
		}
	}
};

const clientMixin = {
	mounted(){
		const seo = getContent(this);

		if(seo){
			this.$options.seo = seo;
			this.$options.seoMeta = SEO(seo);
		}
	}
};

export default process.env.VUE_ENV === 'server' ? serverMixin : clientMixin;