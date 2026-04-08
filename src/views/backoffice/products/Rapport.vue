<template>
   
    <div class="md:bg-white md:bg-gray-150 md:rounded-lg md:shadow-md dark:bg-gray-800 mb-5">
        
        <div class="py-5">
        <div v-if='auth.hasPermission("stock-summary") && statisticModel.stock != undefined'>
            <div class="mt-2">
                <div class="overflow-hidden rounded-lg  grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4">
                    <div  class="bg-white px-4 py-6 sm:px-6 lg:px-8">
                        <p class="text-sm/6 font-medium text-gray-500">{{ 'Nombre de Produits' }}</p>
                        <p class="mt-2 flex items-baseline gap-x-2">
                            <span class="text-4xl font-semibold tracking-tight text-gray-900">{{ statisticModel.stock.stock_count }}</span>
                            <span  class="text-sm text-gray-500">{{ '' }}</span>
                        </p>
                    </div>
                    
                    <div  class="bg-white px-4 py-6 sm:px-6 lg:px-8">
                        <p class="text-sm/6 font-medium text-gray-500">{{ 'Prix d’Achat' }}</p>
                        <p class="mt-2 flex items-baseline gap-x-2">
                            <span class="text-4xl font-semibold tracking-tight text-gray-900">{{ statisticModel.stock.price }}</span>
                            <span  class="text-sm text-gray-500">{{ 'DH' }}</span>
                        </p>
                    </div>
                    <div  class="bg-white px-4 py-6 sm:px-6 lg:px-8">
                        <p class="text-sm/6 font-medium text-gray-500">{{ 'Prix de Vente' }}</p>
                        <p class="mt-2 flex items-baseline gap-x-2">
                            <span class="text-4xl font-semibold tracking-tight text-gray-900">{{ statisticModel.stock.sale_price }}</span>
                            <span  class="text-sm text-gray-500">{{ 'DH' }}</span>
                        </p>
                    </div>

                    <div  class="bg-white px-4 py-6 sm:px-6 lg:px-8">
                        <p class="text-sm/6 font-medium text-gray-500">{{ 'Valeur du Stock' }}</p>
                        <p class="mt-2 flex items-baseline gap-x-2">
                            <span class="text-4xl font-semibold tracking-tight  text-green-500">{{ statisticModel.stock.sale_price - statisticModel.stock.price }}</span>
                            <span  class="text-sm text-gray-500">{{ 'DH' }}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
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
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">Brand</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                    <tr v-if="isLoading" class="text-center text-gray-400"><td colspan="8" class="p-2">loading...</td></tr>
                    <tr v-else-if="productModel.products.length == 0" class="text-center text-gray-400"><td colspan="8" class="p-2">Empty</td></tr>
                    <tr v-else v-for="item in productModel.products" :key="item.email">
                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 flex items-center gap-2">
                            
                            <div>
                                <div class="font-normal text-sm text-gray-500 dark:text-gray-400">{{ item.product_code }}</div>
                                <div class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ item.name }}</div>
                            </div>
                        </td>
                        
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                            {{  item.price  }}
    
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                            {{item.sale_price  }}
                        </td>
                        <td  class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                            <span :class="{'text-red-600 font-semibold' : item.stock_quantity == 0}">{{item.stock_quantity }}</span>
                        </td>



                       
                       
                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 dark:text-gray-300 sm:pl-6">
                           {{item.brand !== null ? item.brand.name : 'no brand' }}
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
    import { useStatisticStore } from '@/stores/backoffice/statistic'

    import { useAlertStore } from '@/stores/alert'
    import { useAuthStore } from '@/stores/backoffice/auth'
    import { useProductStore } from '@/stores/backoffice/products'
    import { useBrandStore } from '@/stores/backoffice/brands'
    
    import Pagination from '@/components/Pagination.vue'
    import Alert from '@/components/Alert.vue'
    

    const auth = useAuthStore()
    const alertModel = useAlertStore()
    const productModel = useProductStore()
    const statisticModel = useStatisticStore()

    const isLoading = ref(true)
    const brandModel = useBrandStore()
    const barcode = ref('');
    const product_name = ref('');
    const brand_id = ref('');
    const isLoadingStatistic = ref(true)
    function destroy(id){
        alertModel.clear()
        alertModel.remove("Remove Product", "Are you sure ?", id)
    }

    const Refresh = async () => {
        alertModel.clear()
        isLoading.value = true
        if(brand_id.value != ''){
            console.log(brand_id.value)
            productModel.brand_id = brand_id.value 

        }
        await productModel.getAll({
            brand_id:brand_id.value,
            name:product_name.value,
            product_code: barcode.value,
            stock_quantity:true,
            pagination:false
        })
        isLoading.value = false
    }

    watch(alertModel, async () => {
        if(alertModel.alert && alertModel.alert.callback && alertModel.alert.confirm){
            await productModel.destroy(alertModel.alert.id)
            isLoading.value = true
            await productModel.getAll({
                brand_id:brand_id.value,
                name:product_name.value,
                product_code: barcode.value,
                stock_quantity:true,
                 pagination:false
            })
            isLoading.value = false
        }
    })

    onMounted( async() => {
        alertModel.clear()
        isLoadingStatistic.value = true;
        brand_id.value = productModel.brand_id
        if(auth.hasPermission('stock-summary')){
            await statisticModel.getStockSummary()
            isLoadingStatistic.value = false
        }
        await productModel.getAll({
            brand_id:brand_id.value,
            name:product_name.value,
            product_code: barcode.value,
            stock_quantity:true,
             pagination:false
        })
        await brandModel.getAll()
        isLoading.value = false

        
    })

    async function goToPage(page){
        isLoading.value = true
        productModel.page = page
        await productModel.getAll({
            brand_id:brand_id.value,
            name:product_name.value,
            product_code: barcode.value,
            stock_quantity:true
        })
        
        isLoading.value = false
    }

</script>