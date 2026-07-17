<template>
    <div v-if="isLoading" class="inline-flex justify-center">
        <span class="animate-spin h-6 w-6 mr-2" viewBox="0 0 24 24">
            <IconLoader class="h-6 w-6" aria-hidden="true" />
        </span>
    </div>
    <div v-else class="font-serif text-black px-3 py-4 max-w-[420px] mx-auto">

        <div class="flex items-center justify-center py-2">
            <img src="/logo.png" class="w-[100px]">
        </div>

        <div class="text-sm mb-3">
            <div class="flex items-center justify-between">
                <span>Période : </span>
                <span>{{ created_from }} → {{ created_to }}</span>
            </div>
            <div class="flex items-center justify-between mt-1" v-if="auth.user">
                <span>Agent : </span>
                <span>{{ auth.user.first_name }} {{ auth.user.last_name }}</span>
            </div>
        </div>

        <table class="w-full border-collapse text-[15px]">
            <thead>
                <tr class="border-2 border-black rounded-t-xl">
                    <th class="border-2 border-black rounded-tl-xl px-2 py-1 text-left italic font-semibold">Désignation</th>
                    <th class="border-2 border-black px-2 py-1 text-left italic font-semibold">Qté</th>
                    <th class="border-2 border-black px-2 py-1 text-left italic font-semibold">Montant</th>
                    <th class="border-2 border-black rounded-tr-xl px-2 py-1 text-left italic font-semibold">Marge</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(line, index) in salesLines" :key="index" class="border-b border-black/40">
                    <td class="px-2 py-2 align-top">{{ line.name }}</td>
                    <td class="px-2 py-2 align-top">{{ line.qty.toFixed(2) }}</td>
                    <td class="px-2 py-2 align-top">{{ line.montant.toFixed(2) }}</td>
                    <td class="px-2 py-2 align-top text-right">{{ line.marge.toFixed(2) }}</td>
                </tr>
            </tbody>
        </table>

        <div class="mt-3">
            <div class="flex items-center justify-between font-semibold text-[15px] border-t-2 border-black pt-2">
                <span>Totaux Des Vends :</span>
                <span>{{ totalMontant.toFixed(2) }}</span>
            </div>

            <div class="flex items-center justify-between mt-1" v-if="totalCash > 0">
                <span>Total Espece :</span>
                <span class="font-bold text-lg">{{ totalCash.toFixed(2) }}</span>
            </div>
            <div class="flex items-center justify-between mt-1" v-if="totalTpe > 0">
                <span>Total TPE :</span>
                <span class="font-bold text-lg">{{ totalTpe.toFixed(2) }}</span>
            </div>
            <div class="flex items-center justify-between mt-1" v-if="totalVirmo > 0">
                <span>Total Virement :</span>
                <span class="font-bold text-lg">{{ totalVirmo.toFixed(2) }}</span>
            </div>
            <div class="flex items-center justify-between mt-1" v-if="totalChique > 0">
                <span>Total Cheque :</span>
                <span class="font-bold text-lg">{{ totalChique.toFixed(2) }}</span>
            </div>

             <div class="flex items-center justify-between mt-1 text-red-600" v-if="totalCredit > 0">
                <span>Total Credit :</span>
                <span class="font-bold text-lg">{{ totalCredit.toFixed(2) }}</span>
            </div>

            <div class="flex items-center justify-between mt-2 font-semibold border-t border-black/40 pt-2">
                <span>Marge Totale :</span>
                <span>{{ totalMarge.toFixed(2) }} DH</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { IconLoader } from '@tabler/icons-vue'
import { useRoute } from 'vue-router'
import moment from 'moment'
import { useOrderStore } from '@/stores/backoffice/orders'
import { useAuthStore } from '@/stores/backoffice/auth'

const isLoading = ref(true)
const route = useRoute()
const orderModel = useOrderStore()
const auth = useAuthStore()

const created_from = route.query.from ?? moment().format('YYYY-MM-DD')
const created_to = route.query.to ?? moment().format('YYYY-MM-DD')
const user_id = route.query.user_id ?? null

const salesLines = ref([])
const totalMontant = ref(0)
const totalMarge = ref(0)
const totalCash = ref(0)
const totalTpe = ref(0)
const totalVirmo = ref(0)
const totalChique = ref(0)
const totalCredit = ref(0)

onMounted(async () => {
    orderModel.per_page = 200
    orderModel.created_from = created_from
    orderModel.created_to = created_to
    await orderModel.getAll(user_id)

    // Regroupe les produits vendus par désignation
    const grouped = {}

    orderModel.orders.forEach(order => {
        order.products.forEach(item => {
            const key = item.name

            if (!grouped[key]) {
                grouped[key] = { name: item.name, qty: 0, montant: 0, marge: 0 }
            }

            const qty = Number(item.pivot.quantity)
            const price = Number(item.pivot.price)
            const cost = Number(item.price ?? 0)

            grouped[key].qty += qty
            grouped[key].montant += price * qty
            grouped[key].marge += (price - cost) * qty
        })

        order.payments.forEach(payment => {
            if (payment.payment_method === 'cash') {
                totalCash.value += Number(payment.amount)
            } else if (payment.payment_method === 'tpe') {
                totalTpe.value += Number(payment.amount)
            } else if (payment.payment_method === 'virement') {
                totalVirmo.value += Number(payment.amount)
            } else if (payment.payment_method === 'cheque') {
                totalChique.value += Number(payment.amount)
            }
        })

        totalCredit.value += order.total - order.payments.reduce((sum, item) => { return sum + Number(item.amount);}, 0)  

    })

    salesLines.value = Object.values(grouped)
    totalMontant.value = salesLines.value.reduce((sum, l) => sum + l.montant, 0)
    totalMarge.value = salesLines.value.reduce((sum, l) => sum + l.marge, 0)

    isLoading.value = false

    setTimeout(() => {
         if (isLoading.value == false) {
             window.print()
         }
     }, 500)
})
</script>