import { createRouter, createWebHistory } from "vue-router";

import backoffice from "./backoffice";
import client from "./client";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...client,
        ...backoffice,
        {
            path: "/login",
            name: "login",
            component: () => import("../views/auth/Login.vue"),
        }
    ],
});

export default router;

