import { useAuthStore } from '../stores/backoffice/auth';

function isAuth(to) {
    const auth = useAuthStore();
    if (! auth.user) return { path: '/login'}
}

function hasPermission(to) {
    const auth = useAuthStore();
    if (! auth.hasPermission(to.meta.permission)) return { path: '/backoffice'}
}

export default [
    {
        path: "/backoffice",
        name: "index",
        component: () => import('../views/backoffice/layouts/Master.vue'),
        beforeEnter: [ isAuth ],
        children: [
            {
                path: '',
                component: () => import('@/views/backoffice/Index.vue'),
                beforeEnter: [],
            },
            
            
            {
                path: 'users',
                children: [
                    {
                        path: 'edit/:id',
                        component: () => import('@/views/backoffice/users/Edit.vue'),
                        meta: {
                            permission: "user-edit",
                        },
                        beforeEnter: [ hasPermission ],
                    },
                    {
                        path: 'create',
                        component: () => import('@/views/backoffice/users/Create.vue'),
                        meta: {
                            permission: "user-create",
                        },
                        beforeEnter: [ hasPermission ],
                    },
                    {
                        path: '',
                        component: () => import('@/views/backoffice/users/List.vue'),
                        meta: {
                            permission: "user-list",
                        },
                        beforeEnter: [ hasPermission ],
                    }
                ]
            },
            {
                path: 'clients',
                children: [
                    {
                        path: 'edit/:id',
                        component: () => import('@/views/backoffice/clients/Edit.vue'),
                        meta: {
                            permission: "user-edit",
                        },
                        beforeEnter: [ hasPermission ],
                    },
                    {
                        path: 'create',
                        component: () => import('@/views/backoffice/clients/Create.vue'),
                        meta: {
                            permission: "user-create",
                        },
                        beforeEnter: [ hasPermission ],
                    },

                    {
                        path: 'status/:id',
                        component: () => import('@/views/backoffice/clients/Status.vue'),
                        meta: {
                            permission: "user-create",
                        },
                        beforeEnter: [ hasPermission ],
                    },
                    {
                        path: '',
                        component: () => import('@/views/backoffice/clients/List.vue'),
                        meta: {
                            permission: "user-list",
                        },
                        beforeEnter: [ hasPermission ],
                    }
                ]
            },
            {
                path: 'roles',
                component: () => import('@/views/backoffice/roles/Index.vue'),
                meta: {
                    permission: "role-list",
                },
                beforeEnter: [ hasPermission ],
            },
            {
                path: 'payments',
                component: () => import('@/views/backoffice/payments/List.vue'),
                meta: {
                    permission: "role-list",
                },
                beforeEnter: [ hasPermission ],
            },
            {
                path: 'payments/create',
                component: () => import('@/views/backoffice/payments/Create.vue'),
                meta: {
                    permission: "role-list",
                },
                beforeEnter: [ hasPermission ],
            },
            {
                path: 'permissions',
                component: () => import('@/views/backoffice/permissions/Index.vue'),
                meta: {
                    permission: "permission-list",
                },
                beforeEnter: [ hasPermission ],
            },
            {
                path:'brands',
                component:() => import('@/views/backoffice/brands/Index.vue'),
                meta:{
                    permission: "brand-list",
                },
                beforeEnter: [ hasPermission ],
            },
            {
                path:'offers',
                component:() => import('@/views/backoffice/offers/list.vue'),
                meta:{
                    permission: "offer-list",
                },
                beforeEnter: [ hasPermission ],
            },
            {
                path:'categories',
                component:() => import('@/views/backoffice/categories/Index.vue'),
                meta:{
                    permission: "category-list",
                },  
                beforeEnter: [ hasPermission ],
            },
            {
                path: 'products',
                children: [
                    {
                        path: 'edit/:id',
                        component: () => import('@/views/backoffice/products/Edit.vue'),
                        meta: {
                            permission: "product-edit",
                        },
                        beforeEnter: [ hasPermission ],
                    },
                    {
                        path: 'create',
                        component: () => import('@/views/backoffice/products/Create.vue'),
                        meta: {
                            permission: "product-create",
                        },
                        beforeEnter: [ hasPermission ],
                    },
                    {
                        path: '',
                        component: () => import('@/views/backoffice/products/List.vue'),
                        meta: {
                            permission: "product-list",
                        },
                        beforeEnter: [ hasPermission ],
                    }
                ]
            },
            
            {
                path:'orders/:id',
                component:() => import('@/views/backoffice/orders/Show.vue'),
                meta:{
                    permission: "order-list",
                },  
                beforeEnter: [ hasPermission ],
            },
            {
                path:'orders',
                component:() => import('@/views/backoffice/orders/List.vue'),
                meta:{
                    permission: "order-list",
                },  
                beforeEnter: [ hasPermission ],
            },
        ]
    },
    {
        path: '/backoffice/caisse/print/status',
        component: () => import('@/views/backoffice/Caisse/Status.vue'),
        beforeEnter: [isAuth],
    },
    {
        path: '/backoffice/caisse/print/:id',
        component: () => import('@/views/backoffice/Caisse/Print.vue'),
        beforeEnter: [isAuth],
    },
    
    {
        path: '/backoffice/caisse',
        component: () => import('@/views/backoffice/Caisse/Index.vue'),
        meta: {
            permission: "caisse",
        },
        beforeEnter: [isAuth, hasPermission ]
    },
]