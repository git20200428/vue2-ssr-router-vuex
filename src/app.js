//创建vue实例
import Vue from "vue";
import App from "./App.vue";
import createRouter from "./router";
import createStore from "@/store";

export default function createApp() {
  const router = createRouter();
  const store = createStore();
  const app = new Vue({
    router,
    store,
    render: (h) => h(App),
  });

  return { app, router };
}
