/**********************************************************
 * Copyright (c) SESHENGHUO.COM All rights reserved       *
 **********************************************************/

/**
 * i18n配置
 * @charset utf-8
 * @author lijun
 * @git: https://github.com/zwlijun/se.vuessr
 * @date 2019.4
 */
'use strict';

import ObjectUtil from "@/lib/extends/object";
import iLang from "@/lib/i18n";

import zh_CN from "./zh-CN";
import en_US from "./en-US";

const i18n = new Map();

i18n.set("zh-CN", zh_CN);
i18n.set("en-US", en_US);

export default function conf(lang){
	let _lang = lang || iLang.language();
	return i18n.get(_lang) || {};
};