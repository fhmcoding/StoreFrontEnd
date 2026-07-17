<template>
    <div class="py-5">
        <div v-if='authModel.hasPermission("statistic-summary") && statisticModel.summary != undefined'>
            <div class="flex items-center justify-between">
                <h3 class="text-base font-semibold leading-6 text-gray-900">
                    Sales Summary Report
                </h3>

                <div>
                    <span class="isolate inline-flex rounded-md shadow-sm">
                        <button type="button" 
                                class="relative inline-flex items-center rounded-l-md  px-3 py-2 text-sm font-semibold  ring-1 ring-inset  focus:z-10" 
                                :class="{'bg-indigo-500 text-white':selectDateMethod == 'TODAY','bg-white text-gray-900 ring-gray-300 hover:bg-gray-50':selectDateMethod != 'TODAY'}" @click="selectDateMethod = 'TODAY'" >Today</button>
                        <button type="button" 
                                class="relative inline-flex items-center   px-3 py-2 text-sm font-semibold  ring-1 ring-inset  focus:z-10"
                                :class="{'bg-indigo-500 text-white':selectDateMethod == 'LAST7','bg-white text-gray-900 ring-gray-300 hover:bg-gray-50':selectDateMethod != 'LAST7'}" @click="selectDateMethod = 'LAST7'"
                                >Last 7 Days</button>
                        <button type="button" 
                                class="relative inline-flex items-center rounded-r-md  px-3 py-2 text-sm font-semibold  ring-1 ring-inset  focus:z-10"
                                :class="{'bg-indigo-500 text-white':selectDateMethod == 'LAST30','bg-white text-gray-900 ring-gray-300 hover:bg-gray-50':selectDateMethod != 'LAST30'}" @click="selectDateMethod = 'LAST30'"
                                >Last 30 Days</button>
                    </span>
                </div>
            </div>
            <dl
                class="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-4 md:divide-x md:divide-y-0"
            >
                <div class="py-5 sm:p-6 flex gap-4">
                    <dt class="">
                        <div class="rounded-md bg-indigo-500 p-3">
                            <ShoppingCartIcon class="h-6 w-6 text-white" aria-hidden="true" />
                        </div>
                    </dt>
                    <dd
                        class="grid items-baseline"
                    >
                        <p class="truncate text-sm font-medium text-gray-500">Orders</p>
                        <div
                            class="text-2xl font-semibold text-gray-900"
                        >
                            {{ statisticModel.summary.orders }}
                        </div>
                    </dd>
                </div>

                <div class="py-5 sm:p-6 flex gap-4">
                    <dt class="">
                        <div class="rounded-md bg-green-500 p-3">
                            <PhoneIcon class="h-6 w-6 text-white" aria-hidden="true" />
                        </div>
                    </dt>
                    <dd
                        class="grid items-baseline"
                    >
                        <p class="truncate text-sm font-medium text-gray-500">Confiramtion Rate</p>
                        <div
                            class="text-2xl font-semibold text-gray-900"
                        >
                            {{ statisticModel.summary.confirmation_rate + '%' }} 
                        </div>
                    </dd>
                </div>

                <div class="py-5 sm:p-6 flex gap-4">
                    <dt class="">
                        <div class="rounded-md bg-orange-500 p-3">
                            <TruckIcon class="h-6 w-6 text-white" aria-hidden="true" />
                        </div>
                    </dt>
                    <dd
                        class="grid items-baseline"
                    >
                        <p class="truncate text-sm font-medium text-gray-500">Delivery Rate</p>
                        <div
                            class="text-2xl font-semibold text-gray-900"
                        >
                            {{ statisticModel.summary.delivery_rate + '%' }} 
                        </div>
                    </dd>
                </div>
                <div class="py-5 sm:p-6 flex gap-4">
                    <dt class="">
                        <div class="rounded-md bg-red-500 p-3">
                            <ArchiveBoxXMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                        </div>
                    </dt>
                    <dd
                        class="grid items-baseline"
                    >
                        <p class="truncate text-sm font-medium text-gray-500">Cancel Rate</p>
                        <div
                            class="text-2xl font-semibold text-gray-900"
                        >
                            {{ statisticModel.summary.cancel_rate + '%' }} 
                        </div>
                    </dd>
                </div>          
            </dl>
        </div>
    </div>

    <div class="py-5">
        <div v-if='authModel.hasPermission("stock-summary") && statisticModel.summary != undefined'>
            <div class="flex items-center justify-between">
                <h3 class="text-base font-semibold leading-6 text-gray-900">
                    Rapport de Stock
                </h3>

                  <RouterLink to="/backoffice/products/rapport" type="button" class="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-primary/50">Rapport </RouterLink>


            </div>
            <div class="mt-2">
                <div class="overflow-hidden rounded-lg bg-white shadow grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4">
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


    <div class="py-5" v-if='authModel.hasPermission("client-credit") && statisticModel.summary != undefined'>
        <div>
            <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900">
                    Rapport Crédit Clients
                </h3>

                <RouterLink
                    to="/backoffice/clients/rapport"
                    class="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow hover:bg-primary/80"
                >
                    Rapport
                </RouterLink>
            </div>

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



        <div class="overflow-hidden w-full lg:w-1/2 bg-white shadow rounded-lg " v-if='authModel.hasPermission("status-global")'>

            <div class="mb-2 overflow-hidden bg-gradient-to-r from-cyan-400 to-blue-600 px-5 py-3  shadow-sm">
                <h1 class="text-white text-lg font-semibold italic">Etat Global</h1>
            </div>
            <div class="px-4 sm:px-6 lg:px-8 pb-6 pt-4">
                <div class="mb-4">
                    <label for="periode" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Période :
                    </label>
                    <select
                        id="periode"
                        v-model="periode"
                        @change="onPeriodeChange"
                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-0"
                    >
                        <option value="today">Aujourd'hui</option>
                        <option value="week">Cette semaine</option>
                        <option value="month">Ce mois</option>
                        <option value="custom">Personnalisé</option>
                    </select>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label for="from" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            de :
                        </label>
                        <input
                            id="from"
                            v-model="from"
                            type="date"
                            :disabled="periode !== 'custom'"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-0 disabled:opacity-60"
                        >
                    </div>
                    <div>
                        <label for="to" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            à :
                        </label>
                        <input
                            id="to"
                            v-model="to"
                            type="date"
                            :disabled="periode !== 'custom'"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-0 disabled:opacity-60"
                        >
                    </div>
                </div>

                <div class="flex flex-col sm:flex-row gap-3">
                    <button
                        type="button"
                        @click="printReport('sales')"
                        class="flex-1 rounded-lg bg-cyan-400 hover:bg-cyan-500 text-white font-medium text-sm px-5 py-3 text-center shadow-sm transition-colors"
                    >
                        Imprimer Rapport ventes
                    </button>

                    <button
                        type="button"
                        @click="printReport('charge')"
                        class="flex-1 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-medium text-sm px-5 py-3 text-center shadow-sm transition-colors"
                    >
                        Imprimer Rapport Charge
                    </button>

                    <button
                        type="button"
                        @click="printReport('global')"
                        class="flex-1 rounded-lg bg-indigo-700 hover:bg-indigo-800 text-white font-medium text-sm px-5 py-3 text-center shadow-sm transition-colors"
                    >
                        Imprimer Etat global
                    </button>
                </div>
            </div>

        </div>
