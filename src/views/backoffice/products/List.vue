<template>
    <nav class="mb-3 px-3 py-3 text-gray-700 dark:text-gray-50 bg-white dark:bg-gray-800 rounded-md p-3" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
                <RouterLink to="/backoffice" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-white dark:hover:text-white">
                    <svg aria-hidden="true" class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                    </svg>
                    Dashboard
                </RouterLink>
            </li>
            <li aria-current="page">
                <div class="flex items-center">
                    <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-300">Products</span>
                </div>
            </li>
        </ol>
    </nav>
    <Alert />
    <div class="md:bg-white md:bg-gray-150 md:rounded-lg md:shadow-md dark:bg-gray-800 mb-5">
        <div class="p-4 flex justify-between">
            <h1 class="my-auto text-xl font-semibold text-gray-900 dark:text-gray-50">Products</h1>
            <routerLink v-if="auth.hasPermission('product-create')" to="/backoffice/products/create" type="button" class="text-white bg-primary hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2">
                <PlusCircleIcon class="h-5 mr-1" aria-hidden="true" />
                Add Product
            </routerLink>
        </div>

        <hr class="dark:border-gray-600 hidden md:block" />
        
        <div class="overflow-auto overflow-x-auto "><!-- hidden md:block -->
            <table class="table-auto min-w-full max-w-full overflow-x-auto">
                <thead class="bg-gray-50 dark:bg-gray-700">
                    <tr class="dark:border-gray-700">
                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 dark:text-gray-300">Info</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">Price</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">Sale Price</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">Stock Quantity</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">variations</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">Brand</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">Category</th>
                        <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-gray-900 dark:text-gray-300 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                    <tr v-if="isLoading" class="text-center text-gray-400"><td colspan="8" class="p-2">loading...</td></tr>
                    <tr v-else-if="productModel.products.length == 0" class="text-center text-gray-400"><td colspan="8" class="p-2">Empty</td></tr>
                    <tr v-else v-for="item in productModel.products" :key="item.email">
                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 flex items-center gap-2">
                            <div class=" w-11 h-11 rounded-lg overflow-hidden">
                                <img :src="item.image_url == null
                                    ? '/default.png'
                                    : item.image_url" alt="" srcset="">
                            </div>
                            <div>
                                <div class="font-normal text-sm text-gray-500 dark:text-gray-400">{{ item.product_code }}</div>
                                <div class="text-base font-medium text-gray-900 dark:text-gray-300">{{ item.name }} ({{ item.products[0].name }} ml)</div>
                            </div>
                        </td>
                        
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                            {{ item.products[0].price }}
    
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                            {{ item.products[0].sale_price }}
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                            <span>{{item.products[0].stock_quantity}}</span>
                        </td>

                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                            <span>{{item.products.length}}</span>
                        </td>


                       
                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 dark:text-gray-300 sm:pl-6">
                            {{item.category !== null ? item.category.name : 'no category' }}
                        </td>
                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 dark:text-gray-300 sm:pl-6">
                           {{item.brand !== null ? item.brand.name : 'no brand' }}
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-center sm:pr-6">
                            <div class="flex justify-center text-primary dark:text-primary font-bold space-x-2">
                                <TrashIcon v-if="auth.hasPermission('product-delete')" @click="destroy(item.id)" class="cursor-pointer font-bold h-5 w-5" aria-hidden="true" />
                                <RouterLink :to="'/backoffice/products/edit/'+item.id"> <PencilSquareIcon  v-if="auth.hasPermission('product-edit')" class="cursor-pointer font-bold h-5 w-5" aria-hidden="true" /></RouterLink>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Pagination :links='productModel.pagination' :goToPage="goToPage" v-if='!isLoading && productModel.products.length > 0' />
        </div>
    
    </div>
</template>

<script setup>
    import { PlusCircleIcon, EyeIcon, TrashIcon, PencilSquareIcon } from '@heroicons/vue/24/outline'
    import { ref,onMounted,watch } from 'vue'
    
    import { useAlertStore } from '@/stores/alert'
    import { useAuthStore } from '@/stores/backoffice/auth'
    import { useProductStore } from '@/stores/backoffice/products'

    import Pagination from '@/components/Pagination.vue'
    import Alert from '@/components/Alert.vue'
    

    const auth = useAuthStore()
    const alertModel = useAlertStore()
    const productModel = useProductStore()
    const isLoading = ref(true)

    function destroy(id){
        alertModel.clear()
        alertModel.remove("Remove Product", "Are you sure ?", id)
    }



    watch(alertModel, async () => {
        if(alertModel.alert && alertModel.alert.callback && alertModel.alert.confirm){
            await productModel.destroy(alertModel.alert.id)
            isLoading.value = true
            await productModel.getAll()
            isLoading.value = false
        }
    })

    onMounted( async() => {
        alertModel.clear()
        await productModel.getAll()
        isLoading.value = false
    })

    async function goToPage(page){
        isLoading.value = true
        productModel.page = page
        await productModel.getAll()
        isLoading.value = false
    }

</script>