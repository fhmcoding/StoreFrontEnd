<template>
    <div class=" relative flex items-start  bg-gray-200">
        <div class=" sticky left-0 top-0 h-screen w-2/6 bg-white border-r border-gray-300 "> 
            <div class="flex items-center justify-between py-3 px-6 border-b border-gray-200"> 
                <div  class="group block shrink-0">
                    <div class="flex items-center">
                    <div>
                        <img class="inline-block size-9 rounded-full outline -outline-offset-1 outline-black/5" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                    </div>
                    <div class="ml-3">
                        <p class="text-sm font-medium text-gray-700 group-hover:text-gray-900">Tom Cook</p>
                        <p class="text-xs font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
                    </div>
                    </div>
                </div>
                <button
                    class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition"
                    >
                    <!-- Logout Icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        class="w-5 h-5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor">
                        <path stroke-linecap="round" 
                            stroke-linejoin="round" 
                            stroke-width="2" 
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
                    </svg>

                    Logout
                </button>
            </div>

            <div>
                <section aria-labelledby="cart-heading">
                    <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>

                    <ul role="list"  v-if='caisseModel.cart.length > 0' class="divide-y divide-gray-200 px-4 sm:px-6 lg:px-8">
                      <li v-for="item in caisseModel.cart" :key="item.product_id" class="flex py-8 text-sm sm:items-center">
                        <div class="ml-4 grid flex-auto grid-cols-1 grid-rows-1 items-start gap-x-5 gap-y-3 sm:ml-6 sm:flex sm:items-center sm:gap-0">
                          <div class="row-end-1 flex-auto sm:pr-6">
                            <h3 class="font-medium text-gray-900">
                              {{ item.product.title }}
                            </h3>
                            <p class="mt-1 text-gray-500">{{ item.price }}</p>
                          </div>
                          <div class="flex items-center sm:block sm:flex-none sm:text-center">
                            <div class="flex items-center mt-2">
                                <button class="px-4 py-2 bg-gray-200 rounded-l font-semibold" @click=" caisseModel.disincrement(item)">–</button>
                                <span class="px-4 py-2 bg-gray-100 font-semibold">{{ item.quantity }}</span>
                                <button class="px-4 py-2 bg-gray-200 rounded-r font-semibold" @click=" caisseModel.increment(item)">+</button>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>

                    <div class="flex flex-col items-center justify-center text-center py-20" v-else>
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
                </section>
            </div>
        </div>
        <div class="w-4/6 "> 
            <div class="bg-white flex items-center justify-between">
                <div class="flex items-center gap-4 p-4 border-b border-gray-200">
                    <div class="relative">
                        <label for="barcode" class="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900">Barcode</label>
                        <input type="number" name="barcode" id="barcode" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="123 45678 99" />
                    </div>
                    <div class="relative">
                        <label for="title" class="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900">Name</label>
                        <input type="text" name="title" id="title" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="Product name" />
                    </div>
                    <div class="relative">
                        <label for="location" class="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900">Brand</label>
                        <div class=" grid grid-cols-1">
                            <select id="location" name="location" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6">
                                <option v-for="(brand,index) in brandModel.brands" :key="index" :value="brand.id"> {{ brand.name  }}</option>
                            </select>
                            <ChevronDownIcon class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" aria-hidden="true" />
                        </div>
                    </div>
                    <button
                        class="p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition"
                        title="Refresh"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-refresh-ccw w-5 h-5  text-white"><polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path></svg>
                    </button>
                </div>

                <routerLink v-if="auth.hasPermission('product-create')" to="/backoffice/products/create" type="button" class="text-primary border-primary border bg-white hover:bg-white/15 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2">
                    <PlusCircleIcon class="h-5 mr-1" aria-hidden="true" />
                    Add Product
                </routerLink>
            </div>

            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-5"> 
                <div class="col-span-1 flex flex-col divide-y divide-gray-200  bg-white text-center shadow-sm" v-for="(product,index) in productModel.products" :key="index">
                    <div class="flex flex-1 flex-col p-8">
                        <span class="text-sm text-gray-500">{{product.product_code}}</span>
                        <h1>{{ product.name }}</h1>
                        
                    </div>
                    <div>
                        <span class="text-lg font-bold">{{}} dh</span>
                        <button class="flex max-w-xs text-sm flex-1 items-center justify-center  border border-transparent bg-primary py-1 px-8 xl:text-base lg:text-base font-medium text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full">ajouter</button>
                    </div>

                </div>
            </div>
        </div>
    </div>


</template>


<script setup>
import { ref,onMounted } from 'vue'

import { useCaisseStore } from "@/stores/backoffice/caisse";
import { useBrandStore } from '@/stores/backoffice/brands'
import { useProductStore } from '@/stores/backoffice/products'
import { useAuthStore } from '@/stores/backoffice/auth'
import { useAlertStore } from '@/stores/alert'

import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { ChevronDownIcon,PlusCircleIcon } from '@heroicons/vue/16/solid'

const caisseModel = useCaisseStore()
const brandModel = useBrandStore()
const productModel = useProductStore()
const auth = useAuthStore()
const alertModel = useAlertStore()

onMounted(
    async () => {
        await brandModel.getAll()
        await productModel.getList()
    }
)



</script>