</template>

<script setup>

import { useStatisticStore } from '@/stores/backoffice/statistic'
import { useAlertStore } from '@/stores/alert'
import { useAuthStore } from '@/stores/backoffice/auth'
import { ref,onMounted, watch } from "vue";    
import { useRouter } from 'vue-router'
import moment from 'moment'

import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/vue/20/solid";
import { PhoneIcon, ShoppingCartIcon, TruckIcon, ArchiveBoxXMarkIcon } from '@heroicons/vue/24/outline'
import {
    UsersIcon,
    ShoppingBagIcon,
    BanknotesIcon,
    ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'

const statisticModel = useStatisticStore()
const alertModel = useAlertStore()
const authModel = useAuthStore()
const isLoading = ref(true)
const selectDateMethod = ref('TODAY')
const totalOrders = ref(0)
const totalPayments = ref(0)
const creditInital =ref(0)
const router = useRouter()

const periode = ref('today')
const from = ref(moment().format('YYYY-MM-DD'))
const to = ref(moment().format('YYYY-MM-DD'))
const type = ref('')

function onPeriodeChange() {
    if (periode.value === 'today') {
        from.value = moment().format('YYYY-MM-DD')
        to.value = moment().format('YYYY-MM-DD')
    } else if (periode.value === 'week') {
        from.value = moment().startOf('week').format('YYYY-MM-DD')
        to.value = moment().endOf('week').format('YYYY-MM-DD')
    } else if (periode.value === 'month') {
        from.value = moment().startOf('month').format('YYYY-MM-DD')
        to.value = moment().endOf('month').format('YYYY-MM-DD')
    }
}

function printReport(t) {
    console.log(t)
    const query = {
        from: from.value,
        to: to.value,
    }
    
    type.value = t ;

   
   

    if(type.value == 'charge'){
        console.log('charge')
        const routeData1 = router.resolve({ path: '/backoffice/status_charge/print', query })
        window.open(routeData1.href, '_blank')
    }

    if(type.value == 'sales'){
        const routeData2 = router.resolve({ path: '/backoffice/status_sales/print', query })
        window.open(routeData2.href, '_blank')
    }

    if(type.value == 'global'){
        const routeData3 = router.resolve({ path: '/backoffice/status_global/print', query })
        window.open(routeData3.href, '_blank')
    }

    
    
}

onMounted( async() => {
    if(authModel.hasPermission('statistic-summary')){
        alertModel.clear()
        await statisticModel.getSummary()
        isLoading.value = false
    }

    if(authModel.hasPermission('stock-summary')){
        alertModel.clear()
        await statisticModel.getStockSummary()
        isLoading.value = false
    }

    if(authModel.hasPermission('client-credit')){
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
})

watch(selectDateMethod, async() => {
    isLoading.value = true
    alertModel.clear()
    await statisticModel.getSummary(getParams())
    isLoading.value = false
})

function getParams() {
    let date;

    if(selectDateMethod.value == 'TODAY'){
        date = new Date();
    }
    else if(selectDateMethod.value == 'LAST7'){
        date = new Date().setDate(new Date().getDate() - 7);
    }else{
        date = new Date().setDate(new Date().getDate() - 30)
    }
    
    return {
        created_after:new Date(date).toJSON()
    }

}

const stats = [
  { name: 'Number of deploys', value: '405' },
  { name: 'Average deploy time', value: '3.65', unit: 'mins' },
  { name: 'Number of servers', value: '3' },
  { name: 'Success rate', value: '98.5%' },
]

</script>
