<template>
    <div v-if="isLoading" class="inline-flex justify-center">
        <span class="animate-spin h-6 w-6 mr-2" viewBox="0 0 24 24">
            <IconLoader class="h-6 w-6" aria-hidden="true" />
        </span>
    </div>
     <div v-else>
        <div class="flex items-center justify-center py-2">
            <img src="/logo.png" class=" w-[100px] ">
        </div>
        <div class="border-b border-gray-200  px-4 sm:px-6 lg:px-8 pb-3">
            <div class="flex items-center justify-between">
                <span>Date : </span>
                <span>{{ now }}</span>
            </div>
            <div class="flex items-center justify-between mt-1">
                <span>Agent : </span>
                <span >{{ auth.user.first_name }} {{ auth.user.last_name}}</span>
            </div>
        </div>

        <hr />

        <div class="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded-lg">
            <table class="relative min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                    <tr>
                    <th scope="col" class="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">Date</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Object</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount</th>
                    
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                    <tr v-for="(item,index) in mergedSorted" :key="index">
                        <td class="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">{{ formatDate(item.created_at) }}</td>
                        <td class="px-3 py-4 text-sm whitespace-nowrap text-gray-500" :class="{'bg-green-50':item.amount !== undefined,'bg-red-50':item.amount == undefined}">
                            <span v-if='item.amount !== undefined' class="font-bold">{{ item.payment_method }} </span>
                            <div v-else class="grid">
                                <span>order ref : {{ item.id }}</span>
                                <span  v-for="(product,index) in item.products" :key="index">{{ product.name }}</span>
                            </div>
                        </td>
                        <td class="px-3 py-4 text-sm whitespace-nowrap font-semibold " :class="{'text-red-600' : item.amount == undefind, 'text-green-600':item.amount != undefind }">{{ item.amount !== undefined ? item.amount : item.total  * -1 }} DH</td>
                        
                    </tr>
                </tbody>
            </table>
        </div>


        <div class="flex items-center justify-between">
            <div></div>
            <div class="border-b border-gray-200  px-4 sm:px-6 lg:px-8 pb-3 mt-10 w-1/2">
                <div class="flex items-center justify-between">
                    <span>Total : </span>
                    <span class=" font-bold text-xl">{{ orderModel.orders.reduce((sum, item) => { return sum + Number(item.total);}, 0) }} DH</span>
                </div>
                <div class="flex items-center justify-between mt-1">
                    <span>Paid : </span>
                    <span class="text-green-600 font-bold text-xl">{{ paymentModel.payments.reduce((sum, item) => { return sum + Number(item.amount);}, 0) }} DH</span>
                </div>

                <div class="flex items-center justify-between mt-1">
                    <span>Credit : </span>
                    <span  class="font-bold text-xl">{{orderModel.orders.reduce((sum, item) => { return sum + Number(item.total);}, 0) - paymentModel.payments.reduce((sum, item) => { return sum + Number(item.amount);}, 0) }} DH</span>
                </div>
            </div>
        </div>

      
    </div>
</template>

<script setup>

import { ref,onMounted,  computed } from 'vue'
import { IconLoader } from '@tabler/icons-vue';
import { useRoute } from 'vue-router'
import { useOrderStore } from '@/stores/backoffice/orders'
import { usePaymentStore } from '@/stores/backoffice/payment'
import { useAuthStore } from '@/stores/backoffice/auth'
import moment from 'moment'

const isLoading  = ref(true)


const route = useRoute()
const orderModel = useOrderStore()
const paymentModel = usePaymentStore()

const auth = useAuthStore()
const now = ref(new Date().toISOString().slice(0, 19).replace('T', ' '))
const totalArticles = ref(0);

const totatPaidCash = ref(0)
const totalPaidTpe = ref(0)
const totalPaidVirmo = ref(0)
const totalPaidChique = ref(0)
const totalCredit = ref(0)
const total = ref(0);
const mergedSorted = ref([])
onMounted( async() => {
    console.log("hello",route.params.id);
    orderModel.per_page = 100
  
    await orderModel.getAll(route.params.id)
    await paymentModel.getAll(route.params.id)

    mergedSorted.value = [...orderModel.orders, ...paymentModel.payments].sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );

    console.log(mergedSorted.value)


    total.value = orderModel.orders.reduce((sum, item) => { return sum + Number(item.total);}, 0) 
    orderModel.orders.forEach(order => {
        order.products.forEach(product => {
            totalArticles.value += product.pivot.quantity
        })
        order.payments.forEach(payment => {
            if(payment.payment_method == 'cash'){
                totatPaidCash.value += Number(payment.amount)
            }
            else if(payment.payment_method == 'tpe'){
                totalPaidTpe.value += Number(payment.amount)
            }
            else if(payment.payment_method == 'virement'){
                totalPaidVirmo.value += Number(payment.amount)
            }
            else if(payment.payment_method == 'cheque'){
                totalPaidChique.value +=Number(payment.amount)
            }
        })

        totalCredit.value += order.total - order.payments.reduce((sum, item) => { return sum + Number(item.amount);}, 0)  
        
    });

    isLoading.value = false

    
})


const formatDate = (value) => {
    return moment(value).format('DD MMM YYYY, hh:mm A')
}


</script>