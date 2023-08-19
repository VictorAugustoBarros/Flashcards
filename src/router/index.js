// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Register",
        component: () => import("@/views/Register.vue"),
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
router.beforeEach((to, from, next) => {
  const isAuthenticated = true
  
  if (to.path !== '/login' && !isAuthenticated) {
    next('/login');
    
  }else if  (to.path == "/login" && isAuthenticated ) {
    next('/');

  } else {
    next();
  }
});

export default router;
