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
                    <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-300">Orders</span>
                </div>
            </li>
        </ol>
    </nav>
    <Alert />

    <div class="md:bg-white md:bg-gray-150 md:rounded-lg md:shadow-md dark:bg-gray-800 mb-5">
        <div class="p-4 flex justify-between">
            <h1 class="my-auto text-xl font-semibold text-gray-900 dark:text-gray-50">Orders</h1>
        </div>

        <hr class="dark:border-gray-600 hidden md:block" />
        
        <div class="overflow-auto overflow-x-auto "><!-- hidden md:block -->
            <table class="table-auto min-w-full max-w-full overflow-x-auto">
                <thead class="bg-gray-50 dark:bg-gray-700">
                    <tr class="dark:border-gray-700">
                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 dark:text-gray-300">#</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">Customer</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">User</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">Total</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">Status</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">Products</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">Created at</th>
                        <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-gray-900 dark:text-gray-300 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                    <tr v-if="isLoading" class="text-center text-gray-400"><td colspan="8" class="p-2">loading...</td></tr>
                    <tr v-else-if="orderModel.orders.length == 0" class="text-center text-gray-400"><td colspan="8" class="p-2">Empty</td></tr>
                    <tr v-else v-for="item in orderModel.orders" :key="item.id">
                        
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                            {{ item.id }}
                        </td>
                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                            <div>
                                <div class="font-normal text-sm text-gray-500 dark:text-gray-400">{{item.customer !== null && item.customer.first_name !== undefined ? `${item.customer.first_name} ${item.customer.last_name}` : '-'  }}</div>
                                <div class="text-base font-medium text-gray-900 dark:text-gray-300">{{ item.customer !== null && item.customer.phone_number !== undefined ? `${item.customer.phone_number || '-' }` : '-'  }}</div>
                            </div>
                        </td>

                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                            <div>
                                <div class="font-normal text-sm text-gray-500 dark:text-gray-400">{{item.user !== null && item.user.first_name !== undefined ? `${item.user.first_name} ${item.user.last_name}` : '-'  }}</div>
                                <div class="text-base font-medium text-gray-900 dark:text-gray-300">{{ item.user !== null && item.user.phone_number !== undefined ? `${item.user.phone_number || '-' }` : '-'  }}</div>
                            </div>
                        </td>

                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                            {{ item.total }} {{item.currency}}
                        </td>
                        
                        <td class="whitespace-nowrap px-3 py-4 text-sm ">
                            <span @click="showStatusHistory(item)"  :class="'inline-flex rounded-full cursor-pointer gap-2 items-center  px-2 py-1 text-xs font-semibold leading-5 '+ statusClass[item.status] ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                
                                {{item.status.replace('_',' ')}}
                                
                            </span>
                        </td>
                        
                        
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                            Total Products  {{ item.products_count }}
                        </td>
                        
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {{ formatDate(item.created_at) }}
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-center sm:pr-6">
                            <div class="flex justify-center text-primary dark:text-primary font-bold space-x-2">
                                <RouterLink :to="'/backoffice/orders/'+item.id"><EyeIcon class="cursor-pointer font-bold h-5 w-5" aria-hidden="true" /></RouterLink>
                                <TrashIcon v-if="auth.hasPermission('product-delete')" @click="destroy(item.id)" class="cursor-pointer font-bold h-5 w-5" aria-hidden="true" />
                              
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Pagination :links='orderModel.pagination' :goToPage="goToPage" v-if='!isLoading && orderModel.orders.length > 0' />
        </div>
    
    </div>
</template>

<script setup>

    import { TrashIcon, PencilSquareIcon, XCircleIcon,PlusCircleIcon, Cog6ToothIcon, EyeIcon } from '@heroicons/vue/24/outline'
    import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
    import { ref,onMounted,watch } from 'vue'
    
    import moment from 'moment'
    
    import { useAlertStore } from '@/stores/alert'
    import { useOrderStore } from '@/stores/backoffice/orders'
    import { useAuthStore } from '@/stores/backoffice/auth'
    
    import Alert from '@/components/Alert.vue'
    
    const auth = useAuthStore() 
    const alertModel = useAlertStore()
    const orderModel = useOrderStore()
    const isLoading = ref(true)
    const statusHistoryModel = ref(false)
    const selectedOrder  = ref(null)

    const statusClass = {
        pending:'bg-indigo-500 text-white',
        confirmed:'bg-green-500 text-white',
        delivered:'bg-orange-500 text-white',
        returned:'bg-red-500 text-white',
        cancelled:'bg-yellow-500 text-white',
        on_hold:'bg-gray-500 text-white',
        in_transit:'bg-blue-500 text-white',
    }

    const formatDate = (value) => {
        return moment(value).format('DD MMM YYYY, hh:mm A')
    }

    function destroy(id){
        alertModel.clear()
        alertModel.remove("Remove Order", "Are you sure ?", id)
    }


    function showStatusHistory(order){
        selectedOrder.value = order
        statusHistoryModel.value = true;
        
    }

    watch(alertModel, async () => {
        if(alertModel.alert && alertModel.alert.callback && alertModel.alert.confirm){
            await orderModel.destroy(alertModel.alert.id)
            isLoading.value = true
            await orderModel.getAll()
            isLoading.value = false
        }
    })


    onMounted( async() => {
        await orderModel.getAll()
        isLoading.value = false
    })


</script>