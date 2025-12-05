<template>
    <div class="group relative mb-4 hover:shadow-md h-auto  border border-primary hover:border hover:border-[#C1AC6B]">
        <div
            class="h-56 w-full overflow-hidden  bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80"
        >
            <img
                :src="
                    product.image_url == null
                        ? '/default.png'
                        : product.image_url
                "
                :alt="product.name"
                class="h-full w-full object-cover object-center"
            />
        </div>
        <div class="text-center">
            <h3 class="px-1 mt-4 text-sm text-gray-700">
                <RouterLink :to="'/products/' + product.id">
                    <span class="absolute inset-0" />
                    {{ product.name.length > 35 ? product.name.slice(0, 35) + '...' : product.name }}
                </RouterLink>
            </h3>
            <p class="mt-1 px-1  text-sm text-gray-500 font-semibold">{{ product.brand == null ? "" : product.brand.name }}</p>
            <div class="flex items-center gap-2 justify-center mt-1">
                <span class="border border-primary text-primary font-semibold rounded-sm p-1 text-xs" v-for="(p,index) in product.products" :key="index">{{ p.name }}</span>
            </div>
            <p class="mt-1 px-1  text-sm font-medium text-gray-900">{{ product.products[0].price +' MAD'}}</p>
            <div class="w-full">
                <span class=" gap-2 justify-center bg-[#C1AC6B] hover:bg-[#9c8749] 
            flex items-center text-white py-2 w-full text-center mt-2
            transition duration-300 ease-in-out hover:-translate-y-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                    <span class="font-semibold">add to cart</span>
                </span>
            </div>
        </div>

    </div>
</template>
<script setup>

    const props = defineProps({
        product: Object,
    })

</script>
