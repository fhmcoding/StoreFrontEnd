<template>
    <div class="bg-white">
        <main
            class="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8"
            v-if="!isLoading"
        >
            <div class="mx-auto max-w-2xl lg:max-w-none">
                <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                    <TabGroup as="div" class="flex flex-col-reverse p-[20x]">
                        <div
                            class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none"
                        >
                            <TabList class="grid grid-cols-4 gap-6">
                                <Tab
                                    v-for="image in productModel.product.images"
                                    :key="image.id"
                                    class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                                    v-slot="{ selected }"
                                >
                                    <span class="sr-only">
                                        {{ image.name }}
                                    </span>
                                    <span
                                        class="absolute inset-0 overflow-hidden rounded-md"
                                    >
                                        <img
                                            :src="image.url"
                                            alt=""
                                            class="h-full w-full object-cover object-center"
                                        />
                                    </span>
                                    <span
                                        :class="[
                                            selected
                                                ? 'ring-indigo-500'
                                                : 'ring-transparent',
                                            'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2',
                                        ]"
                                        aria-hidden="true"
                                    />
                                </Tab>
                            </TabList>
                        </div>

                        <TabPanels class="aspect-w-1 aspect-h-1 w-full">
                            <TabPanel
                                v-for="image in productModel.product.images"
                                :key="image.id"
                            >
                                <img
                                    :src="image.url"
                                    :alt="image.url"
                                    class="h-full w-full object-cover object-center sm:rounded-lg"
                                />
                            </TabPanel>
                        </TabPanels>
                    </TabGroup>

                    <!-- Product info -->
                    <div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                        
                        <div class="flex items-start justify-between">
                            <div>
                                <h1 class="text-3xl font-bold tracking-tight text-gray-900">{{ productModel.product.name }}</h1>
                                <h5 class="text-gray-400 font-semibold">{{ productModel.product.category.name }}</h5>
                            </div>
                            <div>
                                <img :src="productModel.product.brand.image_url" alt="" srcset="" class="w-[100px] h-[100px]">
                            </div>
                        </div>

                        <div class="mt-3 border border-gray-200 rounded-md">
                           <div class="p-2 border-b flex items-center justify-between" v-for="(p,index) in productModel.product.products" :key="index"> 
                                <span class="text-md">{{ productModel.product.name }} <span class="font-semibold">{{p.name}} </span>  </span>
                                <div class="grid xl:flex lg:flex text-center items-center gap-2">
                                    <div>
                                        <span class="font-bold text-primary" v-if="p.offers.length == 0">{{p.price }} DH</span> 
                                        <span v-else class="grid text-end">
                                            <span class="font-semibold text-gray-600 line-through">{{ p.price }}</span>
                                            <span class="font-bold text-primary" >{{p.offers[0].pivot.price }} DH</span> 

                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        @click='cartModel.add({...productModel.product,...p,title: `${productModel.product.name} ${p.name}` })'  
                                        v-show="!cartModel.inCart(p.product_code)" 
                                        class="flex max-w-xs text-sm flex-1 items-center justify-center rounded-md border border-transparent bg-primary py-2 px-8 xl:text-base lg:text-base font-medium text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                                        
                                    >
                                        Ajouter
                                    </button>

                                    <div class="flex items-center " v-if="cartModel.inCart(p.product_code)" >
                                        <button class="px-3 py-2 bg-gray-200 rounded-l" @click="cartModel.disincrement(cartModel.cart.find((e) => e.product_id == p.product_code))" >–</button>
                                        <span class="px-4 py-2 bg-gray-100">{{cartModel.cart.find((e) => e.product_id == p.product_code).quantity }}</span>
                                        <button class="px-3 py-2 bg-gray-200 rounded-r" @click="cartModel.increment(cartModel.cart.find((e) => e.product_id == p.product_code))">+</button>
                                    </div>
                                </div>
                           </div>
                        </div>


                        <div class="mt-6">
                            <h3 class="sr-only">Description</h3>

                            <div
                                class="space-y-6 text-base text-gray-700"
                                v-html="productModel.product.description"
                            />
                        </div>

                        
                    </div>
                </div>

                <section
                    aria-labelledby="related-heading"
                    class="mt-10 border-t border-gray-200 py-16 px-4 sm:px-0"
                >
                    <h2
                        id="related-heading"
                        class="text-xl font-bold text-gray-900"
                    >
                        Customers also bought
                    </h2>
                    <div
                        class="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
                    >
                        <div
                            v-for="product in productModel.products"
                            :key="product.id"
                        >
                            <Product :product="product" />
                        </div>
                    </div>
                </section>
            </div>
        </main>

        <div class="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8" v-else> 
            <div class="mx-auto max-w-2xl lg:max-w-none">
                <!--- LOADING  --->
                <div class="animate-pulse">
                    <div class="lg:grid lg:grid-cols-2 lg:gap-x-8">

                    <!-- Image skeleton -->
                    <div>
                        <div class="bg-gray-200 rounded-lg h-[420px] w-full"></div>

                        <div class="grid grid-cols-4 gap-4 mt-4">
                        <div
                            v-for="i in 4"
                            :key="i"
                            class="bg-gray-200 h-20 rounded"
                        ></div>
                        </div>
                    </div>

                    <!-- Product info skeleton -->
                    <div class="space-y-6 mt-10 lg:mt-0">
                        <div class="bg-gray-200 h-8 w-3/4 rounded"></div>
                        <div class="bg-gray-200 h-4 w-1/3 rounded"></div>

                        <div class="space-y-3">
                        <div
                            v-for="i in 4"
                            :key="i"
                            class="bg-gray-200 h-12 rounded"
                        ></div>
                        </div>

                        <div class="space-y-2">
                        <div
                            v-for="i in 3"
                            :key="i"
                            class="bg-gray-200 h-4 rounded"
                        ></div>
                        </div>
                    </div>

                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { useProductStore } from "@/stores/client/products";
import { useCartStore } from "@/stores/client/cart";
import Product from "@/components/Product.vue";
import { ref, onMounted,watch  } from "vue";
import { useRoute } from "vue-router";

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
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
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
    HeartIcon,
    MagnifyingGlassIcon,
    MinusIcon,
    PlusIcon,
    ShoppingBagIcon,
    UserIcon,
    XMarkIcon,
} from "@heroicons/vue/24/outline";

import { StarIcon } from "@heroicons/vue/20/solid";

const open = ref(false)
const isLoading = ref(true)
const productModel = useProductStore()
const cartModel = useCartStore()
const route = useRoute()

// onMounted(async () => {
//     isLoading.value = true;
//     await productModel.getById(route.params.id);
//     await productModel.getAll();
//     isLoading.value = false;
// });


const loadProduct = async (id) => {
    isLoading.value = true;
    await productModel.getById(id);
    await productModel.getAll();
    isLoading.value = false;
};

onMounted(() => {
    loadProduct(route.params.id);
});

watch(
    () => route.params.id,
    (newId, oldId) => {
        if (newId !== oldId) {
            loadProduct(newId);
        }
    }
);


// 
</script>
