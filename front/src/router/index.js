import Reg from "../views/RegisterPage.vue";
import Log from "../views/LoginPage.vue";
import Main from "../components/CatMain.vue";
import NotFound from "../components/404Page.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/", name: "Login", component: Log },
  { path: "/reg", component: Reg },
  { path: "/home", name: "Home", component: Main },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
