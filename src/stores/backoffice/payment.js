import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth';
import { useAlertStore } from '@/stores/alert';
import axios from "axios"

const baseUrl = `https://storeapi.scentavenue.shop/api/backoffice/payments`;

export const usePaymentStore = defineStore('payment', () => {

    const payment = ref('')
    const payments = ref([])

    const pagination = ref('')
    const page = ref(1)
    const per_page = ref(10)

    const alert = useAlertStore()
    const auth = useAuthStore()

    async function getAll(user_id = null){
        try {
            const response = await axios.get(
                baseUrl+'?include=order'+'&per_page='+per_page.value+'&page='+page.value +  `&${user_id !== null ? '&filter[user_id]='+user_id : ''}`,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            this.payments = response.data.data;
            this.pagination  = response.data.meta;
        } catch (error) {
            console.log('get users error')
        }
    }


    async function updatePaymentStatus(id, status){
        try {
            const response = await axios.put(
                baseUrl + '/' + id,{status:status},
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            alert.success("Payment Updated Successfully", null, "modal", 3000)
            return { status: true}

        } catch (error) {
            return { status: false }
        }
    }

    async function createPayment(data){
        console.log(data);
         try {
            const response = await axios.post(
                baseUrl, data,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            alert.success("Payment Created Successfully", null, "modal", 3000)
            return { status: true}
        } catch (error) {
            alert.danger("error", error.response.data.message, "block")
            return { status: false }
        }
    }

    
    return { payment, payments,pagination, getAll,updatePaymentStatus,createPayment }
})
