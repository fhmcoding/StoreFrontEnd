<template>
    <div class="bg-white">
        <div>
            <TransitionRoot as="template" :show="mobileFiltersOpen">
                <Dialog
                    as="div"
                    class="relative z-40 lg:hidden"
                    @close="mobileFiltersOpen = false"
                >
                    <TransitionChild
                        as="template"
                        enter="transition-opacity ease-linear duration-300"
                        enter-from="opacity-0"
                        enter-to="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leave-from="opacity-100"
                        leave-to="opacity-0"
                    >
                        <div class="fixed inset-0 bg-black bg-opacity-25" />
                    </TransitionChild>

                    <div class="fixed inset-0 z-40 flex">
                        <TransitionChild
                            as="template"
                            enter="transition ease-in-out duration-300 transform"
                            enter-from="translate-x-full"
                            enter-to="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leave-from="translate-x-0"
                            leave-to="translate-x-full"
                        >
                            <DialogPanel
                                class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl"
                            >
                                <div
                                    class="flex items-center justify-between px-4"
                                >
                                    <h2
                                        class="text-lg font-medium text-gray-900"
                                    >
                                        Filters
                                    </h2>
                                    <button
                                        type="button"
                                        class="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                                        @click="mobileFiltersOpen = false"
                                    >
                                        <span class="sr-only">Close menu</span>
                                        <XMarkIcon
                                            class="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>

                                <!-- Filters -->
                                <form class="mt-4">
                                    <Disclosure
                                        as="div"
                                        v-for="section in filters"
                                        :key="section.name"
                                        class="border-t border-gray-200 pt-4 pb-4"
                                        v-slot="{ open }"
                                    >
                                        <fieldset>
                                            <legend class="w-full px-2">
                                                <DisclosureButton
                                                    class="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500"
                                                >
                                                    <span
                                                        class="text-sm font-medium text-gray-900"
                                                        >{{
                                                            section.name
                                                        }}</span
                                                    >
                                                    <span
                                                        class="ml-6 flex h-7 items-center"
                                                    >
                                                        <ChevronDownIcon
                                                            :class="[
                                                                open
                                                                    ? '-rotate-180'
                                                                    : 'rotate-0',
                                                                'h-5 w-5 transform',
                                                            ]"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                </DisclosureButton>
                                            </legend>
                                            <DisclosurePanel
                                                class="px-4 pt-4 pb-2"
                                            >
                                                <div class="space-y-6">
                                                    <div
                                                        v-for="(
                                                            option, optionIdx
                                                        ) in section.options"
                                                        :key="option.value"
                                                        class="flex items-center"
                                                    >
                                                        <input
                                                            :id="`${section.id}-${optionIdx}-mobile`"
                                                            :name="`${section.id}[]`"
                                                            :value="
                                                                option.value
                                                            "
                                                            type="checkbox"
                                                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                        <label
                                                            :for="`${section.id}-${optionIdx}-mobile`"
                                                            class="ml-3 text-sm text-gray-500"
                                                            >{{
                                                                option.label
                                                            }}</label
                                                        >
                                                    </div>
                                                </div>
                                            </DisclosurePanel>
                                        </fieldset>
                                    </Disclosure>
                                </form>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </Dialog>
            </TransitionRoot>

            <div class="border-b border-gray-200">
                <nav
                    aria-label="Breadcrumb"
                    class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
                >
                    <ol role="list" class="flex items-center space-x-4 py-4">
                        <li>
                            <div class="flex items-center">
                                <RouterLink :to='"/"' class="mr-4 text-sm font-medium text-gray-900">Home</RouterLink>
                                <svg
                                    viewBox="0 0 6 20"
                                    aria-hidden="true"
                                    class="h-5 w-auto text-gray-300"
                                >
                                    <path
                                        d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>
                        </li>
                        
                        <li class="text-sm">
                            <RouterLink :to='"/products"' aria-current="page" class="font-medium text-gray-500 hover:text-gray-600">Products</RouterLink>
                        </li>
                    </ol>
                </nav>
            </div>

            <main class="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
                
                <div
                    class="pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4"
                >
                    <aside>
                        <h2 class="sr-only">Filters</h2>

                        <button
                            type="button"
                            class="inline-flex items-center lg:hidden"
                            @click="mobileFiltersOpen = true"
                        >
                            <span class="text-sm font-medium text-gray-700"
                                >Filters</span
                            >
                            <PlusIcon
                                class="ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
                                aria-hidden="true"
                            />
                        </button>

                        <div class="hidden lg:block">
                            <form class="space-y-10 divide-y divide-gray-200">
                                <div>
                                    <fieldset>
                                        <legend class="block text-sm font-medium text-gray-900">Search</legend>
                                        <div class="space-y-3 pt-3">
                                            <input
                                                id="search"
                                                name="search"
                                                v-model="search"
                                                type="text"
                                                placeholder="search for something"
                                                class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />  
                                        </div>
                                    </fieldset>
                                </div>
                                <div class="py-3">
                                    <fieldset>
                                        <legend class="block text-sm font-medium text-gray-900">Brands</legend>
                                        <div class="space-y-3 pt-6">
                                            <div
                                                v-for="brand in brandModel.brands"
                                                :key="brand.id"
                                                class="flex items-center"
                                            >
                                                <input
                                                    :id="`brand-${brand.id}`"
                                                    :name="`brand[]`"
                                                    :value="brand.name"
                                                    v-model="selected_brands"
                                                    type="checkbox"
                                                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                                <label
                                                    :for="`brand-${brand.id}`"
                                                    class="ml-3 text-sm text-gray-600"
                                                    >{{ brand.name }}</label
                                                >
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                                <div class="py-4">
                                    <fieldset>
                                        <legend class="block text-sm font-medium text-gray-900">Categories</legend>
                                        <div class="space-y-3 pt-6">
                                            <div
                                                v-for="category in categoryModel.categories"
                                                :key="category.id"
                                                class="flex items-center"
                                            >
                                                <input
                                                    :id="`category-${category.id}`"
                                                    :name="`category[]`"
                                                    :value="category.name"
                                                    v-model='selected_categories'
                                                    type="checkbox"
                                                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                                <label
                                                    :for="`category-${category.id}`"
                                                    class="ml-3 text-sm text-gray-600"
                                                    >{{ category.name }}</label
                                                >
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </form>
                        </div>
                    </aside>

                    <section
                        aria-labelledby="product-heading"
                        class="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3"
                    >
                        <h2 id="product-heading" class="sr-only">Products</h2>
                        
                        <div class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3" v-if='!isLoading'>
                            <div
                                v-for="product in productModel.products"
                                :key="product.id"
                                class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                            >
                               <Product :product='product' />
                            </div>
                        </div>
                        <div v-else>
                            <h1>Is Loading</h1>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch} from "vue";

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
} from "@heroicons/vue/24/outline";
import { ChevronDownIcon, PlusIcon } from "@heroicons/vue/20/solid";

