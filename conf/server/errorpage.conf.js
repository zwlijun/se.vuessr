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
		"value": "500 | Internal Server Error",
		"code": 500
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
	"5xx": "default",
	"504": {
		"type": "text",
		"value": "504 | Gateway Timeout"
	},
	"408": {
		"type": "text",
		"value": "408 | Request Timeout"
	}
};

function parse(errorCode){
	if(undefined === errorCode || null === errorCode){
		errorCode = "";
	}
	errorCode = ("" + errorCode);

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

	if(page){
		page["code"] = ValidCode(errorCode);
	}

	return page || ErrorPages["default"];
}

function ValidCode(code){
	if(!code){
		return 500;
	}

	let iCode = Number(code);

	if(isNaN(iCode)){
		return 500;
	}

	if(iCode <= 100 || iCode > 999){
		return 500;
	}

	return iCode;
}

function log(debugMode, type, err){
	if(debugMode){
		console.log("errorpage#" + type + " => ", err);
	}
}

module.exports = {
	process: function(err, req, res, debugMode){
		let ex = err || {};
		let code = err.code;

		if(ex.response){
			code = ex.response.status;
			log(debugMode, "response -> " + req.url, err);
		}else if(ex.request){
			if("ECONNABORTED" == code){
				code = 408;
			}
			log(debugMode, "request -> " + req.url, err);
		}else if(ex.url){
			log(debugMode, "redirect -> " + req.url, err);
			res.redirect(301, ex.url);
			return ;
		}else{
			log(debugMode, "other -> " + req.url, err);
		}

		let page = parse(code);

		if(null !== page){
			if("redirect" == page.type){
				res.redirect(301, page.value);
				return ;
			}else{
				res.status(page.code).send(page.value);
			}
		}else{
			res.sendStatus(ValidCode());
		}
	},
	timeout: function(req, res, debugMode){
		let isInterrupt = false;
		let page = parse(504);

		if("redirect" == page.type){
			res.redirect(302, page.value);
			return true;
		}else{
			res.status(page.code);
		}

		//如果返回 true 则会中断流程执行并调用 res.end() ==> true :: res.end();
		if(true === isInterrupt){
			res.end(page.value);
		}

		return isInterrupt;
	}
};