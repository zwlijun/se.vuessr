import { createVueApp  } from './app.js'
import VUESSRContext from "~conf/server/context.conf";

const isDev = process.env.NODE_ENV !== 'production'


// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
export default context => {
    return new Promise((resolve, reject) => {
        const s = Date.now()
        const { app, router, store } = createVueApp()

        const { client, server, meta, ogp, seo, cookies } = context
        const { fullPath } = router.resolve(client.relativeURL).route

        // console.log("context", context)

        //将服务器信息同步到客户端
        store.commit("server/client", client)
        store.commit("server/server", server)
        store.commit("server/meta", meta)
        store.commit("server/ogp", ogp)
        store.commit("server/seo", seo)
        store.commit("server/cookies", cookies)
        //--------------------------
        
        if (fullPath !== client.relativeURL) {
            return reject({ url: fullPath })
        }

        // set router's location
        router.push(client.relativeURL)

        // wait until router has resolved possible async hooks
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            // no matched routes
            if (!matchedComponents.length) {
                reject({ code: 404 })
            }

            const currentRoute = router.currentRoute;

            // Call fetchData hooks on components matched by the route.
            // A preFetch hook dispatches a store action and returns a Promise,
            // which is resolved when the action is complete and store state has been
            // updated.
            Promise.all(matchedComponents.map(
                ({ name, asyncData }) => {
                    console.log(`[${currentRoute.name}]`, `server components[${name}] asyncData...`)

                    if(asyncData){
                        return asyncData({
                            store,
                            route: currentRoute,
                            cookies
                        })
                    }

                    return null;
                }
            )).then(() => {
                console.log(`[${currentRoute.name}]`, `server data pre-fetch: ${Date.now() - s}ms`)
                // After all preFetch hooks are resolved, our store is now
                // filled with the state needed to render the app.
                // Expose the state on the render context, and let the request handler
                // inline the state in the HTML response. This allows the client-side
                // store to pick-up the server-side state without having to duplicate
                // the initial data fetching on the client.
                context.state = store.state
                resolve(app)

                console.log(`[${currentRoute.name}]`, `server app resolve: ${Date.now() - s}ms`)
            }).catch(reject)
        }, reject)
    })
}