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
</template>

<script setup>

import { useStatisticStore } from '@/stores/backoffice/statistic'
import { useAlertStore } from '@/stores/alert'
import { useAuthStore } from '@/stores/backoffice/auth'
import { ref,onMounted, watch } from "vue";    
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/vue/20/solid";
import { PhoneIcon, ShoppingCartIcon, TruckIcon, ArchiveBoxXMarkIcon } from '@heroicons/vue/24/outline'


const statisticModel = useStatisticStore()
const alertModel = useAlertStore()
const authModel = useAuthStore()
const isLoading = ref(true)
const selectDateMethod = ref('TODAY')

onMounted( async() => {
    if(authModel.hasPermission('statistic-summary')){
        alertModel.clear()
        await statisticModel.getSummary()
        isLoading.value = false
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

</script>
