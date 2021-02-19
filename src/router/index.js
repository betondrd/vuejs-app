import Vue from "vue";
import VueRouter from "vue-router";
import beforeEach from "./beforeEach";

//views
import Home from "@/views/home/Home";
import Auth from "@/views/auth/Auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach(beforeEach);

export default router;
