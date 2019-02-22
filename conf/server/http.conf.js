/**********************************************************
 * Copyright (c) SESHENGHUO.COM All rights reserved       *
 **********************************************************/

/**
 * HTTP配置
 * @charset utf-8
 * @author lijun
 * @git: https://github.com/zwlijun/se.vuessr
 * @date 2019.2
 * @see https://www.npmjs.com/package/http-proxy-middleware#context-matching
 */
'use strict';

const fs = require('fs')
const path = require('path')
const http = require('http')
const https = require('https')

const resolve = file => path.resolve(__dirname, file)

function createServer(httpServer, port, protocol){
	httpServer.listen(port, () => {
		console.log(`${protocol.toUpperCase()} server is running on ${protocol}://localhost:${port}`);
	})
	//在这里可以处理公用的事务
	//@TODO

	if("http" === protocol){
		httpEvent(httpServer);
	}else{
		httpSecureEvent(httpServer);
	}
}

function httpEvent(httpServer){
	//http服务事件绑定处理
	//@TODO
}

function httpSecureEvent(httpServer){
	//https服务事件绑定处理
	//@TODO
}

function createHttpServer(expressAppServer, port){
	const httpServer = http.createServer(expressAppServer);

	if(port && port > 0){
		createServer(httpServer, port, "http");
	}else{
		console.log(`HTTP server port(${port}) is invalid.`)
	}
}

function createHttpSecureServer(expressAppServer, port){
	const serverKey = resolve('./ssl/server.key');
	const serverCert = resolve('./ssl/server.crt');

	if(port && port > 0){
		if(fs.existsSync(serverKey) && fs.existsSync(serverCert)){
			const options = {
				"key": fs.readFileSync(serverKey),
				"cert": fs.readFileSync(serverCert)
			};

			const httpServer = https.createServer(options, expressAppServer);

			createServer(httpServer, port, "https");
		}else{
			console.log("HTTPS server startup failed, server.key or server.crt not found.")
		}
	}else{
		console.log(`HTTPS server port(${port}) is invalid.`)
	}
}

module.exports = {
	forceSecure: false,
	listen: function(expressAppServer, httpPort, securePort){
		createHttpServer(expressAppServer, httpPort)
		createHttpSecureServer(expressAppServer, securePort)
	}
}