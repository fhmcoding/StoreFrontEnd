<template>
    <div class="dark:bg-slate-900 bg-gray-100 font-sans">
        <TransitionRoot as="template" :show="sidebarOpen">
            <Dialog as="div" class="relative z-40 md:hidden" @close="sidebarOpen = false">
                <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
                </TransitionChild>
        
                <div class="fixed inset-0 z-40 flex">
                    <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
                        <DialogPanel class="relative flex w-full max-w-xs flex-1 flex-col bg-white dark:bg-gray-800 pt-5 pb-4">
                            <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                            <div class="absolute top-0 right-0 -mr-12 pt-2">
                                <button type="button" class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="sidebarOpen = false">
                                    <span class="sr-only">Close sidebar</span>
                                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                                </button>
                            </div>
                            </TransitionChild>
                            <div class="flex flex-shrink-0 items-center px-4">
                                <img class="h-8 w-auto" src="/logo.png" alt="Your Company" />
                            </div>
                            <div class="mt-5 h-0 flex-1 overflow-y-auto">
                            <nav class="space-y-1 px-2">
                                <RouterLink v-for="item in navigation" v-show="item.display" @click="current_path = item.name" :key="item.name" :to="item.to" :class="[item.current ? 'bg-primary text-white' : 'text-secondary dark:text-gray-200 hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-gray-100 dark:hover:text-secondary' , 'group flex items-center px-2 py-2 text-sm font-medium rounded-md']">
                                    <component :is="item.icon" :class="[item.current ? 'text-white' : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-200', 'mr-3 flex-shrink-0 h-6 w-6']" aria-hidden="true" />
                                    {{ item.name }}
                                </RouterLink>
                            </nav>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                    <div class="w-14 flex-shrink-0" aria-hidden="true">
                    <!-- Dummy element to force sidebar to shrink to fit close icon -->
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>
  
        <!-- Static sidebar for desktop -->
        <div @mouseenter="sidebareMiniStatus ? sidebareMini = false : null" @mouseleave="sidebareMiniStatus ? sidebareMini = true : null" :class="['hidden md:fixed md:flex shadow-lg md:inset-y-0 md:flex-col z-10', sidebareMini ? 'md:w-20' : 'md:w-64']"><!--      -->
            <!-- Sidebar component, swap this element with another sidebar if you like -->
            <div class="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5 pl-4 pr-1 dark:bg-gray-800 dark:border-gray-800">
                <div class="flex flex-shrink-0 items-stretch pl-3 pr-1 mb-2">
                    <div class="flex-none">
                        <img class="h-8 w-auto" src="/logo.png" alt="Unipay" />
                        
                    </div>
                    <div class="flex-1"><span v-if="!sidebareMini" class="font-mono font-bold text-2xl tracking-wide text-primary px-2"></span></div>
                    <span class="flex-end text-primary text-end dark:text-primary cursor-pointer" v-if="!sidebareMini" @click="sidebare = !sidebare">
                        <ArrowLeftCircleIcon v-if="!sidebareMiniStatus" class="h-9 w-6" aria-hidden="true" />
                        <ArrowRightCircleIcon v-if="sidebareMiniStatus" class="h-9 w-6" aria-hidden="true" />
                    </span>
                </div>
                <div class="mt-5 flex flex-grow flex-col">
                    <nav class="flex-1 space-y-1 px-2 pb-4">
                        <RouterLink v-for="item in navigation" v-show="item.display" @click="current_path = item.name" :key="item.name" :to="item.to" :class="[item.current ? 'bg-primary text-white' : 'text-secondary hover:bg-gray-50 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-100 dark:hover:text-secondary' , 'group flex items-center px-2 py-2 text-sm font-medium rounded-md']">
                            <component :is="item.icon" :class="[item.current ? 'text-white' : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-200', 'mr-3 flex-shrink-0 h-6 w-6']" aria-hidden="true" />
                            <span v-if="!sidebareMini">{{ item.name }}</span>
                        </RouterLink>
                    </nav>
                </div>
            </div>
        </div>

        <div :class="['flex flex-1 flex-col z-0', sidebareMiniStatus ? 'md:pl-20' : 'md:pl-64']">
            <div class="sticky top-0 flex h-16 flex-shrink-0 bg-white mx-6 mt-6 mb-3 rounded-md shadow-lg dark:bg-gray-800">
                <button type="button" class="border-r border-gray-200 dark:border-gray-600 px-4 text-gray-500 dark:text-gray-50 md:hidden" @click="sidebarOpen = true">
                    <span class="sr-only">Open sidebar</span>
                    <Bars3BottomLeftIcon class="h-6 w-6" aria-hidden="true" />
                </button>
                <div class="flex flex-1 justify-between px-4">
                    <div class="flex flex-1">
                        <button type="button" class="rounded-full p-1 text-gray-400 dark:text-white">
                            <span class="sr-only">Mode</span>
                            <MoonIcon v-if="!isDark" @click="toggleDark()" class="h-6 w-6 hover:outline-0" aria-hidden="true" />
                            <SunIcon v-if="isDark" @click="toggleDark()" class="h-6 w-6 hover:outline-0" aria-hidden="true" />
                        </button>
                    </div>
                    
                    <div class="ml-4 flex items-center md:ml-6">
            
                        <div>
                            <p class="pl-3 pt-2 pb-2 w-100 leading-none text-right">
                                <span class="text-sm text-gray-500 font-semibold break-normal dark:text-gray-300">{{ user.first_name }} {{ user.last_name  }}</span><br>
                                <span class="text-xs text-gray-400 dark:text-gray-400">{{ user.phone_number }}</span>
                            </p>
                        </div>
        
                        <!-- Profile dropdown -->
                        <Menu as="div" class="relative ml-3">
                            <div>
                                <MenuButton class="flex max-w-xs items-center rounded-full bg-gray-500 text-white w-9 h-9 text-center justify-center text-sm font-semibold uppercase">
                                    <span>{{user.first_name[0] + user.first_name[user.first_name.length -1]}}</span>
                                </MenuButton>
                            </div>
                            
                            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                                
                                <MenuItems class="absolute right-0 z-0 mt-2 w-60 origin-top-right rounded-md bg-white dark:bg-gray-800 dark:border-gray-50 shadow-lg dark:shadow-md dark:shadow-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div class="flex items-center mt-1 p-2">
                                        <div class="flex  items-center rounded-full bg-gray-500 text-white w-11 h-11 mt-1 text-center justify-center text-sm font-semibold uppercase">
                                            <span>{{user.first_name[0] + user.first_name[user.first_name.length -1]}}</span>
                                        </div>
                                        <p class="pl-3 pt-2 pb-2 w-100 leading-tight">
                                            <span class="text-xs text-gray-500 font-semibold break-normal dark:text-gray-200">{{ user.first_name }} {{ user.last_name }} </span><br>
                                            <span class="text-xs text-gray-400 dark:text-gray-400">{{ user.phone_number }}</span>
                                        </p>
                                    </div>
                                    <hr class="dark:border-gray-600">
                                    <MenuItems v-for="item in userNavigation" @click="current_path = item.name" :key="item.name" v-slot="{ active }">
                                        <div v-if="item.name != 'Sign out'">
                                            <RouterLink :to="item.to" :class="[active ? 'bg-gray-100' : '', 'text-gray-500 group flex items-center px-2 py-2 text-xs font-medium dark:text-gray-300 dark:text-gray-200 dark:hover:bg-gray-100 dark:hover:text-secondary']">
                                                <component :is="item.icon" class="text-gray-400 text-xs group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6  dark:text-gray-300 dark:text-gray-200 dark:hover:bg-gray-100 dark:hover:text-secondary" aria-hidden="true" />
                                                {{ item.name }}
                                            </RouterLink>
                                        </div>
                                        <div v-if="item.name == 'Sign out'">
                                            <div @click="Logout" :class="[active ? 'bg-gray-100' : '', 'text-gray-500 group flex items-center px-2 py-2 text-xs font-medium dark:text-gray-300 dark:text-gray-200 dark:hover:bg-gray-100 dark:hover:text-secondary cursor-pointer']">
                                                <component :is="item.icon" class="text-gray-400 text-xs group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6  dark:text-gray-300 dark:text-gray-200 dark:hover:bg-gray-100 dark:hover:text-secondary" aria-hidden="true" />
                                                {{ item.name }}
                                            </div>
                                        </div>
                                    </MenuItems>
                                </MenuItems>
                            </transition>
                        </Menu>
                    </div>
                </div>
            </div>
    
            <main class="flex-1">
                <div class="py-1">
                    <div class="mx-auto max-w-8xl px-3 sm:px-4 md:px-5 dark:bg-slate-900">
                        <RouterView :key="$route.url" />
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>
  
