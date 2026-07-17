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
            <li class="inline-flex items-center">
                <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                </svg>
                <RouterLink to="/backoffice/caisse" class="ml-1 text-sm font-medium text-gray-500 md:ml-2 hover:text-blue-600 dark:text-gray-300">Caisse</RouterLink>
            </li>
            <li aria-current="page">
                <div class="flex items-center">
                    <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-300">Etat Global</span>
                </div>
            </li>
        </ol>
    </nav>

    <Alert />

    <div class="md:bg-white bg-white rounded-lg shadow-md dark:bg-gray-800 mb-5 max-w-2xl mx-auto overflow-hidden">

        <div class="flex items-center justify-center py-6">
            <img src="/logo.png" class="w-[100px]">
        </div>

        <div class="px-4 sm:px-6 lg:px-8 pb-6">

            <div class="rounded-md overflow-hidden bg-gradient-to-r from-cyan-400 to-blue-600 px-5 py-3 mb-6 shadow-sm">
                <h1 class="text-white text-lg font-semibold italic">Etat Global</h1>
            </div>

       

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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import moment from 'moment'
import { useAuthStore } from '@/stores/backoffice/auth'
import Alert from '@/components/Alert.vue'

const router = useRouter()
const auth = useAuthStore()

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


</script>