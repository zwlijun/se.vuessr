/**********************************************************
 * Copyright (c) SESHENGHUO.COM All rights reserved       *
 **********************************************************/

/**
 * 版本号比较工具类
 * @charset utf-8
 * @author lijun
 * @git: https://github.com/zwlijun/se.vuessr
 * @date 2019.3
 */
'use strict';

export default const VersionUtil = {
    encode: function(versionString){
        let s = versionString.split(".");

        if(s.length < 4){
            for(let i = s.length; i < 4; i++){
                s.push("0");
            }
        }

        let tmp = 0;
        let size = s.length - 1;
        let result = 0;
        for(let j = size; j >= 0; j--){
            tmp = parseInt(s[size - j], 10);
            result |= tmp << (j * 8);
        }

        return result;
    },
    decode: function(version){
        let buf = [];

        for(let i = 0; i < 4; i++){
            buf.unshift(version & 0xff);

            if(i < 3){
                buf.unshift(".");
            }

            version = version >> 8;
        }

        return buf.join("");
    },
    compare: function(targetVersionString, currentVersionString){
        let targetVersion = this.encode(targetVersionString);
        let currentVersion = this.encode(currentVersionString);

        return currentVersion > targetVersion;
    }
};