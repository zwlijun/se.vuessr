/**********************************************************
 * Copyright (c) SESHENGHUO.COM All rights reserved       *
 **********************************************************/

/**
 * PM2启动配置文件
 * @charset utf-8
 * @author lijun
 * @git: https://github.com/zwlijun/se.vuessr
 * @date 2019.2
 */
'use strict';

function CreateApp(index, port){
    //@see https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    let httpPort = port.http || 0;
    let securePort = port.secure || 0;
    let buf = [];
    let suffix = "";

    buf.push(httpPort);
    buf.push(securePort);

    suffix = buf.join("~");

    return {
        "name": "SE.VUESSR/AppServer(" + index + ")/" + suffix,
        "script": "./AppServer.js",
        "instances": "max",
        "interpreter": "node",
        "max_memory_restart": "500M",
        "listen_timeout": 10 * 1000,
        "watch": false,
        "env_dev": {
            "NODE_ENV": "development",
            "PORT": httpPort,
            "SECURE": securePort,
            "DEBUG": true,
            "HTTP2": true
        },
        "env_prod": {
            "NODE_ENV": "production",
            "PORT": httpPort,
            "SECURE": securePort,
            "DEBUG": false,
            "HTTP2": true
        },
        "pid_file": "./logs/se.vuessr." + suffix + ".pid",
        "log": true,
        "output": "./logs/se.vuessr." + suffix + ".out",
        "error": "./logs/se.vuessr." + suffix + ".err"
    };
}

module.exports = {
    apps: (function(ports){
        let list = [];
        const size = ports.length;

        for(let i = 0; i < size; i++){
            list.push(CreateApp(i, ports[i]));
        }

        return list;
    })([
        {"http": 9000, "secure": 9443}
    ])
};
