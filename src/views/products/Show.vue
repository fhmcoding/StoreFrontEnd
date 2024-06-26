<template>
    <div class="bg-white">
        <main
            class="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8"
            v-if="!isLoading"
        >
            <div class="mx-auto max-w-2xl lg:max-w-none">
                <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                    <TabGroup as="div" class="flex flex-col-reverse">
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
                                <img :src="productModel.product.brand.image_url" alt="" srcset="">
                            </div>
                        </div>

                        <div class="mt-3">
                            <h2 class="sr-only">Product information</h2>
                            <p class="text-3xl tracking-tight text-gray-900">
                                {{ productModel.product.price }} {{'MAD'}}
                            </p>
                        </div>

                        <!-- Reviews -->
                        <div class="mt-3">
                            <h3 class="sr-only">Reviews</h3>
                            <div class="flex items-center">
                                <div class="flex items-center">
                                    <StarIcon
                                        v-for="rating in [0, 1, 2, 3, 4]"
                                        :key="rating"
                                        :class="[
                                            productModel.product.rating > rating
                                                ? 'text-indigo-500'
                                                : 'text-gray-300',
                                            'h-5 w-5 flex-shrink-0',
                                        ]"
                                        aria-hidden="true"
                                    />
                                </div>
                                <p class="sr-only">
                                    {{ productModel.product.rating }} out of 5
                                    stars
                                </p>
                            </div>
                        </div>

                        <div class="mt-6">
                            <h3 class="sr-only">Description</h3>

                            <div
                                class="space-y-6 text-base text-gray-700"
                                v-html="productModel.product.description"
                            />
                        </div>

                        <div class="mt-6">
                            <div class="mt-10 flex">
                                <button
                                    type="button"
                                    @click='cartModel.add(productModel.product)'
                                    class="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                                    v-show="!cartModel.inCart(productModel.product.id)" 
                                >
                                    Add to bag
                                </button>


                                <RouterLink
                                    :to="'/cart'"
                                    type="button"
                                    class="flex max-w-xs flex-1 items-center justify-center rounded-md border  border-indigo-600 py-3 px-8 text-base font-medium text-indigo-600 hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                                    v-show="cartModel.inCart(productModel.product.id)" 
                                >
                                    Go to Cart Page
                                </RouterLink>

                            </div>
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
    </div>
</template>

<script setup>
import { useProductStore } from "@/stores/client/products";
import { useCartStore } from "@/stores/client/cart";
import Product from "@/components/Product.vue";
import { ref, onMounted } from "vue";
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

onMounted(async () => {
    isLoading.value = true;
    await productModel.getById(route.params.id);
    await productModel.getAll();
    isLoading.value = false;
});
</script>
