import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import AddOrEditItem from "./components/Todo/AddOrEditItem.vue";
import List from "./components/Todo/List.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/:addoredit", component: AddOrEditItem, props: true },
    {
      path: "/:addoredit/:itemId",
      component: AddOrEditItem,
      props: true,
    },
    {
      path: "/",
      component: List,
    },
  ],
});

const app = createApp(App);
app.use(router);

app.mount("#app");
