<template>
  <div>
    <h1>Hello, world</h1>
    <p>build by <cite>{{this.$store.state.server.server}}</cite></p>
    <p>Server Response: <strong>{{text}}</strong></p>
  </div>
</template>
<style scoped>
cite{
    color: #002bff;
}
</style>
<script>
    //@import
    import {mapActions} from "vuex";
    import {title, seo, ogp, meta} from "~lib/mixins/index";
    export default {
        mixins: [title, seo, ogp, meta],
        components: {},
        title(){
            return this.title;
        },
        seo(){
            return {
                "keywords": "hello, world",
                "description": "test"
            }
        },
        ogp(){
            return {
                "og:url"         : this.$store.state.server.client.absoluteURL,
                "og:title"       : "VUE SSR Base - Hello world",
                "og:type"        : "website",
                "og:image"       : "",
                "og:description" : "SE.VUESSR - VUE SSR Base - Hello world",
                "og:site_name"   : "SE.VUESSR"
            }
        },
        meta(){
            return [
                {
                  "name": "q2",
                  "content": "test",
                  "data-alias": "ssr"
                }
            ]
        },
        data(){
            return {
                "title": "Hello VUE SSR"
            }
        },
        beforeCreate(){
            //@todo
        },
        created(){
            //@todo            
        },
        beforeMount(){
            //@todo
        },
        mounted(){
            //@todo
            
        },
        beforeUpdate(){
            //@todo
        },
        updated(){
            //@todo
        },
        beforeDestroy(){
            //@todo
        },
        destroyed(){
            //@todo
        },
        asyncData({store, route}){
            return store.dispatch("hello/read");
        },
        computed: {
            text(){
                return this.$store.state.hello.text;
            }
        },
        methods: {
            
        }
    };
</script>