<template>
  <div>
    <h1>Hello, world</h1>
    <p>build by "{{this.$store.state.server}}"</p>
  </div>
</template>

<script>
    //@import
    import {title} from "~lib/mixins/index"
    export default {
        mixins: [title],
        components: {},
        title(){
            return this.title;
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