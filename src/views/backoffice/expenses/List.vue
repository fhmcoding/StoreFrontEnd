<template>
     <!-- breadcrumb -->

    <nav class="mb-3 px-3 py-3 text-gray-700 dark:text-gray-50 bg-white dark:bg-gray-800 rounded-md p-3" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
                <RouterLink to="/user/dashboard" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-white dark:hover:text-white">
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
                    <span  class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-300">Expenses</span>
                </div>
            </li>
        </ol>
    </nav>

    <div class="md:bg-white md:bg-gray-150 md:rounded-lg md:shadow-md dark:bg-gray-800 mb-5">
        <div class="p-4 flex justify-between">
            <h1 class="my-auto text-xl font-semibold text-gray-900 dark:text-gray-50">Expenses</h1>
            
        </div>

        <hr class="dark:border-gray-600 hidden md:block" />

        <div class="overflow-auto overflow-x-auto "><!-- hidden md:block -->
            <table class="table-auto min-w-full max-w-full overflow-x-auto">
                <thead class="bg-gray-50 dark:bg-gray-700">
                    <tr class="dark:border-gray-700">
                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 dark:text-gray-300">Name</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">Amount</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">User</th>
                        <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-gray-900 dark:text-gray-300 text-center">Created at</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                    <tr v-if="isLoading" class="text-center text-gray-400"><td colspan="5" class="p-2">loading...</td></tr>
                    <tr v-else-if="expenseModel.expenses.length == 0" class="text-center text-gray-400"><td colspan="5" class="p-2">Empty</td></tr>
                    <tr v-else v-for="item in expenseModel.expenses" :key="item.name">
                        
                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 dark:text-gray-300 sm:pl-6">
                            {{ item.refernece }}
                        </td>
                       
                        <td class="whitespace-nowrap px-3 py-4 text-gray-500">
                            Total  {{ item.amount }}
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-gray-500">
                            <div v-if="item.user != undefined">  {{ item.user.first_name }} {{  item.user.last_name }}</div>
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {{ formatDate(item.created_at) }}
                        </td>
                        
                    </tr>
                </tbody>
            </table>
            
            <Pagination :links='expenseModel.pagination' :goToPage="goToPage" v-if='!isLoading && expenseModel.expenses.length > 0' />
        </div>
    </div>

    
</template>

<script setup>
import { useExpenseStore } from '@/stores/backoffice/expenses'
import { useAlertStore } from '@/stores/alert'
import { useAuthStore } from '@/stores/backoffice/auth'


import { onMounted , ref, watch} from 'vue'

import moment from 'moment'
import { TrashIcon, PencilSquareIcon, PlusCircleIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

import Alert from '@/components/Alert.vue'
import Pagination from '@/components/Pagination.vue'

const auth = useAuthStore()
const expenseModel = useExpenseStore()
const alertModel = useAlertStore()

const isLoading = ref(true)

onMounted(
    async () => {
        await expenseModel.getAll()
        isLoading.value = false
    }
)
  const formatDate = (value) => {
        return moment(value).format('DD MMM YYYY, hh:mm A')
    }

async function goToPage(page){
    console.log(page);
    isLoading.value = true
    expenseModel.page = page
    await expenseModel.getAll()
    isLoading.value = false
}

</script>