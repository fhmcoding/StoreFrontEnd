<template>
    <div class="group relative mb-4">
        <div
            class="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80"
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
        <div class="px-1 text-center">
            <h3 class="mt-4 text-sm text-gray-700">
                <RouterLink :to="'/products/' + product.id">
                    <span class="absolute inset-0" />
                    {{ product.name }}
                </RouterLink>
            </h3>
            <p class="mt-1 text-sm text-gray-500 font-semibold">{{ product.brand == null ? "" : product.brand.name }}</p>
            <p class="mt-1 text-sm font-medium text-gray-900">{{ product.price +' MAD'}}</p>
        </div>
    </div>
</template>
<script setup>

    const props = defineProps({
        product: Object,
    })

</script>
