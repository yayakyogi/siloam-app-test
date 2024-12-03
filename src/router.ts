import { createWebHistory, createRouter } from "vue-router";

import HomeView from "./view/HomeView.vue";
import LoginView from "./view/LoginView.vue";
import DashboardView from "./view/DashboardView.vue";
import VendorView from "./view/vendors/VendorView.vue";
import VendorCreateView from "./view/vendors/VendorCreateView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/login", name: "login", component: LoginView },
  {
    path: "/admin",
    name: "admin",
    children: [
      { path: "", name: "dashboard", component: DashboardView },
      {
        path: "vendors",
        name: "vendors",
        children: [
          { path: "", component: VendorView },
          {
            path: "create",
            name: "create-vendor",
            component: VendorCreateView,
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
