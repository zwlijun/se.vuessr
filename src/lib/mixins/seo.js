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
			this.$store.commit("server/seo", seo);
			this.$ssrContext.state = this.$store.state;
		}
	}
};

const clientMixin = {
	mounted(){
		const seo = getContent(this);

		if(seo){
			this.$store.commit("server/seo", seo);
		}
	}
};

export default process.env.VUE_ENV === 'server' ? serverMixin : clientMixin;