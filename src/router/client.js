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
                path:'/checkout',
                name:'checkout',
                component: () => import('@/views/Checkout.vue')
            },
            {
                path:'/thank',
                name:'thank.you',
                component: () => import('@/views/thankyou.vue')
            }
        ]
    },
]