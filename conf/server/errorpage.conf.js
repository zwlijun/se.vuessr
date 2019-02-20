/**********************************************************
 * Copyright (c) SESHENGHUO.COM All rights reserved       *
 **********************************************************/

/**
 * 错误页面配置
 * @charset utf-8
 * @author lijun
 * @git: https://github.com/zwlijun/se.vuessr
 * @date 2019.2
 * @see https://www.npmjs.com/package/http-proxy-middleware#context-matching
 */
'use strict';

const ErrorPages = {
	"default": {
		"type": "text",
		"value": "500 | Internal Server Error"
	},
	"401": {
		"type": "redirect",
		"value": "/login"
	},
	"403": "401",
	"404": {
		"type": "text",
		"value": "404 | Page Not Found"
	},
	"500": "default",
	"4xx": "default",
	"5xx": "default"
};

function parse(errorCode){
	let page = null;

	if(errorCode in ErrorPages){
		page = ErrorPages[errorCode];

		if(typeof page == "string"){
			page = ErrorPages[errorCode][page];
		}
	}else{
		errorCode = errorCode.substring(0, 1) + "xx";

		if(errorCode in ErrorPages){
			page = ErrorPages[errorCode];

			if(typeof page == "string"){
				page = ErrorPages[errorCode][page];
			}
		}
	}

	return page || ErrorPages["default"];
}

module.exports = {
	process: function(err, req, res){
		let ex = err || {};
		let code = err.code;

		if(ex.response){
			code = ex.response.status;
		}else if(ex.url){
			res.redirect(301, ex.url);
			return ;
		}

		let page = parse(String(code));

		if(null !== page){
			if("redirect" == page.type){
				res.redirect(301, page.value);
				return ;
			}else{
				res.status(code || 500).send(page.value);
			}
		}else{
			res.sendStatus(500);
		}
	}
};