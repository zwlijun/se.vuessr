<template>
  <div class="mod-toast ellipsis flexbox middle center" :id="toastId" :class="[type, position, skin, visible ? 'show' : 'init', exit ? 'exit' : '']">
    <cite v-if="ToastTypes.ICON === type"></cite>
    <span class="ellipsis">{{text}}</span>
  </div>
</template>
<style module>
    .mod-toast{
        position: fixed;
        z-index: 59990;
        max-width: -webkit-calc(100% - 1.60rem);
        max-width:    -moz-calc(100% - 1.60rem);
        max-width:     -ms-calc(100% - 1.60rem);
        max-width:         calc(100% - 1.60rem);
        background-color: rgba(0, 0, 0, .75);
        color: #fff;
        padding: .16rem .40rem;
        border-radius: 4rem;
        line-height: 1.5;
        opacity: 0;
        -webkit-transition: opacity .4s;
           -moz-transition: opacity .4s;
            -ms-transition: opacity .4s;
                transition: opacity .4s;
        white-space: nowrap;
    }
    .mod-toast.init{
        left: -100000px!important;
        top: -100000px!important;
    }
    .mod-toast.show{
        opacity: 1;
    }
    .mod-toast.exit{
        opacity: 0!important;
    }
    .mod-toast cite,
    .mod-toast span{
        display: inline-block;
    }
    .mod-toast.toast-center-top{
        top: .40rem;
        left: 50%;
              -ms-transform: translate(-50%, 0%) translateZ(0);
             -moz-transform: translate(-50%, 0%) translateZ(0);
          -webkit-transform: translate(-50%, 0%) translateZ(0);
                  transform: translate(-50%, 0%) translateZ(0);
    }
    .mod-toast.toast-left-top{
        top: .40rem;
        left: .40rem;
    }
    .mod-toast.toast-right-top{
        top: .40rem;
        right: .40rem;
    }
    .mod-toast.toast-center-bottom{
        bottom: .40rem;
        left: 50%;
              -ms-transform: translate(-50%, 0%) translateZ(0);
             -moz-transform: translate(-50%, 0%) translateZ(0);
          -webkit-transform: translate(-50%, 0%) translateZ(0);
                  transform: translate(-50%, 0%) translateZ(0);
    }
    .mod-toast.toast-left-bottom{
        bottom: .40rem;
        left: .40rem;
    }
    .mod-toast.toast-right-bottom{
        bottom: .40rem;
        right: .40rem;
    }
    .mod-toast.toast-center-middle{
        top: 50%;
        left: 50%;
              -ms-transform: translate(-50%, -50%) translateZ(0);
             -moz-transform: translate(-50%, -50%) translateZ(0);
          -webkit-transform: translate(-50%, -50%) translateZ(0);
                  transform: translate(-50%, -50%) translateZ(0);
    }
    .mod-toast.toast-left-middle{
        top: 50%;
        left: .40rem;
              -ms-transform: translate(0%, -50%) translateZ(0);
             -moz-transform: translate(0%, -50%) translateZ(0);
          -webkit-transform: translate(0%, -50%) translateZ(0);
                  transform: translate(0%, -50%) translateZ(0);
    }
    .mod-toast.toast-right-middle{
        top: 50%;
        right: .40rem;
              -ms-transform: translate(0%, -50%) translateZ(0);
             -moz-transform: translate(0%, -50%) translateZ(0);
          -webkit-transform: translate(0%, -50%) translateZ(0);
                  transform: translate(0%, -50%) translateZ(0);
    }    
</style>
<script>
    import Util from "@/lib/utils/util";
    import Handler from "@/lib/utils/handler";
    import Serializable from "@/lib/utils/serializable";

    const ToastTypes = {
        TEXT: "text-toast",
        ICON: "icon-toast"
    };
    const ToastPosition = {
        "LEFT_TOP": "toast-left-top",
        "LEFT_MIDDLE": "toast-left-middle",
        "LEFT_BOTTOM": "toast-left-bottom",
        "CENTER_TOP": "toast-center-top",
        "CENTER_MIDDLE": "toast-center-middle",
        "CENTER_BOTTOM": "toast-center-bottom",
        "RIGHT_TOP": "toast-right-top",
        "RIGHT_MIDDLE": "toast-right-middle",
        "RIGHT_BOTTOM": "toast-right-bottom"
    };
    export default {
        name:　"toast",
        //类型
        Types: ToastTypes,
        Position: ToastPosition,
        data: function(){
            return {
                ToastTypes: ToastTypes,
                ToastPosition: ToastPosition,
                exit: false
            };
        },
        //定义属性
        props: {
            toastId: {
                type: String,
                default: "toast_" + Serializable.UUID(32)
            },
            text: {
                type: String,
                default: ""
            },
            visible: {
                type: Boolean,
                default: false
            },
            skin: {
                type: String,
                default: ""
            },
            type: {
                type: String,
                default: ToastTypes.TEXT
            },
            position: {
                type: String,
                default: ToastPosition.CENTER_MIDDLE
            },
            delay: {
                type: Number,
                default: 3000
            },
            show: {
                type: Object,
                default: null
            },
            hide: {
                type: Object,
                default: null
            }
        },
        watch: {
            visible(newValue, oldValue){
                this.display(true === newValue);
            }
        },
        //方法
        methods: {
            onExit(el){
                Util.delay(this.delay, {
                    callback: function($el){
                        this.exit = true;

                        if($el){
                            Util.delay(500, {
                                callback: function(_el){
                                    _el.parentNode.removeChild(_el);
                                },
                                args: [$el]
                            }) 
                        }               

                        Handler.execHandler(this.hide, []);
                    },
                    args: [el],
                    context: this
                });
            },
            onEnter(el){
                if(el){
                    const rect = Util.getBoundingClientRect(el);

                    let width = Math.floor(rect.width);
                    let height = Math.floor(rect.height);

                    width += (width % 2);
                    height += (height % 2);

                    el.style.cssText = `width: ${width}px; height: ${height}px;`;
                }

                Handler.execHandler(this.show, [el]);
            },
            createOptions(options){
                options = options || {};

                const props = {
                    "toastId": "toast_" + Serializable.UUID(32),
                    "text": options.text || "",
                    "visible": true === options.visible,
                    "skin": options.skin || "",
                    "type": options.type || ToastTypes.TEXT,
                    "position": options.position || ToastPosition.CENTER_MIDDLE,
                    "delay": options.delay || 3000,
                    "show": Handler.createHandler(options.show),
                    "hide": Handler.createHandler(options.hide)
                };

                return props;
            },
            display(visible){
                const el = this.$el;

                if(true === visible){
                    this.onEnter(el);
                    this.onExit(el);
                }else{
                    this.onExit(el);
                }
            }
        }
    }
</script>