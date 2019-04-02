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
    /**
     * 生成唯一ID
     * @param {[type]} len   长度
     * @param {[type]} radix 进制
     */
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
    /**
     * 根据传的值范围生成随机数
     * @param  {[type]} minValue [description]
     * @param  {[type]} maxValue [description]
     * @return {[type]}          [description]
     */
    random: function(minValue, maxValue){
        const rnd = (Math.random() * (maxValue - minValue)) + minValue;

        const ret = {
            intValue: Math.floor(rnd),
            floatValue: rnd
        };

        return ret;
    }
};