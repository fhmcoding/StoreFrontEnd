export default [
    {
        path: "/",
        name: "homepage",
        component: () => import("../views/layouts/Master.vue"),
        children: [
            {
                path: '/',
                name:'home-page',
                component: () => import('@/views/Index.vue'),
            },
            {
                path:'/products/:id',
                name:'product',
                component: () => import('@/views/products/Show.vue')
            },
            {
                path:'/products',
                name:'products',
                component: () => import('@/views/products/List.vue')
            },
            {
                path:'/cart',
                name:'cart',
                component: () => import('@/views/Cart.vue')
            }
        ]
    },
]