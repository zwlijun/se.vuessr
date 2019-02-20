/**********************************************************
 * Copyright (c) SESHENGHUO.COM All rights reserved       *
 **********************************************************/

/**
 * 代理(跨域)服务配置
 * @charset utf-8
 * @author lijun
 * @git: https://github.com/zwlijun/se.vuessr
 * @date 2019.2
 * @see https://www.npmjs.com/package/http-proxy-middleware#context-matching
 */
'use strict';

module.exports = [
	{
		"turn": "on",
		"uri": "/api",
		"options": {
			"target": "http://api.domain.com",
			"changeOrigin": true,
			"xfwd": true
		}
	}
];