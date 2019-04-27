<template>
  <div>
    <h1>Hello, world</h1>
    <p>build by <cite>{{this.$store.getters["server/serverInfo"]}}</cite></p>
    <p>Server Response: <strong>{{text}}</strong></p>
    <p @click="showTips">i18n: {{i18n.welcome}} - Toast</p>
    <toast skin="test" :visible="toastVisible" :position="Toast.Position.CENTER_MIDDLE" :text="text"></toast>
  </div>
</template>
<style module>
.icofont.success:before,
.icofont.ok:before{
    margin-right: 0;
}    
</style>
<style scoped>
cite{
    color: #002bff;
}
</style>
<script>
    //@import
    import {title, seo, ogp, meta, LIFECYCLE_HOOKS} from "~lib/mixins";
    import Toast from "@/components/impl/tips/toast";

    export default {
        name: "hello",
        mixins: [title, seo, ogp, meta, LIFECYCLE_HOOKS],
        components: {
            Toast
        },
        title(){
            return this.title;
        },
        seo(){
            return this.seo;
        },
        ogp(){
            return this.ogp;
        },
        meta(){
            return this.meta;
        },
        data(){
            return {
                Toast: Toast,
                "title": "Hello VUE SSR - CLIENT",
                "seo": {
                    "keywords": "hello, world",
                    "description": "test"
                },
                "ogp": {
                    "og:url"         : this.$store.getters["server/absoluteURL"],
                    "og:title"       : "VUE SSR Base - Hello world",
                    "og:type"        : "website",
                    "og:image"       : "",
                    "og:description" : "SE.VUESSR - VUE SSR Base - Hello world",
                    "og:site_name"   : "SE.VUESSR"
                },
                "meta": [
                    {
                      "name": "q2",
                      "content": "test",
                      "data-alias": "ssr"
                    }
                ],
                "toastVisible": false
            }
        },
        mounted(){
            let _this = this;
            setTimeout(function(){
                _this.toastVisible = true;
            }, 3000);
        },
        asyncData({store, route}){
            return store.dispatch("hello/read");
        },
        computed: {
            text(){
                return this.$store.getters["hello/text"];
            }
        },
        methods: {
            showTips(){
                Toast.message({
                    "type": Toast.Types.ICON,
                    "icon": ["icofont", "success"],
                    "text": `${this.i18n.welcome}`,
                    "visible": true,
                    "delay": 3000
                })
            }
        }
    };
</script>