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
            class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
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
            <div class="hidden lg:flex lg:gap-x-12">
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

                
                
                <div @click="authModel = true" class="text-sm font-semibold leading-6 text-gray-900 cursor-pointer">Login</div>

                <div @click="cartPopUp = true" class="flex items-center gap-1 text-sm font-semibold leading-6 text-gray-900 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                    <span>Cart</span> 
                    <span class="bg-orange-500 text-xs w-6 h-6 font-semibold text-white flex items-center justify-center rounded-full">{{ cartModel.cartCount }}</span>
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
                                                    <p class="text-gray-600 text-sm">Price: {{item.price}} MAD</p>

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

                                                <RouterLink
                                                    :to="'/checkout'"
                                                    class="block rounded-sm py-2 text-center mt-2 px-3 text-base font-semibold leading-7 text-white bg-primary"
                                                >Checkout
                                                </RouterLink>
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

</template>

<script setup>
import { ref } from "vue";
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

const submit = () => {
    isLoading.value = true
    IsSubmitting.value = true
}
const registerMode= ref(true)
const customer = ref({
    first_name:'',
    last_name:'',
    phone_number:'',
    password:''
})

</script>
