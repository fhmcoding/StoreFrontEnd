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
                    <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-300">Payments</span>
                </div>
            </li> 
        </ol>
    </nav>

    <Alert />

    <div class="md:bg-white md:bg-gray-150 md:rounded-lg md:shadow-md dark:bg-gray-800 mb-5">
        <div class="p-4 flex justify-between">
            <h1 class="my-auto text-xl font-semibold text-gray-900 dark:text-gray-50">Payments</h1>
            <button v-if="auth.hasPermission('payment-create')"  @click="open = true" type="button" class="text-white bg-primary hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2">
                <PlusCircleIcon class="h-5 mr-1" aria-hidden="true" />
                Add Payment
            </button>
        </div>

        <hr class="dark:border-gray-600 hidden md:block" />
        <div class="overflow-auto overflow-x-auto "><!-- hidden md:block -->
            <table class="table-auto w-full overflow-x-auto">
                <thead class="bg-gray-50 dark:bg-gray-700">
                    <tr class="dark:border-gray-700">
                    <th class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-300 sm:pl-6">
                        #
                    </th>
                    <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">
                        User
                    </th>
                    <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">
                        Method
                    </th>
                    <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">
                        Amount
                    </th>
                    <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">
                        Status
                    </th>
                    <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">
                        Order
                    </th>
                    <th class="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 dark:text-gray-300">
                        Actions
                    </th>
                    </tr>
                </thead>

                <tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                    <!-- Loading -->
                    <tr v-if="isLoading">
                    <td colspan="7" class="p-4 text-center text-gray-400">
                        Loading...
                    </td>
                    </tr>

                    <!-- Empty -->
                    <tr v-else-if="paymentModel.payments.length === 0">
                    <td colspan="7" class="p-4 text-center text-gray-400">
                        Empty
                    </td>
                    </tr>

                    <!-- Data -->
                    <tr v-else v-for="(item, index) in paymentModel.payments" :key="index">
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        {{ item.id }}
                    </td>

                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">
                            {{ item.user?.first_name ? `${item.user.first_name} ${item.user.last_name}` : '-' }}
                        </div>
                        <div class="text-base font-medium text-gray-900 dark:text-gray-300">
                            {{ item.user?.phone_number || '-' }}
                        </div>
                        </div>
                    </td>

                    <td class="whitespace-nowrap px-3 py-4 text-sm">
                        <span class="inline-block rounded border px-2 py-1 font-semibold text-gray-600">
                        {{ item.payment_method }}
                        </span>
                    </td>

                    <td class="whitespace-nowrap px-3 py-4 text-sm">
                        <span class="inline-block rounded border px-2 py-1 font-semibold text-gray-600">
                        {{ item.amount }} DH
                        </span>
                    </td>

                    <td class="whitespace-nowrap px-3 py-4 text-sm">
                        <span
                        v-if="item.status == 'confirmed'"
                        class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800 dark:bg-green-200"
                        >
                        {{item.status}}
                        </span>

                        <span
                        v-else-if="item.status == 'cancel'"
                        class="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800 dark:bg-green-200"
                        >
                        {{item.status}}
                        </span>
                        <span
                        v-else
                        class="inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-yellow-600 dark:bg-yellow-200"
                        >
                        {{ item.status }}
                        </span>
                    </td>

                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div  class="grid" v-if="item.order != undefined">
                            <span  v-for="(product,index) in item.order.products" :key="index">{{ product.name }}</span>
                        </div>
                    </td>

                    <td class="whitespace-nowrap px-3 py-4 text-center text-sm sm:pr-6">
                        <div class="flex justify-end gap-2  font-bold">
                            <XCircleIcon v-if="item.status == 'pending'  &&  auth.hasPermission('payment-cancel')" @click="updatePaymentStatus(item,'cancel')" class="cursor-pointer font-bold h-6 w-6 text-red-600" aria-hidden="true" />
                            <CheckCircleIcon v-if="item.status == 'pending' &&  auth.hasPermission('payment-confirm')" @click="updatePaymentStatus(item,'confirmed')" class="cursor-pointer font-bold h-6 w-6 text-green-600" aria-hidden="true" />
                        </div>
                    </td>
                    </tr>
                </tbody>
            </table>

            <Pagination :links='paymentModel.pagination' :goToPage="goToPage" v-if='!isLoading && paymentModel.payments.length > 0' />
        </div>
    </div>


    <TransitionRoot as="template" :show="open">
        <Dialog class="relative z-10" @close="open = false">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="" leave="ease-in duration-200" leave-from="" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500/75 transition-opacity"></div>
            </TransitionChild>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to=" translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from=" translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                            <div class="grid grid-cols-6 gap-6">
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="location" class="block text-sm/6 font-medium text-gray-900">Select Client</label>
                                    <div class="mt-2 grid grid-cols-1">
                                        <select v-model="selected_user" id="location" name="location" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6">
                                            <option>---select--</option>
                                            <option v-for="(user,index) in clientModel.clients" :value='user' :key="index">{{ user.first_name }} {{  user.last_name }}</option>
                                        </select>
                                        <ChevronDownIcon class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" aria-hidden="true" />
                                    </div>
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="location" class="block text-sm/6 font-medium text-gray-900">Select Payment Method</label>
                                    <div class="mt-2 grid grid-cols-1">
                                        <select v-model="payment_method" id="location" name="location" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6">
                                            <option>---select--</option>
                                            <option  value='cash' >{{ 'cash' }}</option>
                                            <option  value='tpe' >{{ 'tpe' }}</option>
                                            <option  value='virement' >{{ 'virement' }}</option>
                                            <option  value='cheque' >{{ 'cheque' }}</option>
                                        </select>
                                        <ChevronDownIcon class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" aria-hidden="true" />
                                    </div>
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="order-ref" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Order Refernce</label>
                                    <input v-model="order_ref" type="text" name="order-ref" id="order-ref" autocomplete="given-name" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                    <!-- <span class="text-sm text-red-400">{{ errors.user_name }}</span> -->
                                </div>

                                <div class="col-span-6 sm:col-span-3">
                                    <label for="amount" class="block text-sm font-medium text-gray-700 dark:text-gray-300">amount</label>
                                    <input v-model="amount" type="number" name="amount" id="amount" autocomplete="given-name" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                    <!-- <span class="text-sm text-red-400">{{ errors.user_name }}</span> -->
                                </div>

                            </div>
                            <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                <button type="button" class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2" @click='createPayment()'>Create</button>
                                <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0" @click="open = false" ref="cancelButtonRef">Cancel</button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>



