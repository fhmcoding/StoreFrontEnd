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
            <h1 class="text-center font-semibold my-4">Rapport Global Par Période</h1>
            <div class="flex items-center justify-between mb-2">
                <span>Date d'impression : </span>
                <span>{{ now  }} </span>
            </div>
            <div class="flex items-center justify-between mb-2">
                <span>Period : </span>
                <span>{{ orderModel.created_from }} - {{ orderModel.created_to }}</span>
            </div>
            
            <hr>

            <div class="flex items-center justify-between mt-4" >
                <span class="font-bold">Total : </span>
                <span class="font-semibold">{{  total }}DH </span>
            </div>

            <div class="mx-2 my-2">
                <div class="flex items-center justify-between mt-1" v-if="totatPaidCash > 0">
                    <span>CASH : </span>
                    <span class="font-semibold">{{  totatPaidCash }} DH </span>
                </div>

                <div class="flex items-center justify-between mt-1" v-if="totalPaidTpe > 0">
                    <span>TPE : </span>
                    <span class="font-semibold">{{  totalPaidTpe }} DH</span>
                </div>

                

                <div class="flex items-center justify-between mt-1" v-if="totalPaidVirmo > 0">
                    <span>virement : </span>
                    <span class="font-semibold">{{  totalPaidVirmo }} DH</span>
                </div>

                <div class="flex items-center justify-between mt-1"  v-if="totalPaidChique > 0">
                    <span>Cheque : </span>
                    <span class="font-semibold">{{  totalPaidChique }} DH </span>
                </div>

             

                <div class="flex items-center justify-between mt-1" v-if="totalCredit > 0">
                    <span>Credit : </span>
                    <span class="font-semibold text-red-500"> - {{  totalCredit }} DH</span>
                </div>

            </div>

            <div class="flex items-center justify-between mt-1" v-if="total_expense > 0">
                <span>Expense : </span>
                <span class="font-semibold text-red-600">- {{  total_expense }}DH </span>
            </div>


            
            
        </div>
    </div>
</template>

<script setup>

import { ref,onMounted,  computed } from 'vue'
import { IconLoader } from '@tabler/icons-vue';
import { useRoute, useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/backoffice/orders'
import { useExpenseStore } from '@/stores/backoffice/expenses'
import { useAuthStore } from '@/stores/backoffice/auth'

import moment from 'moment'

const isLoading  = ref(true)

const route = useRoute()
const orderModel = useOrderStore()
const expenseModel = useExpenseStore()
const auth = useAuthStore()

const now = ref(new Date().toISOString().slice(0, 19).replace('T', ' '))
const totalArticles = ref(0);

const totatPaidCash = ref(0)
const totalPaidTpe = ref(0)
const totalPaidVirmo = ref(0)
const totalPaidChique = ref(0)
const totalCredit = ref(0)
const total = ref(0);
const total_expense = ref(0);

onMounted( async() => {
    orderModel.per_page = 200
    orderModel.created_from =  route.query.from ?? moment().format('YYYY-MM-DD')
    orderModel.created_to = route.query.to ?? moment().format('YYYY-MM-DD')

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


    expenseModel.per_page = 200
    expenseModel.created_from = route.query.from ?? moment().format('YYYY-MM-DD')
    expenseModel.created_to = route.query.to ?? moment().format('YYYY-MM-DD')

    await expenseModel.getAll();


    expenseModel.expenses.forEach(ex => {
        total_expense.value += Number(ex.amount)
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