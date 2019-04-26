/**********************************************************
 * Copyright (c) SESHENGHUO.COM All rights reserved       *
 **********************************************************/

/**
 * 工具方法
 * @charset utf-8
 * @author lijun
 * @git: https://github.com/zwlijun/se.vuessr
 * @date 2019.4
 */
'use strict';

import Handler from "./handler";

const _public = {
    /**
     * 位校验
     * @param int fixedValue 固定的源值
     * @param int inValue 传入的值
     * @return Boolean 
     * @example Util.bitCheck(7, 2) => true
     *          Util.bitCheck(7, 8) => false
     */
    bitCheck : function(fixedValue, inValue){
        return (!!(fixedValue & inValue) && inValue > 0)
    },
    /**
     * 格式化模板数据
     * @param String tpl 模板数据
     * @param Object metaData 元数据
     * @param String preifx 模板数据前缀标识，默认为$
     * @return String str 格式化后的字符串
     */
    formatData : function(tplData, metaData, prefix){
        let str = "";
        let reg = null;
        let meta = null;

        prefix = (undefined === prefix ? "\\$" : (prefix ? "\\" + prefix : ""));
        prefix = prefix.replace(/\\\\/g, "\\");
        tplData = tplData || "";

        for(let key in metaData){
            if(metaData.hasOwnProperty(key)){
                meta = metaData[key];
                
                reg = new RegExp(prefix + "\\!?\\{" + key.replace(/\./g, "\\.") + "\\}", "gm");
                str = (tplData = tplData.replace(reg, meta));
                reg = null;
            }
        }

        str = str || tplData;

        // console.info("output: " + str);
        //----------------------------------
        reg = new RegExp(prefix + "\\!\\{[^\\{\\}]+\\}", "gm");
        str = str.replace(reg, "");
        reg = null;
        //----------------------------------
        return str;
    },
    /**
     * 格式化代码
     * @param String code 需要格式化的代码
     * @param String formatter 格式，如：4, 4-4-2, 3-3-8-4, 3-4-4
     *                         如果代码超过格式设置的值，那么后面的格式形式以最后一个格式方式为准
     *                         默认值为：4
     * @param String chr 格式间隔字符，默认为值为：英文空格字符
     * @return String code
     */
    formatCode: function(code, formatter, chr){
        let scode = (code || "") + "";
        let sformatter = formatter || "4";
        let schr = chr || " ";
        let len = scode.length;

        let __a = sformatter.split("-");
        let formatterArray = [];
        let formatterIndex = 0;
        let formatterValue = 0;
        let formatterLatestIndex = __a.length - 1;
        let tmp = null;
        let codeItems = [];

        for(let i = 0; i < __a.length; i++){
            formatterArray.push(Number(__a[i]));
        }

        do{
            formatterValue = formatterArray[formatterIndex];
            tmp = scode.substr(0, formatterValue);
            scode = scode.substring(formatterValue);
            len = scode.length;

            codeItems.push(tmp);

            ++formatterIndex;

            if(formatterIndex > formatterLatestIndex){
                formatterIndex = formatterLatestIndex;
            }
        }while(!!len);

        return codeItems.join(schr);
    },
    /**
     * 获取box的范围大小
     * @param  {[type]} target    [description]
     * @param  {[type]} scrollDOM [description]
     * @return {[type]}           [description]
     */
    getBoundingClientRect: function(target, scrollDOM){
            let root = document.documentElement;
            let ct = root.clientTop;  // 非IE为0，IE为2
            let cl = root.clientLeft; // 非IE为0，IE为2

            let rx = 0;
            let ry = 0;
            let sx = 0;
            let sy = 0;
            let rl = 0;
            let rt = 0;
            let rr = 0;
            let rb = 0;
            let rw = 0;
            let rh = 0;
            let nul = true;

            rx = root.scrollLeft;
            ry = root.scrollTop;

            if(scrollDOM && ("scrollLeft" in scrollDOM)){
                sx = scrollDOM.scrollLeft;
            }

            if(scrollDOM && ("scrollTop" in scrollDOM)){
                sy = scrollDOM.scrollTop;
            }

            if(target){
                let rect = target.getBoundingClientRect();

                rl = rect.left - cl;
                rt = rect.top - ct;
                rr = rect.right;
                rb = rect.bottom;
                rw = rect.width || rr - rl;
                rh = rect.height || rb - rt;
                nul = false;
            }

            return {
                "globalScrollX": rx,
                "globalScrollY": ry,
                "localScrollX": sx,
                "localScrollY": sy,
                "left": rl,
                "top": rt,
                "right": rr,
                "bottom": rb,
                "width": rw,
                "height": rh,
                "nul": nul
            };
        },
    /**
     * 获取网络类型
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API
     * @see http://w3c.github.io/netinfo/
     * @return String type cellular(2g,3g,4g),wifi,ethernet,bluetooth,wimax,none,unknown,other
     */
    getNetworkType: function(){
        let connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {};
        let type = connection.type || "";
        let downlinkMax = undefined === connection.downlinkMax ? 0 : connection.downlinkMax;
        let nt = type;

        if("cellular" == type){
            if(downlinkMax < 2){
                nt = "2g";
            }else if(downlinkMax >= 2 && downlinkMax <= 42){
                nt = "3g";
            }else if(downlinkMax == 100){
                nt = "4g";
            }else{
                nt = type;
            }
        }

        return nt;
    },
    /**
     * 获取当前时间戳
     * @return {[type]} [description]
     */
    now: function(){
        return Date.now ? Date.now() : (new Date().getTime());
    },
    /**
     * Blob分割
     * @param  {[type]} blob  [description]
     * @param  {[type]} start [description]
     * @param  {[type]} end   [description]
     * @param  {[type]} type  [description]
     * @return {[type]}       [description]
     */
    blobSlice: function(blob, start, end, type){
        if(blob.slice){
            return blob.slice(start, end, type);
        }else if(blob.mozSlice){
            return blob.mozSlice(start, end, type);
        }else if(blob.webkitSlice){
            return blob.webkitSlice(start, end, type);
        }

        return blob;
    },
    /**
     * 根据URL获取图片信息
     * @param  {[type]}   src      [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    getImageInfoByURL: function(src, callback){
        let img = new Image();

        img.onload = function(e){
            Handler.execHandler(callback, [img, img.naturalWidth || img.width, img.naturalHeight || img.height]);

            img = null;
        }

        img.onerror = function(e){
            Handler.execHandler(callback, [null, 0, 0]);

            img = null;
        }

        img.src = src;
    },
    /**
     * blob转dataURL
     * @param  {[type]} blob    [description]
     * @param  {[type]} handler [description]
     * @param  {[type]} start   [description]
     * @param  {[type]} end     [description]
     * @param  {[type]} type    [description]
     * @return {[type]}         [description]
     */
    asDataURL: function(blob, handler, start, end, type){
        start = start || 0;
        end = end || blob.size;
        type = type || blob.type;

        let newblob = this.blobSlice(blob, start, end, type); 
        let reader = new FileReader();

        reader.onload = function(e){
            Handler.execHandler(handler, [e, e.target.result]);
        };

        reader.onerror = function(e){
            Handler.execHandler(handler, [e, null]);
        };

        blob = null;

        reader.readAsDataURL(newblob);
    },
    /**
     * blob转binary
     * @param  {[type]} blob    [description]
     * @param  {[type]} handler [description]
     * @param  {[type]} start   [description]
     * @param  {[type]} end     [description]
     * @param  {[type]} type    [description]
     * @return {[type]}         [description]
     */
    asBinaryString: function(blob, handler, start, end, type){
        start = start || 0;
        end = end || blob.size;
        type = type || blob.type;

        let newblob = this.blobSlice(blob, start, end, type); 
        let reader = new FileReader();
        
        reader.onload = function(e){
            Handler.execHandler(handler, [e, e.target.result]);
        };

        reader.onerror = function(e){
            Handler.execHandler(handler, [e, null]);
        };

        blob = null;

        reader.readAsBinaryString(newblob);      
    },
    /**
     * dataURL转blob
     * @param  {[type]} dataURL [description]
     * @return {[type]}         [description]
     */
    asBlob: function(dataURL){
        let arr = dataURL.split(','), 
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);

        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new Blob([u8arr], {type: mime});
    },
    /**
     * 格式化文件大小
     * @param  {[type]} size [description]
     * @return {[type]}      [description]
     */
    formatFileSize : function(size){
        let KB = Math.pow(2, 10);           
        let MB = Math.pow(2, 20);
        let GB = Math.pow(2, 30);
        let TB = Math.pow(2, 40);

        let str = size + "Bytes";

        if(size >= TB){
            str = (size / TB).toFixed(2) + "TB";
        }else if(size >= GB){
            str = (size / GB).toFixed(2) + "GB";
        }else if(size >= MB){
            str = (size / MB).toFixed(2) + "MB";
        }else if(size >= KB){
            str = (size / KB).toFixed(2) + "KB";
        }

        return str;
    },
    /**
     * 延时执行回调
     * @param  {[type]} time    [description]
     * @param  {[type]} handler [description]
     * @return {[type]}         [description]
     */
    delay: function(time, handler){
        setTimeout(function(){
            Handler.execHandler(handler);
        }, time);
    }
}

export default _public;