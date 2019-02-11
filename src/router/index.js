import Vue from "vue"
import Router from "vue-router"

//-------------------------------------------[[
import hello from "@/components/hello/hello"
//-------------------------------------------]]

Vue.use(Router)

export function createRouter () {
  return new Router({
    "mode": 'history',
    "routes": [
      // ...
      {
        "name": "hello",
        "path": "/hello",
        "component": hello
      }
    ]
  })
}