import Product from '@/components/Product.vue'
import { useProductStore } from "@/stores/client/products";
import { useCategoryStore } from '@/stores/client/categories'
import { useBrandStore } from '@/stores/client/brands'
import { useRoute, useRouter } from 'vue-router'
    


const mobileFiltersOpen = ref(false)
const brandModel = useBrandStore()
const categoryModel = useCategoryStore()
const productModel = useProductStore()
const isLoading = ref(true);

const selected_categories = ref([])
const selected_brands = ref([])
const search = ref('')

const route = useRoute()
const router = useRouter()


watch(selected_categories, async () => {
    router.push({
        name:'products',
        query:{
            selected_categories:selected_categories.value,
            selected_brands:selected_brands.value
        }
    })
})

watch(selected_brands, async () => {
    router.push({
        name:'products',
        query:{
            selected_categories:selected_categories.value,
            selected_brands:selected_brands.value
        }
    })
})

watch(search,async () => {
    router.push({
        name:'products',
        query:{
            search:search.value
        }
    })
})

watch(route, async () => {
    isLoading.value = true
    await productModel.getAll(getFilterQuery())
    isLoading.value = false
})

const getFilterQuery =  () => {
    let filter = ''
    filter += route.query.selected_categories != undefined ? 'filter[category.name]='+route.query.selected_categories.reduce((accumulator, currentValue) => accumulator+currentValue+',','') : ''
    filter += route.query.selected_categories != undefined ? '&filter[brand.name]='+route.query.selected_brands.reduce((accumulator, currentValue) => accumulator+currentValue+',','') : ''
    filter += route.query.search != undefined ? '&filter[name]='+route.query.search : '';
    return filter
}

onMounted(async () => {
    await productModel.getAll()
    await categoryModel.getAll()
    await brandModel.getAll()

    selected_categories.value = route.query.selected_categories != undefined ? [route.query.selected_categories] != undefined : [];
    selected_brands.value = route.query.selected_brands != undefined ? [route.query.selected_brands] != undefined : [];
   
    
    isLoading.value = false
});

</script>