</template>

<script setup>

import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { TrashIcon, PencilSquareIcon, XCircleIcon,CheckCircleIcon  ,PlusCircleIcon, Cog6ToothIcon, EyeIcon } from '@heroicons/vue/24/outline'
import { ref,onMounted,  watch } from 'vue'
import { IconLoader } from '@tabler/icons-vue';
import { useRoute } from 'vue-router'
import { usePaymentStore } from '@/stores/backoffice/payment'
import { useAuthStore } from '@/stores/backoffice/auth'
import { useAlertStore } from '@/stores/alert'
import { useClientStore } from '@/stores/backoffice/client'

import moment from 'moment'
import { CanceledError } from 'axios';
import Alert from '@/components/Alert.vue'

const isLoading  = ref(true)

const open = ref(false)
const route = useRoute()
const paymentModel = usePaymentStore()
const clientModel = useClientStore()
const alertModel = useAlertStore()

const auth = useAuthStore()
const now = ref(new Date().toISOString().slice(0, 19).replace('T', ' '))


const selected_user = ref('')
const payment_method = ref('cash')
const order_ref = ref('')
const amount = ref(0)

onMounted( async() => {
    await paymentModel.getAll(route.params.id)
    isLoading.value = false
    clientModel.per_page = 100;
    await clientModel.getAll()
})


const updatePaymentStatus =async  (item,status) => {
    alertModel.clear()
    alertModel.remove("Upadate Payment Status", "Are you sure ?", {id:item.id,status:status})
} 

const createPayment = async () => {
    console.log('test')
    await paymentModel.createPayment({
        user_id:selected_user.value.id,
        payment_method:payment_method.value,
        order_ref:order_ref.value,
        amount:amount.value,
    });
    open.value = false
    isLoading.value = true
    await paymentModel.getAll(route.params.id)
    isLoading.value = false

}

watch(alertModel, async () => {
    if(alertModel.alert && alertModel.alert.callback && alertModel.alert.confirm){
        console.log(alertModel.alert);
        await paymentModel.updatePaymentStatus(alertModel.alert.id.id,alertModel.alert.id.status);
        isLoading.value = true
        await paymentModel.getAll(route.params.id)
        isLoading.value = false
    }
})

const formatDate = (value) => {
    return moment(value).format('DD MMM YYYY, hh:mm A')
}


</script>