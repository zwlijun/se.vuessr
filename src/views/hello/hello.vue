<template>
  <div>
    <h1>Hello, world</h1>
    <p>build by <cite>{{this.$store.getters["server/serverInfo"]}}</cite></p>
    <p>Server Response: <strong>{{text}}</strong></p>
    <p>i18n: {{i18n.welcome}}</p>
  </div>
</template>
<style scoped>
cite{
    color: #002bff;
}
</style>
<script>
    //@import
    import {title, seo, ogp, meta, LIFECYCLE_HOOKS} from "~lib/mixins/index";
    export default {
        name: "hello",
        mixins: [title, seo, ogp, meta, LIFECYCLE_HOOKS],
        components: {},
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
                ]
            }
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
            
        }
    };
</script>