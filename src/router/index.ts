// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/welcome",
    component: () => import("@/views/Welcome.vue"),
    children: [
      {
        path: "/about",
        name: "Sobre",
        component: () => import("@/views/About.vue"),
      },
      {
        path: "/how-it-works",
        name: "HowItWorks",
        component: () => import("@/views/HowItWorks.vue"),
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
    ],
  },
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
    path: "/:catchAll(.*)",
    component: () => import("@/views/404.vue"),
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

  // console.log(from.path + " -> " + to.path + " -> " + isAuthenticated);

  if (authStore.getFirstAccess) {
    authStore.setFirstAccess();
    next("/how-it-works");
  } else if (to.path === "/") {
    if (isAuthenticated) {
      next();
    } else {
      next("/how-it-works");
    }
  } else if (to.path === "/login" || to.path === "/register") {
    if (isAuthenticated) {
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
