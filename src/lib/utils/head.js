/**********************************************************
 * Copyright (c) SESHENGHUO.COM All rights reserved       *
 **********************************************************/

/**
 * HTML head 内容处理
 * @charset utf-8
 * @author lijun
 * @git: https://github.com/zwlijun/se.vuessr
 * @date 2019.2
 */
'use strict';

function OGP(ogp){
    let buf = [];

    if(ogp){
        for(var key in ogp){
            buf.push(`<meta property="${key}" content="${ogp[key]}">`);
        }
    }

    return buf.join("\n");
}

function SEO(seo){
    let buf = [];

    if(seo){
        for(var key in seo){
            buf.push(`<meta name="${key}" content="${seo[key]}">`);
        }
    }

    return buf.join("\n");
}

export {
    OGP, 
    SEO
};