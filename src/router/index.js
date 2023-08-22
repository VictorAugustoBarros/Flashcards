// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "decks",
        name: "Decks",
        component: () => import("@/views/Decks.vue"),
      },
      {
        path: "cards",
        name: "Cards",
        component: () => import("@/views/Cards.vue"),
      },
    ],
  },
  {
    path: "/login",
    children: [
      {
        path: "",
        name: "Login",
        component: () => import("@/views/Login.vue"),
      },
    ],
  },
  {
    path: "/register",
    children: [
      {
        path: "",
        name: "Register",
        component: () => import("@/views/Register.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Middleware para verificar a autenticação

import { useAuthStore } from "@/store/app";

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.hasToken;

  if (to.path !== "/login" && to.path !== "/register" && !isAuthenticated) {
    next("/login");
  } else if (to.path === "/login" && isAuthenticated) {
    next("/");
  } else if (to.path === "/login" && !isAuthenticated) {
    next();
  } else if (to.path !== "/login" && isAuthenticated) {
    const validToken = authStore.validateToken();
    if (!validToken) {
      next("/login");
      return;
    }
    next();
  } else {
    next();
  }
});
export default router;
