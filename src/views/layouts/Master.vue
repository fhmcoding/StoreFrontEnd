<template>
    <!-- Top Bar (hidden on mobile) -->
    <div class="bg-black">
        <div class="mx-auto hidden md:flex max-w-7xl items-center justify-between  px-11 py-2 text-white text-sm">
            
            <div class="flex items-center gap-8">

                <!-- Save 70% -->
                <div class="flex items-center gap-2">
                    <span class="text-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-phone-call fill-white"><path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    </span>
                    <span>Save up to <strong>70%</strong></span>
                </div>

                <!-- Fast Delivery -->
                <div class="flex items-center gap-2">
                    <span class="text-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock fill-white"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    </span>
                    <span>Fast delivery</span>
                </div>

                

            </div>
            <!-- Satisfied customers -->
                <div class="flex items-center gap-2">
                    <span class="text-lg">❤️</span>
                    <span>Over <strong>2.5 million</strong> satisfied customers</span>
                </div>
        </div>
    </div>

    <header class="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <nav
            class="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8"
            aria-label="Global"
        >
            <div class="flex lg:flex-1">
                <a href="#" class="-m-1.5 p-1.5">
                   <img src="/logo.png" class="w-[150px]" />
                </a>
            </div>
            <div class="flex lg:hidden">
                <button
                    type="button"
                    class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    @click="mobileMenuOpen = true"
                >
                    <span class="sr-only">Open main menu</span>
                    <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                </button>
            </div>
            <div class="hidden lg:flex lg:gap-x-12 items-center">
                <RouterLink
                    to="/"
                    class="text-sm font-semibold leading-6 text-gray-900"
                   
                    >Home</RouterLink
                >

                <RouterLink
                    :to="'products'"
                    class="text-sm font-semibold leading-6 text-gray-900"
                    >Products</RouterLink
                >
                <!-- v-if='auth.user != undefined && auth.user.first_name == undefined' -->
                <div  @click="authModel = true"  class="text-sm font-semibold leading-6 text-gray-900 cursor-pointer">Login</div>

                <div @click="cartPopUp = true" class="flex items-center gap-1 text-sm font-semibold leading-6 text-gray-900 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                    <span>Cart</span> 
                    <span v-if='cartModel.cartCount > 0' class="bg-orange-500 text-xs w-6 h-6 font-semibold text-white flex items-center justify-center rounded-full">{{ cartModel.cartCount }}</span>
                </div>

                <div v-if="auth.user != undefined && auth.user.first_name != undefined"> 
                    <Menu as="div" class="relative ltr:ml-3 rtl:mr-3 ring-1 ring-inset ring-gray-200 rounded-md p-1">
                        <div class="">
                            <MenuButton class="flex max-w-xs items-center rounded-full bg-white text-sm gap-1">
                                <div>
                                    <p class="ltr:pl-3 rtl:pr-3 pt-1 pb-1 w-100 leading-tight text-right">
                                        <span class="text-xs  text-gray-500 font-semibold break-normal dark:text-gray-200">{{ auth.user.first_name }} {{ auth.user.last_name }}</span><br>
                                        <!-- <span class="text-xs text-gray-400 dark:text-gray-400">{{ customerModel.customer.phone_number }}</span> -->
                                    </p>
                                </div>
                                <span class="inline-flex h-7 w-7 items-center justify-center rounded-md bg-orange-100">
                                    <span class="text-xs uppercase font-medium leading-none text-main-color">{{auth.user.first_name[0]}}{{ auth.user.last_name[1] }}</span>
                                </span>
                            </MenuButton>
                        </div>
                        
                        <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                            <MenuItems class="absolute z-50 mt-2 w-60 right-0 rounded-md bg-white dark:bg-gray-800 dark:border-gray-50 shadow-lg dark:shadow-md dark:shadow-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div class="p-2 flex items-center gap-2">
                                    <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                                        <span class="text-base uppercase font-medium leading-none text-main-color">{{auth.user.first_name[0]}}{{ auth.user.last_name[1] }}</span>
                                    </span>
                                    <p class="ltr:pl-3 rtl:pr-3 pt-2 pb-2 w-100 leading-tight">
                                        <span class="text-xs text-gray-500 font-semibold break-normal dark:text-gray-200">{{ auth.user.first_name }} {{ auth.user.last_name }}</span><br>
                                        <span class="text-xs text-gray-400 dark:text-gray-400">{{ auth.user.phone_number }}</span>
                                    </p>
                                </div>

                                <hr class="dark:border-gray-600" role="none">

                                <div aria-labelledby="headlessui-menu-button-3" id="headlessui-menu-items-5" role="menu" tabindex="0" data-headlessui-state="open">
                                    <div role="none">
                                        <router-link to="/profile" class="text-gray-500 group gap-1 flex items-center px-2 py-2 text-xs font-medium dark:text-gray-300 dark:text-gray-200 dark:hover:bg-gray-100 dark:hover:text-secondary" role="none">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="text-gray-400 text-xs group-hover:text-gray-500 ltr:mr-3 rtl:ml-3 flex-shrink-0 h-6 w-6 dark:text-gray-300 dark:text-gray-200 dark:hover:bg-gray-100 dark:hover:text-secondary" role="none"><path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" role="none"></path></svg> 
                                            {{ 'Profile' }}
                                        </router-link>
                                    </div>
                                </div>

                                <!-- <div aria-labelledby="headlessui-menu-button-3" id="headlessui-menu-items-5" role="menu" tabindex="0" data-headlessui-state="open">
                                    <div role="none">
                                        <router-link to="/bookings" class="text-gray-500 group gap-1 flex items-center px-2 py-2 text-xs font-medium dark:text-gray-300 dark:text-gray-200 dark:hover:bg-gray-100 dark:hover:text-secondary" role="none">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400 text-xs group-hover:text-gray-500 ltr:mr-3 rtl:ml-3 flex-shrink-0 h-6 w-6 dark:text-gray-300 dark:text-gray-200 dark:hover:bg-gray-100 dark:hover:text-secondary" aria-hidden="true" role="none"><path d="M15 5l0 2" role="none"></path><path d="M15 11l0 2" role="none"></path><path d="M15 17l0 2" role="none"></path><path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2" role="none"></path></svg>
                                            {{ 'Manage Bookings' }}
                                        </router-link>
                                    </div>
                                </div> -->


                                <div aria-labelledby="headlessui-menu-button-3" id="headlessui-menu-items-5" role="menu" tabindex="0" data-headlessui-state="open">
                                    <div role="none">
                                        <button @click="auth.logout()" class="text-gray-500 group gap-1 flex items-center px-2 py-2 text-xs font-medium dark:text-gray-300 dark:text-gray-200 dark:hover:bg-gray-100 dark:hover:text-secondary" role="none">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="text-gray-400 text-xs group-hover:text-gray-500 ltr:mr-3 rtl:ml-3 flex-shrink-0 h-6 w-6 dark:text-gray-300 dark:text-gray-200 dark:hover:bg-gray-100 dark:hover:text-secondary" role="none"><path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" role="none"></path></svg>
                                            {{ 'Logout' }}
                                        </button>
                                    </div>
                                </div>


                            </MenuItems>
                        </transition>
                    </Menu>
                </div>

                
            </div>
            
        </nav>
        <Dialog
            as="div"
            class="lg:hidden"
            @close="mobileMenuOpen = false"
            :open="mobileMenuOpen"
        >
            <div class="fixed inset-0 z-10" />
            <DialogPanel
                class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
            >
                <div class="flex items-center justify-between">
                    <a href="#" class="-m-1.5 p-1.5">
                        <span class="sr-only">Your Company</span>
                        <img
                            class="h-8 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt=""
                        />
                    </a>
                    <button
                        type="button"
                        class="-m-2.5 rounded-md p-2.5 text-gray-700"
                        @click="mobileMenuOpen = false"
                    >
                        <span class="sr-only">Close menu</span>
                        <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div class="mt-6 flow-root">
                    <div class="-my-6 divide-y divide-gray-500/10">
                        <div class="space-y-2 py-6">
                            <RouterLink
                                :to="'/'"
                                class="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >Home
                            </RouterLink>
                            <RouterLink
                                :to="'/products'"
                                class="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >Products
                            </RouterLink>
                            <RouterLink
                                :to="'/cart'"
                                class="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >Cart
                            </RouterLink>

                            <div class="-mx-3 cursor-pointer  block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 border">Register / Login</div>
                        </div>
                        
                    </div>
                </div>
            </DialogPanel>
        </Dialog>

        
    </header>

    <div>
        <RouterView :key="$route.url" />
    </div>

    <footer aria-labelledby="footer-heading" class="bg-black">
      <h2 id="footer-heading" class="sr-only">Footer</h2>
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="py-20 xl:grid xl:grid-cols-3 xl:gap-8">
          <div class="grid grid-cols-2 gap-8 xl:col-span-2">
            <div class="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
              <div>
                <h3 class="text-sm font-medium text-white">Shop</h3>
                <ul role="list" class="mt-6 space-y-6">
                  <li v-for="item in footerNavigation.shop" :key="item.name" class="text-sm">
                    <a :href="item.href" class="text-gray-300 hover:text-white">{{ item.name }}</a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 class="text-sm font-medium text-white">Company</h3>
                <ul role="list" class="mt-6 space-y-6">
                  <li v-for="item in footerNavigation.company" :key="item.name" class="text-sm">
                    <a :href="item.href" class="text-gray-300 hover:text-white">{{ item.name }}</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
              <div>
                <h3 class="text-sm font-medium text-white">Account</h3>
                <ul role="list" class="mt-6 space-y-6">
                  <li v-for="item in footerNavigation.account" :key="item.name" class="text-sm">
                    <a :href="item.href" class="text-gray-300 hover:text-white">{{ item.name }}</a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 class="text-sm font-medium text-white">Connect</h3>
                <ul role="list" class="mt-6 space-y-6">
                  <li v-for="item in footerNavigation.connect" :key="item.name" class="text-sm">
                    <a :href="item.href" class="text-gray-300 hover:text-white">{{ item.name }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="mt-12 md:mt-16 xl:mt-0">
            <h3 class="text-sm font-medium text-white">Sign up for our newsletter</h3>
            <p class="mt-6 text-sm text-gray-300">The latest deals and savings, sent to your inbox weekly.</p>
            <form class="mt-2 flex sm:max-w-md">
              <label for="email-address" class="sr-only">Email address</label>
              <input id="email-address" type="text" autocomplete="email" required="" class="w-full min-w-0 appearance-none rounded-md border border-white bg-white py-2 px-4 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900" />
              <div class="ml-4 flex-shrink-0">
                <button type="submit" class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900">Sign up</button>
              </div>
            </form>
          </div>
        </div>

        <div class="border-t border-gray-800 py-10">
          <p class="text-sm text-gray-400">Copyright &copy; 2021 Your Company, Inc.</p>
        </div>
      </div>
    </footer>


    <TransitionRoot as="template" :show="authModel">
            <Dialog as="div" class="relative z-50" @close="authModel = false">
                <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>
        
                <div class="fixed inset-0 overflow-hidden">
                    <div class="absolute inset-0 overflow-hidden">
                        <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
                            <DialogPanel class="pointer-events-auto w-screen max-w-md">
                            <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                <div class="px-4 sm:px-6">
                                    <div class="flex items-start justify-between">
                                        <DialogTitle class="text-base font-semibold leading-6 text-gray-900">Login / Register</DialogTitle>
                                        <div class="ml-3 flex h-7 items-center">
                                            <button type="button" class="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" @click="authModel = false">
                                                <span class="absolute -inset-2.5" />
                                                <span class="sr-only">Close panel</span>
                                                <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                

                                <div class="relative mt-6 flex-1 px-4 sm:px-6">
                                    <div class="flex items-center justify-center">  
                                        <UserCircleIcon class="w-32 h-32 text-[#C1AC6B] fill-red-100" />
                                    </div>
                                    <h1 class="text-gray-800 font-bold text-base text-center">Welecome Back</h1>
                                    <div > 
                                        

                                        <div v-if="registerMode" class="my-2 flex items-center gap-2">  
                                            <div class="w-1/2"> 
                                                <label for="firstName" class="block text-sm font-medium leading-6 text-gray-900">First name</label>
                                                <div class="mt-2">
                                                    <input id="firstName" v-model="customer.first_name" name="firstName" placeholder="Given name" type="text" autocomplete="firstName" required="" class="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#C1AC6B] sm:text-sm sm:leading-6" />
                                                </div>
                                            </div>

                                            <div class="w-1/2"> 
                                                <label for="Surname" class="block text-sm font-medium leading-6 text-gray-900">Last name </label>
                                                <div class="mt-2">
                                                    <input id="Surname"  v-model="customer.last_name" name="Surname" placeholder="Last Name" type="text" autocomplete="Surname" required="" class="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#C1AC6B] sm:text-sm sm:leading-6" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="my-2">
                                            <label for="phone" class="block text-sm font-medium leading-6 text-gray-900">Phone</label>
                                            <div class="mt-2">
                                                <input id="phone" v-model="customer.phone_number" name="phone" placeholder="Phone" type="text" autocomplete="phone" required="" class="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#C1AC6B] sm:text-sm sm:leading-6" />
                                            </div>
                                        </div>

                                        <div class="my-2">
                                            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                            <div class="mt-2">
                                                <input id="password" v-model="customer.password" name="phone" placeholder="password" type="password" autocomplete="password" required="" class="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#C1AC6B] sm:text-sm sm:leading-6" />
                                            </div>
                                        </div>
                                        <div class="my-2"> 
                                            <button  type="submit" @click="submit()" :class="{'bg-gray-500':isLoading,'bg-[#C1AC6B]':!isLoading}" class="flex w-full justify-center rounded-md px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#d6b44e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d6b44e]">
                                                <span v-if="IsSubmitting" class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                                    <ArrowPathIcon class="h-5 w-5 text-white" aria-hidden="true" />
                                                </span>
                                                {{ 'Sign in'}}
                                            </button>
                                        </div>

                                        <span class="text-sm text-gray-800 mt-4 pt-4" v-if="!registerMode">you don't have account ! <span class="font-semibold text-gray-950 cursor-pointer" @click="registerMode = true">Register</span> </span>
                                        
                                        <span class="text-sm text-gray-800 mt-4 pt-4" v-else>you have account ! <span class="font-semibold text-gray-950 cursor-pointer" @click="registerMode = false">Sign in</span> </span>

                                    </div>
                                </div>
                            </div>
                            </DialogPanel>
                        </TransitionChild>
                        </div>
                    </div>
                </div>
            </Dialog>
    </TransitionRoot>


    <TransitionRoot as="template" :show="cartPopUp">
            <Dialog as="div" class="relative z-50" @close="cartPopUp = false">
                <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>
        
                <div class="fixed inset-0 overflow-hidden">
                    <div class="absolute inset-0 overflow-hidden">
                        <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
                            <DialogPanel class="pointer-events-auto w-screen max-w-md">
                            <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                <div class="px-4 sm:px-6">
                                    <div class="flex items-start justify-between">
                                        <DialogTitle class="text-base font-semibold leading-6 text-gray-900">Cart </DialogTitle>
                                        <div class="ml-3 flex h-7 items-center">
                                            <button type="button" class="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" @click="cartPopUp = false">
                                                <span class="absolute -inset-2.5" />
                                                <span class="sr-only">Close panel</span>
                                                <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                

                                <div class="relative mt-6 flex-1 px-4 sm:px-6">
                                    <div class="max-w-lg mx-auto p-4 space-y-4">
                                        <div v-if='cartModel.cart.length > 0'> 
                                            <!-- Cart Item -->
                                            <div class="flex items-center justify-between bg-white p-3 border-b" v-for="item in cartModel.cart" :key="item.product_id">
                                                <img :src="item.product.image_url" class="w-16 h-16 rounded-md object-cover" />

                                                <div class="flex-1 ml-3">
                                                    <h2 class="font-semibold text-sm">{{item.product.title}}</h2>
                                                    <p class="text-gray-600 text-sm" v-if="item.product.offers.length == 0">Price: {{item.price}} MAD</p>
                                                    <div v-else class="flex items-center gap-2"> 
                                                        <p class="text-gray-600 text-sm line-through">{{ item.product.price }} MAD</p>
                                                        <p class="text-gray-800 text-sm font-semibold">{{ item.price }} MAD</p>
                                                    </div>

                                                    <!-- Qty -->
                                                    <div class="flex items-center mt-2">
                                                        <button class="px-3 py-1 bg-gray-200 rounded-l" @click=" cartModel.disincrement(item)">–</button>
                                                        <span class="px-4 py-1 bg-gray-100">{{ item.quantity }}</span>
                                                        <button class="px-3 py-1 bg-gray-200 rounded-r" @click=" cartModel.increment(item)">+</button>
                                                    </div>
                                                </div>
                                            </div>


                                            <!-- TOTAL -->
                                            <div class="bg-white p-4 mt-2  text-right">
                                                <p class="text-lg font-semibold">Total : {{cartModel.cartTotal }} MAD</p>

                                                <button
                                                    @click='checkout()'
                                                    class="block w-full rounded-sm py-2 text-center mt-2 px-3 text-base font-semibold leading-7 text-white bg-primary"
                                                >Checkout
                                                </button>
                                            </div>
                                        </div>

                                        <div v-else> 
                                            <div class="flex flex-col items-center justify-center text-center py-20">
                                                <svg class="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" stroke-width="1.5"
                                                    viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25h9.75m-9.75 0L5.106 5.272A1.125 1.125 0 0 0 4.02 4.5H2.25m5.25 9.75 1.384 5.165c.132.492.577.835 1.087.835h6.059m0 0h1.386c.51 0 .955-.343 1.087-.835l1.884-7.03M17.03 20.25a1.875 1.875 0 1 1-3.75 0m3.75 0a1.875 1.875 0 1 1-3.75 0" />
                                                </svg>

                                                <h2 class="mt-6 text-lg font-semibold text-gray-700">
                                                    Votre panier est vide
                                                </h2>

                                                <p class="mt-1 text-gray-500 text-sm">
                                                    Ajoutez des produits pour commencer votre commande.
                                                </p>
                                            </div>
                                        </div>

                                    </div>

                                    
                                </div>
                            </div>
                            </DialogPanel>
                        </TransitionChild>
                        </div>
                    </div>
                </div>
            </Dialog>
    </TransitionRoot>

    <a
    :href="whatsappUrl"
    target="_blank"
    rel="noopener"
    class="fixed bottom-6 right-6 z-50
           flex items-center gap-3
           px-5 py-3 rounded-full
           bg-[#25D366]
           text-white font-semibold
           shadow-lg
           hover:shadow-xl
           hover:scale-105
           transition-all duration-300
           animate-float-x "
  >
    <span class="relative">
      <ChatBubbleOvalLeftEllipsisIcon class="w-6 h-6" />

      <!-- Pulse ring -->
      <span
        class="absolute inset-0 rounded-full
               bg-[#25D366]
               opacity-40 blur
               animate-ping">
      </span>
    </span>

    <span class="hidden sm:inline">+212681495580</span>
  </a>
    
   <div class="bg-white w-full fixed bottom-0 left-0 block lg:hidden xl:hidden
   
   
   p-4 mt-2  text-right" v-if="cartModel.cartCount > 0">
        <div class="flex w-full items-center justify-between">
            <p class="text-lg font-semibold">Total :</p>
            <p class="text-lg font-semibold">{{cartModel.cartTotal }} MAD</p>
        </div>

        <button
            @click='checkout()'
            class="block w-full rounded-sm py-2 text-center mt-2 px-3 text-base font-semibold leading-7 text-white bg-primary"
        >Checkout
        </button>
    </div>

</template>

<script setup>
import { ref } from "vue";
import {  useRouter } from 'vue-router'


const router = useRouter()
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    TransitionChild,
    TransitionRoot,
    Menu,
    MenuButton,
    MenuItems,
} from "@headlessui/vue";
import {
    Bars3Icon,
    MagnifyingGlassIcon,
    ShoppingBagIcon,
    XMarkIcon,
    UserCircleIcon,
    ArrowPathIcon
} from "@heroicons/vue/24/outline";
import { ChevronDownIcon, PlusIcon } from "@heroicons/vue/20/solid";

import { useCartStore } from "@/stores/client/cart";
import { useAuthStore } from "@/stores/client/auth"
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/vue/24/solid";

const phone = "212600000000"; // Morocco format (no +)
const message = encodeURIComponent("Hello, I need some help");

const whatsappUrl = `https://wa.me/${phone}?text=${message}`;

const footerNavigation = {
  shop: [
    { name: 'Bags', href: '#' },
    { name: 'Tees', href: '#' },
    { name: 'Objects', href: '#' },
    { name: 'Home Goods', href: '#' },
    { name: 'Accessories', href: '#' },
  ],
  company: [
    { name: 'Who we are', href: '#' },
    { name: 'Sustainability', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Privacy', href: '#' },
  ],
  account: [
    { name: 'Manage Account', href: '#' },
    { name: 'Returns & Exchanges', href: '#' },
    { name: 'Redeem a Gift Card', href: '#' },
  ],
  connect: [
    { name: 'Contact Us', href: '#' },
    { name: 'Twitter', href: '#' },
    { name: 'Instagram', href: '#' },
    { name: 'Pinterest', href: '#' },
  ],
}

const mobileMenuOpen = ref(false)
const authModel = ref(false)
const isLoading = ref(false)
const IsSubmitting = ref(false)
const cartPopUp = ref(false)
const cartModel = useCartStore()
const auth = useAuthStore()


const registerMode= ref(true)
const customer = ref({
    first_name:'',
    last_name:'',
    phone_number:'',
    password:''
})

const checkout = () => {
    cartPopUp.value = false

    router.push('/checkout')

}
const submit = async () => {
    // console.log(auth.user.first_name)
    isLoading.value = true
    IsSubmitting.value = true

    // login or register
    if(!registerMode.value){
        await auth.login({
            phone_number:customer.value.phone_number,
            password:customer.value.password
        });
    }

    else {
        await auth.register(customer.value);
    }

    isLoading.value = false
    IsSubmitting.value = false
    authModel.value = false
}


</script>
