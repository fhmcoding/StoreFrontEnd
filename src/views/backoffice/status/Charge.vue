<template>
    <div v-if="isLoading" class="inline-flex justify-center">
        <span class="animate-spin h-6 w-6 mr-2" viewBox="0 0 24 24">
            <IconLoader class="h-6 w-6" aria-hidden="true" />
        </span>
    </div>
    <div v-else class="font-serif text-black px-4 py-4 max-w-[700px] mx-auto">

        <h1 class="text-center text-2xl font-bold mb-6">Rapport Des Charges</h1>

        <div class="text-sm mb-1">
            <span>Date d'impression : </span>
            <span>{{ printedAt }}</span>
        </div>

        <div class="text-sm mb-1">
            <span>Période : de </span>
            <span>{{ created_from }}</span>
            <span> à </span>
            <span>{{ created_to }}</span>
        </div>


        <table class="w-full border-collapse border border-black text-sm">
            <thead>
                <tr>
                    <th class="border border-black px-2 py-1 text-left w-[110px]">Date</th>
                    <th class="border border-black px-2 py-1 text-left">User</th>
                    <th class="border border-black px-2 py-1 text-left">Designation</th>
                    <th class="border border-black px-2 py-1 text-right w-[120px]">Montant</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="expenseModel.expenses.length === 0">
                    <td class="border border-black px-2 py-3 text-center text-gray-500" colspan="3">Aucune charge sur cette période</td>
                </tr>
                <tr v-for="(item, index) in expenseModel.expenses" :key="index">
                    <td class="border border-black px-2 py-1 align-top">{{ formatDate(item.created_at) }}</td>
                    <td class="border border-black px-2 py-1 align-top"><span v-if="item.user !== null">{{ item.user.first_name }} {{ item.user.last_name }}</span></td>
                    <td class="border border-black px-2 py-1 align-top">{{ item.refernece }}</td>
                    <td class="border border-black px-2 py-1 align-top text-right">{{ Number(item.amount).toFixed(2) }}</td>
                </tr>
                <tr>
                    <td class="border border-black px-2 py-1" colspan="2">Total :</td>
                    <td class="border border-black px-2 py-1 text-right font-semibold">{{ total.toFixed(2) }}</td>
                </tr>
            </tbody>
        </table>

        <div class="mt-4 text-base font-semibold">
            Total Globale : {{ total.toFixed(2) }} DH
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { IconLoader } from '@tabler/icons-vue'
import { useRoute } from 'vue-router'
import moment from 'moment'
import { useExpenseStore } from '@/stores/backoffice/expenses'
import { useAuthStore } from '@/stores/backoffice/auth'

const isLoading = ref(true)
const route = useRoute()
const expenseModel = useExpenseStore()
const auth = useAuthStore()

const created_from = route.query.from ?? moment().format('YYYY-MM-DD')
const created_to = route.query.to ?? moment().format('YYYY-MM-DD')

const printedAt = moment().format('HH:mm:ss')
const total = ref(0)

const formatDate = (value) => {
    return moment(value).format('DD/MM/YYYY')
}

onMounted(async () => {
    expenseModel.per_page = 200
    expenseModel.created_from = created_from
    expenseModel.created_to = created_to
    await expenseModel.getAll()

    total.value = expenseModel.expenses.reduce((sum, item) => sum + Number(item.amount), 0)

    isLoading.value = false

    setTimeout(() => {
        if (isLoading.value == false) {
            window.print()
        }
    }, 500)
})
</script>