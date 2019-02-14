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
    return {
        "name": "SE.VUESSR/AppServer(" + index + ")/" + port,
        "script": "AppServer.js",
        "instances": "max",
        "interpreter": "node",
        "env_dev": {
            "NODE_ENV": "development",
            "PORT": port
        },
        "env_prod": {
            "NODE_ENV": "production",
            "PORT": port
        },
        "pid_file": "./logs/se.vuess." + port + ".pid",
        "log": true,
        "output": "./logs/se.vuess." + port + ".out.log",
        "error": "./logs/se.vuess." + port + ".err.log"
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
    })([8080])
};
