<template>
    <section
        aria-labelledby="category-heading"
        class="pt-24 sm:pt-32 xl:mx-auto xl:max-w-7xl xl:px-8"
    >
        <div
            class="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0"
        >
            <h2
                id="category-heading"
                class="text-2xl font-bold tracking-tight text-gray-900"
            >
                Shop by Category
            </h2>
            <a
                href="#"
                class="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
            >
                Browse all categories
                <span aria-hidden="true"> &rarr;</span>
            </a>
        </div>

        <div class="mt-4 flow-root">
            <div class="-my-2">
                <div
                    class="relative box-content h-80 overflow-x-auto py-2 xl:overflow-visible"
                >
                    <div
                        class="min-w-screen-xl absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0"
                    >
                        <RouterLink
                            v-for="category in categoryModel.categories"
                            :key="category.id"
                            :to="'/categories/' + category.id"
                            class="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
                        >
                            <span
                                aria-hidden="true"
                                class="absolute inset-0"
                            >
                                <img
                                    :src="category.image_url == null ? '/default.png' : category.image_url"
                                    alt=""
                                    class="h-full w-full object-cover object-center"
                                />
                            </span>
                            <span
                                aria-hidden="true"
                                class="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                            />
                            <span
                                class="relative mt-auto text-center text-xl font-bold text-white"
                                >{{ category.name }}</span
                            >
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-6 px-4 sm:hidden">
            <a
                href="#"
                class="block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
            >
                Browse all categories
                <span aria-hidden="true"> &rarr;</span>
            </a>
        </div>
    </section>
</template>

<script setup>

import { useCategoryStore } from '@/stores/client/categories'
import { onMounted , ref} from 'vue'


const categoryModel = useCategoryStore()
const isLoading = ref(false)

onMounted(
    async () => {
        await categoryModel.getAll()
        isLoading.value = false
    }
)


</script>