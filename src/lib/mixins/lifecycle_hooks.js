import iLang from "../i18n";
import i18n from "@/i18n";
import runtime from "../utils/runtime";

const LIFECYCLE_HOOKS = {
    /**
     * Called synchronously immediately after the instance 
     * has been initialized, before data observation and event/watcher setup.
     * @return {[type]} [description]
     */
    beforeCreate(){
        //@todo
        //处理服务器端cookie
        if(runtime.node()){
            let cookies = this.$store.getters["server/cookies"];

            if(cookies && cookies.lang){
                this.$store.commit("i18n/message", i18n(cookies.lang));
            }
        }
    },
    /**
     * Called synchronously after the instance is created. At this stage, 
     * the instance has finished processing the options which means 
     * the following have been set up: 
     *     data observation, 
     *     computed properties, 
     *     methods, 
     *     watch/event callbacks. 
     * However, the mounting phase has not been started, and the $el property 
     * will not be available yet.
     * @return {[type]} [description]
     */
    created(){
        //@todo
    },
    /**
     * Called right before the mounting begins: the render function is 
     * about to be called for the first time.
     * 
     * This hook is not called during server-side rendering.
     * 
     * @return {[type]} [description]
     */
    beforeMount(){
        //@todo
        iLang.setLang("en-US");
        this.$store.commit("i18n/message", i18n());
    },
    /**
     * Called after the instance has been mounted, where el is 
     * replaced by the newly created vm.$el. If the root instance is mounted to 
     * an in-document element, vm.$el will also be in-document when mounted is called.
     *
     * Note that mounted does not guarantee that all child components have also been mounted. 
     * If you want to wait until the entire view has been rendered, 
     * you can use vm.$nextTick inside of mounted:
     * mounted: function () {
     *   this.$nextTick(function () {
     *     // Code that will run only after the
     *     // entire view has been rendered
     *   })
     * }
     *
     * This hook is not called during server-side rendering.
     * 
     * @return {[type]} [description]
     */
    mounted(){
        //@todo
    },
    /**
     * Called when data changes, before the DOM is patched. 
     * This is a good place to access the existing DOM before an update, 
     * e.g. to remove manually added event listeners.
     *
     * This hook is not called during server-side rendering, because only the initial render is performed server-side.
     * 
     * @return {[type]} [description]
     */
    beforeUpdate(){
        //@todo
    },
    /**
     * Called after a data change causes the virtual DOM to be re-rendered and patched.
     *
     * The component’s DOM will have been updated when this hook is called, 
     * so you can perform DOM-dependent operations here. However, 
     * in most cases you should avoid changing state inside the hook. 
     * To react to state changes, it’s usually better to use a computed property or watcher instead.
     *
     * Note that updated does not guarantee that all child components have also been re-rendered. 
     * If you want to wait until the entire view has been re-rendered, 
     * you can use vm.$nextTick inside of updated:
     *
     * updated: function () {
     *   this.$nextTick(function () {
     *     // Code that will run only after the
     *     // entire view has been re-rendered
     *   })
     * }
     *
     * This hook is not called during server-side rendering.
     * 
     * @return {[type]} [description]
     */
    updated(){
        //@todo
    },
    /**
     * Called when a kept-alive component is activated.
     *
     * This hook is not called during server-side rendering.
     * 
     * @return {[type]} [description]
     */
    activated(){
        //@todo
    },
    /**
     * Called when a kept-alive component is deactivated.
     *
     * This hook is not called during server-side rendering.
     * 
     * @return {[type]} [description]
     */
    deactivated(){
        //@todo
    },
    /**
     * Called right before a Vue instance is destroyed. At this stage the instance is still fully functional.
     *
     * This hook is not called during server-side rendering.
     * 
     * @return {[type]} [description]
     */
    beforeDestroy(){
        //@todo
    },
    /**
     * Called after a Vue instance has been destroyed. When this hook is called, 
     * all directives of the Vue instance have been unbound, all event listeners have been removed, 
     * and all child Vue instances have also been destroyed.
     *
     * This hook is not called during server-side rendering.
     * 
     * @return {[type]} [description]
     */
    destroyed(){
        //@todo
    },
    /**
     * Called when an error from any descendent component is captured. 
     * The hook receives three arguments: the error, the component instance that triggered the error, 
     * and a string containing information on where the error was captured. 
     * The hook can return false to stop the error from propagating further.
     *
     * You can modify component state in this hook. However, it is important to 
     * have conditionals in your template or render function that short circuits other content 
     * when an error has been captured; otherwise the component will be 
     * thrown into an infinite render loop.
     *
     * Error Propagation Rules
     * (a) By default, all errors are still sent to the global config.errorHandler if it is defined, 
     * so that these errors can still be reported to an analytics service in a single place.
     * (b) If multiple errorCaptured hooks exist on a component’s inheritance chain or parent chain, 
     * all of them will be invoked on the same error.
     * (c) If the errorCaptured hook itself throws an error, both this error and the original 
     * captured error are sent to the global config.errorHandler.
     * (d) An errorCaptured hook can return false to prevent the error from propagating further. 
     * This is essentially saying “this error has been handled and should be ignored.” 
     * It will prevent any additional errorCaptured hooks or the global config.errorHandler from being invoked for this error.
     * 
     * @param  {[type]} err  [description]
     * @param  {[type]} vm   [description]
     * @param  {[type]} info [description]
     * @return {[type]}      [description]
     */
    errorHandler(err, vm, info){
        //@todo
    },
    /**
     * Fetch async data during server side rendering. It should store fetched data into a global store and return a Promise. 
     * The server renderer will wait on this hook until the Promise is resolved. 
     * This hook has access to the component instance via this.
     * @return {[type]} [description]
     */
    serverPrefetch(){
        //@todo
    }
};

export default LIFECYCLE_HOOKS;