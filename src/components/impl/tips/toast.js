/**********************************************************
 * Copyright (c) SESHENGHUO.COM All rights reserved       *
 **********************************************************/

/**
 * Toast API 组件实现
 * @charset utf-8
 * @author lijun
 * @git: https://github.com/zwlijun/se.vuessr
 * @date 2019.4
 */
'use strict';

import Vue from "vue";
import ToastUIView from "@/components/uiview/tips/toast";

ToastUIView.message = function(options){
    const props = ToastUIView.methods.createOptions(options);
    const UIView = Vue.extend(ToastUIView);

    const toast = new UIView({
        propsData: props
    });

    toast.$mount();
    document.body.appendChild(toast.$el);

    toast.display(true === toast.visible);
};

export default ToastUIView;