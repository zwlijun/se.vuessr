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
			this.$store.commit("server/ogp", ogp);
			this.$ssrContext.state = this.$store.state;
		}
	}
};

const clientMixin = {
	mounted(){
		const ogp = getContent(this);

		if(ogp){
			this.$store.commit("server/ogp", ogp);
		}
	}
};

export default process.env.VUE_ENV === 'server' ? serverMixin : clientMixin;