/**********************************************************
 * Copyright (c) SESHENGHUO.COM All rights reserved       *
 **********************************************************/

/**
 * 序列类
 * @charset utf-8
 * @author lijun
 * @git: https://github.com/zwlijun/se.vuessr
 * @date 2019.3
 */
'use strict';

export default const {
    UUID: function(len, radix){
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        let uuid = [], i;
        
        radix = radix || 16;

        if(len){
            for(i = 0; i < len; i++){
                uuid[i] = chars[0 | Math.random() * radix];
            }
        }else{
            // rfc4122, version 4 form
            let r;

            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';

            // Fill in random data. At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
 
        return uuid.join('');
    },
    assign: function(...args){
        let items = Array.from(arguments);
        let size = items.length;

        if(size === 0){
            return {};
        }

        if(size == 1){
            return items[0] || {};
        }

        let a = items.shift();
        let b = items.shift();

        let x = Object.assign({}, a);

        for(let key in b){
            if(b.hasOwnProperty(key)){
                if(key in a){
                    // 规避null和undefined的值
                    if(Object.values(b[key] || 0).length === 0 || Object.values(a[key] || 0).length === 0){
                        x[key] = b[key];
                    }else{
                        if(Array.isArray(b[key])){
                            x[key] = b[key];
                        }else{
                            x[key] = this.assign.apply(this, [a[key], b[key]]);
                        }
                    }
                }else{
                    x[key] = b[key];
                }
            }
        }

        if(size > 2){
            items.unshift(x);
            x = this.assign.apply(this, items);
        }

        return x;
    }
};