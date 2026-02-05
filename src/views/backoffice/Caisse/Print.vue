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
                <span>{{ formatDate(orderModel.order.created_at) }}</span>
            </div>
            <div class="flex items-center justify-between mt-1">
                <span>Agent : </span>
                <span >{{ auth.user.first_name }} {{ auth.user.last_name}}</span>
            </div>
            <div class="flex items-center justify-between mt-1" v-if="auth.user.first_name !== orderModel.order.user.first_name">
                <span>client : </span>
                <span class="font-semibold">{{  orderModel.order.user.first_name }} {{ orderModel.order.user.last_name}}</span>
            </div>
            <div class="flex items-center justify-between mt-1" v-if="orderModel.order.payments.length > 0">
                <span>Payment Method : </span>
                <span>{{  orderModel.order.payments[0].payment_method }}</span>
            </div>
        </div>
        <ul role="list"   class="divide-y divide-gray-200 px-4 sm:px-6 lg:px-8">
            <li v-for="item in orderModel.order.products" :key="item.product_id" class="flex py-8 text-sm sm:items-center">
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
                <span class=" font-semibold">{{ totalArticles }}</span>
            </div>
            <div class="flex px-4 sm:px-6 lg:px-8 items-center justify-between w-full mb-2">
                <span class=" font-semibold">TOTAL : </span>
                <span class=" font-semibold text-xl">{{ orderModel.order.total }} DH</span>
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
const totalArticles = ref(0);

onMounted( async() => {
    await orderModel.getById(route.params.id)
    isLoading.value = false
    orderModel.order.products.forEach(product => {
        totalArticles.value += product.pivot.quantity
    })

    setTimeout(() => {
        if(isLoading.value == false){
            window.print(); 
        }
    }, 1000);
})


const formatDate = (value) => {
    return moment(value).format('DD MMM YYYY, hh:mm A')
}


</script>