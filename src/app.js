import Vue from 'vue'
import App from './App.vue'
import {createStore} from './store';
import {createRouter} from './router';
import { sync } from 'vuex-router-sync';

export function createVueApp() {
	// create router and store instances
	const router = createRouter()
	const store = createStore()

  	// sync so that route state is available as part of the store
	sync(store, router)

	const app = new Vue({
	    router,
	    store,
	    render: h => h(App)
	})

	return { app, router, store }
}