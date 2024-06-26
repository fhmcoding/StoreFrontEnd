<template>
    <div class="bg-white">
        <div
            class="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"
        >
            <div class="md:flex md:items-center md:justify-between">
                <h2 class="text-2xl font-bold tracking-tight text-gray-900">
                    Trending products
                </h2>
                <RouterLink :to='"/products"'
                    class="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block"
                >
                    Shop the collection
                    <span aria-hidden="true"> &rarr;</span>
                </RouterLink>
            </div>

            <div
                class="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8"
            >
                <Product
                    v-for="product in productModel.products"
                    :key="product.id"
                    :product='product'
                    class="group relative mb-4"
                />
            </div>

            <div class="mt-8 text-sm md:hidden">
                <a
                    href="#"
                    class="font-medium text-indigo-600 hover:text-indigo-500"
                >
                    Shop the collection
                    <span aria-hidden="true"> &rarr;</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>

import Product from '@/components/Product.vue'
import { useProductStore } from "@/stores/client/products";
import { onMounted, ref } from "vue";

const productModel = useProductStore();
const isLoading = ref(false);

onMounted(async () => {
    await productModel.getAll();
    isLoading.value = false;
});
</script>
