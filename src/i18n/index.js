/**********************************************************
 * Copyright (c) SESHENGHUO.COM All rights reserved       *
 **********************************************************/

/**
 * i18n模块
 * @charset utf-8
 * @author lijun
 * @git: https://github.com/zwlijun/se.vuessr
 * @date 2019.4
 */
'use strict';

import {getParameter} from "../utils/client";
import Cooke from "../utils/cookie";

const iLang = (function(){
    const BROWSER_LANG = navigator.language;
    const DEFAULT_LANG = "en-US";
    const LangMaps = {
        "~^zh": "zh-CN",
        "~^en": "en-US"
    };

    const Lang = {
        match: function(prefix, lang, mapping){
            const length = prefix.length;
            const pattern = new RegExp(prefix, "i");

            pattern.lastIndex = 0;

            if(pattern.test(lang)){
                return mapping;
            }

            return null;
        },
        language: function(lang){
            const _lang = lang || getParameter("lang") || Cookie.get("lang") || BROWSER_LANG;
            let _real = null;

            for(let n in LangMaps){
                if(LangMaps.hasOwnProperty(n)){
                    if(n.charAt(0) === "~"){
                        _real = Lang.match(n.substring(1), _lang, LangMaps[n]);
                    }else{
                        _real = LangMaps[n];
                    }

                    if(_real){
                        return _real;
                    }
                }
            }

            return DEFAULT_LANG;
        },
        setLang: function(newLang){
            const lang = Lang.language(newLang);

            let domain = document.domain;
            let items = domain.split(".");
            let size = items.length;

            if(!Cookie.ipv4(domain) && !Cookie.ipv6(domain)){
                domain = items.slice(size - 2).join(".");
            }

            Cookie.set("lang", lang, {
                "path": "/",
                "domain": domain,
                "maxage": 36500 * 86400000
            });

            document.documentElement.setAttribute("lang", lang);
        },
        init: function(){
            Lang.setLang();
        }
    };

    Lang.init();

    return {
        "language": Lang.language,
        "setLang": Lang.setLang
    };
})();

export default iLang;