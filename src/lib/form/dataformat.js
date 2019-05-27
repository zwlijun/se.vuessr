/**********************************************************
 * Copyright (c) SESHENGHUO.COM All rights reserved       *
 **********************************************************/

/**
 * 数据格式校验
 * @charset utf-8
 * @author lijun
 * @git: https://github.com/zwlijun/se.vuessr
 * @date 2019.4
 */
'use strict';

import DateUtil from "../extends/date";
import Client from "../utils/client";

const _public = {
    /**
     * 是否為中國大陸身份證
     * @param String v 需要校驗的值
     * @return Boolean true/false
     */
    cnid : function(data, v, el){
        let wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
        let vi = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
        let ai = [];
        let tmp = null;
        if(v.length != 15 && v.length != 18){
            return false;
        }
        function getVerify(id){ //獲取末尾示識
            let remain = 0;
            let sum = 0;
            let k = 0;
            if(id.length == 18){
                id = id.substring(0, 17);
            }
            for(let i = 0; i < 17; i++){
                k = id.substring(i, i + 1);
                ai[i] = k * 1;
            }
            for(let j = 0; j < 17; j++){
                sum += wi[j] * ai[j];
            }
            remain = sum % 11;
            return vi[remain];
        }
        if(v.length == 15){ //將15位身份證升級到18位再校驗
            tmp = v.substring(0, 6);
            tmp = tmp + "19";
            tmp = tmp + v.substring(6, 15);
            tmp = tmp + getVerify(tmp);
            v = tmp;
        }
        
        let ret = (getVerify(v) == v.substring(17, 18));

        if(!ret){
            return false;
        }

        return true;
    },
    /**
     * 是否為香港身份證
     * @param String v 需要校驗的值
     * @return Boolean true/false
     */
    hkid : function(data, v, el){
        let wi = {'A':1, 'B':2, 'C':3, 'D':4, 'E':5, 'F':6, 'G':7, 'H':8, 'I':9, 'J':10, 'K':11, 'L':12, 'M':13, 'N':14, 'O':15, 'P':16, 'Q':17, 'R':18, 'S':19, 'T':20, 'U':21, 'V':22, 'W':23, 'X':24, 'Y':25, 'Z':26};
        let tmp = v.substring(0, 7);
        let a = tmp.split("");
        let t = null;
        let sum = 0;
        let verify = 0;
        let vi = v.substring(8, 9) * 1;
        for(let i = 0, j = 8; i < 7; i++, j--){
            t = wi[a[i]] || a[i];
            sum += t * j;
        }
        verify = sum % 11 == 0 ? 0 : 11 - sum % 11;

        let ret =  (vi == verify);

        if(!ret){
            return false;
        }

        return true;
    },
    /**
     * 是否为泰国身份证ID
     * @param String v 需要校验的值
     * @return Boolean true/false
     */
    "thid": function(data, v, el){
        var arr = ("" + v).split("");
        var size = arr.length;
        var verify = Number(arr[size - 1]);

        var x = 0;
        for(var i = 0; i < 12; i++){
            x += (size - i) * Number(arr[i]);
        }

        x = x % 11;

        if(x <= 1){
            x = 1 - x;
        }else{
            x = 11 - x;
        }

        return (verify === x);
    },
    spasswd: function(data, v, el){
        let p = /^[\u0021-\u007E]{6,16}$/;

        return p.test(v);
    },
    npasswd: function(data, v, el){
        let p = /^[0-9]{6,8}$/;

        return p.test(v);
    },
    enchar: function(data, v, el){
        let p = /^[a-zA-Z]+$/i;

        return p.test(v);
    },
    cnchar: function(data, v, el){
        let p = /^[\u4E00-\u9FA5\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F]+$/;

        return p.test(v);
    },
    cn_name: function(data, v, el){
        let p = /^[\u4E00-\u9FA5\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F]{2,5}(?:·[\u4E00-\u9FA5\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F]{1,5})*$/;

        return p.test(v);
    },
    en_name: function(data, v, el){
        let p = /^[a-z]+(?: [a-z]+)*$/i

        return p.test(v);
    },
    ascii: function(data, v, el){
        let p = /^[\u0021-\u007E]+$/;

        return p.test(v);
    },
    mobile: function(data, v, el){
        let p = /^1[0-9]{10}$/;

        return p.test(v);
    },
    tel: function(data, v, el){
        let p = /^([0-9]{1,5}\-?)?([0-9]{5,8})(\-?[0-9]{1,6})?$/;

        return p.test(v)
    },
    email: function(data, v, el){
        let p = /^([a-z0-9_\.\-]+)@([a-z0-9_\-]+)(\.[a-z0-9_\-]+)+$/i
        return p.test(v);
    },
    url: function(data, v, el){
        let urlInfo = Client.parseURL(v, false);

        return !!urlInfo.url;
    },
    datetime: function(data, v, el){
        let fmt = el.attr("data-dtpicker-format") || "%y-%M-%d %h:%m:%s";
        let check = DateUtil.parseDate(v, fmt);

        return check.ok;
    },
    shortdatetime: function(data, v, el){
        let fmt = el.attr("data-dtpicker-format") || "%y-%M-%d %h:%m";
        let check = DateUtil.parseDate(v, fmt);

        return check.ok;
    },
    date: function(data, v, el){
        let fmt = el.attr("data-dtpicker-format") || "%y-%M-%d";
        let check = DateUtil.parseDate(v, fmt);

        return check.ok;
    },
    shortdate: function(data, v, el){
        let fmt = el.attr("data-dtpicker-format") || "%y-%M";
        let check = DateUtil.parseDate(v, fmt);

        return check.ok;
    },
    shortdate2: function(data, v, el){
        let fmt = el.attr("data-dtpicker-format") || "%M-%d";
        let check = DateUtil.parseDate(v, fmt);

        return check.ok;
    },
    time: function(data, v, el){
        let fmt = el.attr("data-dtpicker-format") || "%h:%m:%s";
        let check = DateUtil.parseDate(v, fmt);

        return check.ok;
    },
    shorttime: function(data, v, el){
        let fmt = el.attr("data-dtpicker-format") || "%h:%m";
        let check = DateUtil.parseDate(v, fmt);

        return check.ok;
    },
    shorttime2: function(data, v, el){
        let fmt = el.attr("data-dtpicker-format") || "%m:%s";
        let check = DateUtil.parseDate(v, fmt);

        return check.ok;
    },
    smscode: function(data, v, el){
        let p = /^[0-9]{4,6}$/i;

        return p.test(v);
    },
    verifycode: function(data, v, el){
        let p = /^[a-z0-9]{4,6}$/i;

        return p.test(v);
    },
    any: function(data, v, el){
        let p = /^[\s ]+$/;

        return !p.test(v);
    }
}

export default _public;