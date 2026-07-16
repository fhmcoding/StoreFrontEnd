 <template>
   
    <div class="md:bg-white md:bg-gray-150 md:rounded-lg md:shadow-md dark:bg-gray-800 mb-5">
        
        <div class="py-5">
            <div v-if='auth.hasPermission("client-credit") && statisticModel.stock != undefined'>
                <div class="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

                    <!-- Total Clients -->
                    <div class="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                        <div class="flex items-center justify-between">
                            <div class="rounded-lg bg-blue-100 p-3">
                                <UsersIcon class="h-7 w-7 text-blue-600" />
                            </div>

                            <span class="text-xs font-medium text-gray-400">
                                Clients
                            </span>
                        </div>

                        <p class="mt-6 text-sm font-medium text-gray-500">
                            Total Clients
                        </p>

                        <p class="mt-2 text-4xl font-bold text-gray-900">
                            {{ statisticModel.credit.length }}
                        </p>
                    </div>

                    <!-- Total Orders -->
                    <div class="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                        <div class="flex items-center justify-between">
                            <div class="rounded-lg bg-indigo-100 p-3">
                                <ShoppingBagIcon class="h-7 w-7 text-indigo-600" />
                            </div>

                            <span class="text-xs font-medium text-gray-400">
                                Commandes
                            </span>
                        </div>

                        <p class="mt-6 text-sm font-medium text-gray-500">
                            Total Commandes
                        </p>

                        <p class="mt-2 text-4xl font-bold text-gray-900">
                            {{ totalOrders + creditInital}}
                            <span class="text-lg font-medium text-gray-500">DH</span>
                        </p>
                    </div>

                    <!-- Total Paid -->
                    <div class="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                        <div class="flex items-center justify-between">
                            <div class="rounded-lg bg-green-100 p-3">
                                <BanknotesIcon class="h-7 w-7 text-green-600" />
                            </div>

                            <span class="text-xs font-medium text-gray-400">
                                Paiements
                            </span>
                        </div>

                        <p class="mt-6 text-sm font-medium text-gray-500">
                            Total Payé
                        </p>

                        <p class="mt-2 text-4xl font-bold text-green-600">
                            {{ totalPayments }}
                            <span class="text-lg font-medium text-gray-500">DH</span>
                        </p>
                    </div>

                    <!-- Total Credit -->
                    <div class="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                        <div class="flex items-center justify-between">
                            <div class="rounded-lg bg-red-100 p-3">
                                <ExclamationTriangleIcon class="h-7 w-7 text-red-600" />
                            </div>

                            <span class="text-xs font-medium text-gray-400">
                                Crédit
                            </span>
                        </div>

                        <p class="mt-6 text-sm font-medium text-gray-500">
                            Crédit Restant
                        </p>

                        <p class="mt-2 text-4xl font-bold text-red-600">
                            {{ totalOrders + creditInital -  totalPayments}}
                            <span class="text-lg font-medium text-gray-500">DH</span>
                        </p>
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
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">Total Orders</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">Total Paye</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">Credit</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                    <tr v-if="isLoading" class="text-center text-gray-400"><td colspan="8" class="p-2">loading...</td></tr>
                    <tr v-else-if="statisticModel.credit.length == 0" class="text-center text-gray-400"><td colspan="8" class="p-2">Empty</td></tr>
                    <tr v-else v-for="item in statisticModel.credit" :key="item">
                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 flex items-center gap-2">     
                            <div>
                                <div class="font-normal text-sm text-gray-500 dark:text-gray-400">{{item.first_name}}{{ item.last_name }}</div>
                                <div class="text-sm font-medium text-gray-900 dark:text-gray-300">{{ item.phone_number }}</div>
                            </div>
                        </td>
                        
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                            {{  Number(item.credit_inital) + item.orders.reduce((creditTotal, credit) => {
                                    return creditTotal + Number(credit.total)
                                }, 0)  
                            }}
                            DH
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                           {{   item.payments.reduce((creditTotal, credit) => {
                                    return creditTotal + Number(credit.amount)
                                }, 0)  
                            }}
                            DH 
                        </td>
                        <td  class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                            <span class="text-red-800 font-semibold">{{
                                     Number(item.credit_inital) + item.orders.reduce((creditTotal, credit) => {
                                    return creditTotal + Number(credit.total)
                                }, 0)  - item.payments.reduce((creditTotal, credit) => {
                                    return creditTotal + Number(credit.amount)
                                }, 0)  

                            }} DH</span>
                        </td>



                       
                        
                    </tr>
                </tbody>
            </table>

        </div>
    
    </div>
</template>

<script setup>
    import {
        UsersIcon,
        ShoppingBagIcon,
        BanknotesIcon,
        ExclamationTriangleIcon
    } from '@heroicons/vue/24/outline'
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

    const sale_price = ref(0);
    const price = ref(0)


    const totalOrders = ref(0)
    const totalPayments = ref(0)
    const creditInital =ref(0)

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

        if(auth.hasPermission('client-credit')){
            creditInital.value = statisticModel.credit.reduce((creditTotal, credit) => {
                    return creditTotal + Number(credit.credit_inital)
                }, 0)

            totalOrders.value = statisticModel.credit.reduce((clientTotal, client) => {
                return clientTotal + client.orders.reduce((orderTotal, order) => {
                    return orderTotal + Number(order.total)
                }, 0)
            }, 0)

            totalPayments.value = statisticModel.credit.reduce((clientTotalPayment, client) => {
                return clientTotalPayment + client.payments.reduce((paymentTotal, payment) => {
                    return paymentTotal + Number(payment.amount)
                }, 0)
            }, 0)

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

        sale_price.value = productModel.products.reduce((sum, p) => {
                return sum + (Number(p.sale_price) * Number(p.stock_quantity));
            }, 0)
        

        price.value =  productModel.products.reduce((sum, product) => {
                return sum + (Number(product.price) * Number(product.stock_quantity));
            }, 0)
        
        
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