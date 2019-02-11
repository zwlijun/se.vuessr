/**********************************************************
 * Copyright (c) SESHENGHUO.COM All rights reserved       *
 **********************************************************/

/**
 * VUE Mixins - HTML Title
 * @charset utf-8
 * @author lijun
 * @git: https://github.com/zwlijun/se.vuessr
 * @date 2019.2
 */
'use strict'; 

function getTitle(vm){
	const {title} = vm.$options;

	if(title){
		return typeof(title) === "function" ? title.apply(vm, []) : title;
	}

	return "";
}

const serverMixin = {
	created(){
		const title = getTitle(this);

		if(title){
			this.$ssrContext.title = title;
		}
	}
};

const clientMixin = {
	mounted(){
		const title = getTitle(this);

		if(title){
			document.title = title;
		}
	}
};

export default process.env.VUE_ENV === 'server' ? serverMixin : clientMixin;