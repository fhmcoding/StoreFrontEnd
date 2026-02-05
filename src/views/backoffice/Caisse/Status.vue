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
            <div class="flex items-center justify-between mt-1" >
                <span>Orders : </span>
                <span class="font-semibold">{{  orderModel.orders.length }} </span>
            </div>

            <div class="flex items-center justify-between mt-1" >
                <span>Articles : </span>
                <span class="font-semibold">{{  totalArticles }} </span>
            </div>

            <div class="flex items-center justify-between mt-1" >
                <span>Total : </span>
                <span class="font-semibold">{{  total }}DH </span>
            </div>

            <div class="flex items-center justify-between mt-1" v-if="totatPaidCash > 0">
                <span>CASH : </span>
                <span class="font-semibold">{{  totatPaidCash }} DH </span>
            </div>

            <div class="flex items-center justify-between mt-1" v-if="totalPaidTpe > 0">
                <span>TPE : </span>
                <span class="font-semibold">{{  totalPaidTpe }} DH</span>
            </div>

            <div class="flex items-center justify-between mt-1" v-if="totalCredit > 0">
                <span>Credit : </span>
                <span class="font-semibold text-red-500"> - {{  totalCredit }} DH</span>
            </div>

            <div class="flex items-center justify-between mt-1" v-if="totalPaidVirmo > 0">
                <span>virement : </span>
                <span class="font-semibold">{{  totalPaidVirmo }} DH</span>
            </div>

            <div class="flex items-center justify-between mt-1"  v-if="totalPaidChique > 0">
                <span>Cheque : </span>
                <span class="font-semibold">{{  totalPaidChique }} DH </span>
            </div>
            
        </div>

        <hr />
        <div class="border-b border-gray-600 pb-2 mb-2 py-2" v-for="(order,index) in orderModel.orders" :key="index"> 
            <div class="flex items-center justify-between mt-1 px-4 sm:px-6 lg:px-8">
                <span>date : </span>
                <span class="font-semibold" >{{formatDate(order.created_at) }}</span>
            </div>
            <div class="flex items-center justify-between mt-1 px-4 sm:px-6 lg:px-8" v-if="order.caisser.first_name !== order.user.first_name">
                <span>client : </span>
                <span class="font-semibold">{{  order.user.first_name }} {{ order.user.last_name}}</span>
            </div>
            <ul role="list"   class="divide-y divide-gray-200 px-4 sm:px-6 lg:px-8 ">
                <li v-for="item in order.products" :key="item.product_id" class="flex py-2 text-sm sm:items-center">
                    <div class="grid flex-auto grid-cols-1 grid-rows-1 items-start gap-x-5 gap-y-3  sm:flex sm:items-center sm:gap-0">
                        
                        <div class="flex items-center gap-2 ">
                            
                            <div>
                                <h3 class="font-medium text-gray-900">
                                {{ item.name }}
                                </h3>
                                <p class="mt-1 mx-4 text-black ">prix : {{ item.pivot.price }} DH</p>
                                <p class="mt-1 mx-4 text-black ">quentity : {{item.pivot.quantity}}</p>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>

            <div class="border-t border-gray-200">
                <div class="flex px-4 sm:px-6 lg:px-8 items-center justify-between w-full pt-2">
                    <span class=" font-semibold">Number article : </span>
                    <span class=" font-semibold">{{ order.products.reduce((sum, item) => { return sum + Number(item.pivot.quantity);}, 0)  }} </span>
                </div>
                <div class="flex px-4 sm:px-6 lg:px-8 items-center justify-between w-full pt-2">
                    <span class=" font-semibold">TOTAL : </span>
                    <span class=" font-semibold text-xl">{{ order.total }} DH</span>
                </div>
                <div class="flex px-4 sm:px-6 lg:px-8 items-center justify-between w-full pt-2" v-if="order.payments.length == 1">
                    <span class=" font-semibold">Payment Mehod : </span>
                    <span class="font-semibold text-xl">{{ order.payments[0].payment_method }} </span>
                </div>
                <div v-else >
                     <div class="flex px-4 sm:px-6 lg:px-8 items-center justify-between w-full mb-2" v-for="(payment,index) in order.payments" :key="index">
                        <span class=" font-semibold">Payment Mehod : </span>
                        <span class="font-semibold text-xl">{{ payment.payment_method }} |  {{ payment.amount }} DH</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref,onMounted,  computed } from 'vue'
import { IconLoader } from '@tabler/icons-vue';
import { useRoute, useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/backoffice/orders'
import { useAuthStore } from '@/stores/backoffice/auth'
import moment from 'moment'

const isLoading  = ref(true)

const route = useRoute()
const orderModel = useOrderStore()
const auth = useAuthStore()
const now = ref(new Date().toISOString().slice(0, 19).replace('T', ' '))
const totalArticles = ref(0);

const totatPaidCash = ref(0)
const totalPaidTpe = ref(0)
const totalPaidVirmo = ref(0)
const totalPaidChique = ref(0)
const totalCredit = ref(0)
const total = ref(0);

onMounted( async() => {
    console.log("hello");
    orderModel.per_page = 100
    await orderModel.getAll()
    
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


    setTimeout(() => {
        if(isLoading.value == false){
            window.print(); 
        }
    }, 500);

})


const formatDate = (value) => {
    return moment(value).format('DD MMM YYYY, hh:mm A')
}


</script>