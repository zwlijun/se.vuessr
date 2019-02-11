<template>
  <div>
    <h1>Hello, world</h1>
    <p>build by "{{this.$store.state.server}}"</p>
  </div>
</template>

<script>
    //@import
    import {title, seo, ogp, meta} from "~lib/mixins/index"
    export default {
        mixins: [title, seo, ogp, meta],
        components: {},
        title(){
            return this.title;
        },
        seo(){
            return {
                "keywords": "hello, world",
                "descript": "test"
            }
        },
        ogp(){
            return {
                "og:url"         : this.$store.state.client.absoluteURL,
                "og:title"       : "VUE SSR Base",
                "og:type"        : "website",
                "og:image"       : "",
                "og:description" : "SE.VUESSR - VUE SSR Base",
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
        computed: {

        },
        methods: {

        }
    };
</script>