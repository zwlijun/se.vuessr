import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const HelloWorld = {
  "template": "<h1>Hello world!</h1>"
}

export function createRouter () {
  return new Router({
    "mode": 'history',
    "routes": [
      // ...
      {
        "name": "hello",
        "path": "/hello",
        "component": HelloWorld
      }
    ]
  })
}