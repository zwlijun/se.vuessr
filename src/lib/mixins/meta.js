/**********************************************************
 * Copyright (c) SESHENGHUO.COM All rights reserved       *
 **********************************************************/

/**
 * VUE Mixins - META
 * @charset utf-8
 * @author lijun
 * @git: https://github.com/zwlijun/se.vuessr
 * @date 2019.2
 */
'use strict'; 


function getContent(vm){
	const {meta} = vm.$options;

	if(meta){
		return typeof(meta) === "function" ? meta.apply(vm, []) : meta;
	}

	return "";
}

function parseMeta(meta){
	if(Array.isArray(meta)){
		let buf = [];
		let item = null;

		for(var i = 0, size = meta.length; i < size; i++){
			item = meta[i];

			let tmp = [];
			if(typeof(item) === "object"){
				tmp.push('<meta');
				for(var key in item){
					tmp.push(` ${key}="${item[key]}"`);
				}
				tmp.push('>');

				buf.push(tmp.join(""));
			}else{
				buf.push(item);
			}
		}

		return buf.join("\n");
	}else{
		return meta;
	}
}

const serverMixin = {
	created(){
		const meta = getContent(this);

		if(meta){
			this.$ssrContext.meta = parseMeta(meta);
		}
	}
};

const clientMixin = {
	mounted(){
		const meta = getContent(this);

		if(meta){
			this.$options.meta = parseMeta(meta);
		}
	}
};

export default process.env.VUE_ENV === 'server' ? serverMixin : clientMixin;