<script setup>
    import {
        Dialog,
        DialogPanel,
        Menu,
        MenuButton,
        MenuItems,
        TransitionChild,
        TransitionRoot,
    } from '@headlessui/vue'
    
    import {
        Bars3BottomLeftIcon,
        MoonIcon,
        SunIcon,
        HomeIcon,
        UserCircleIcon,
        PowerIcon,
        KeyIcon,
        AdjustmentsHorizontalIcon,
        UsersIcon,
        XMarkIcon,
        ArrowLeftCircleIcon,
        ArrowRightCircleIcon,
        SparklesIcon,
        SquaresPlusIcon,
        ArchiveBoxIcon,
        ShoppingCartIcon
    } from '@heroicons/vue/24/outline'

    import { watch, ref, onMounted } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { useDark, useToggle } from "@vueuse/core"
    import { useAuthStore } from '@/stores/backoffice/auth'

    const route = useRoute()
    const router = useRouter()
    const current_path = ref(route.path)
    const auth = useAuthStore()

    const user = ref(auth.user)

    const navigation = ref([
        { name: 'Dashboard', to: '/backoffice', icon: HomeIcon, current: false, display: true },
        { name: 'Users', to: '/backoffice/users', icon: UsersIcon, current: false, display: auth.permissions.search('user-list') > 1 },
        { name: 'Roles', to: '/backoffice/roles', icon: KeyIcon, current: false, display: auth.permissions.search('role-list') > 1 },
        { name: 'Permissions', to: '/backoffice/permissions', icon: AdjustmentsHorizontalIcon, current: false, display: auth.permissions.search('permission-list') > 1 },
        { name: 'Brands', to: '/backoffice/brands', icon: SparklesIcon, current: false, display: auth.permissions.search('brand-list') > 1 },
        { name: 'Offers', to: '/backoffice/offers', icon: SparklesIcon, current: false, display: auth.permissions.search('offer-list') > 1 },
        { name: 'Categories', to: '/backoffice/categories', icon: SquaresPlusIcon, current: false, display: auth.permissions.search('category-list') > 1 },
        { name: 'Products', to: '/backoffice/products', icon: ArchiveBoxIcon, current: false, display: auth.permissions.search('product-list') > 1 },
        { name: 'Orders', to: '/backoffice/orders', icon: ShoppingCartIcon, current: false, display: auth.permissions.search('order-list') > 1 },

    ])

    const userNavigation = [
        { name: 'Your Profile', to: '/backoffice/profile', icon: UserCircleIcon },
        { name: 'Sign out', to: '/backoffice/sign_out', icon: PowerIcon },
    ]

    const isDark = useDark();
    const toggleDark = useToggle(isDark);

    const sidebarOpen = ref(false)
    const sidebareMini = ref(false)
    const sidebareMiniStatus = ref(false)
    const sidebare = ref(true)

    const Logout = async () => {
        auth.logout()
    };

    watch(router.currentRoute, () => {
        navigation.value.filter((item) => {
            if(router.currentRoute.value.path == item.to){
                item.current = true
            }else{
                item.current = false
            }
        })
    },{immediate:true})

    watch(sidebare, () => {
        if(sidebareMiniStatus.value){
            sidebareMiniStatus.value = false
        }else{
            sidebareMiniStatus.value = true
        }
    })
    
</script>