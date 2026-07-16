import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth';
import { useAlertStore } from '@/stores/alert';
import axios from "axios"

const baseUrl = `https://storeapi.scentavenue.shop/api/backoffice/statistic`;

export const useStatisticStore = defineStore('statistic', () => {

    const summary = ref('')
    const stock = ref('')
    const credit = ref('')

    
    const auth = useAuthStore()

    async function getSummary(payload = {}){
        try {
            const response = await axios.get(
                baseUrl+'/summary',
                {
                    params:payload,
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    }
                },
                
            );
            this.summary = response.data;
        } catch (error) {
            console.log('get summary error')
        }
    }

    async function getStockSummary(payload = {}){
        try {
            const response = await axios.get(
                baseUrl+'/stock',
                {
                    params:payload,
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    }
                },
                
            );
            this.stock = response.data;
            this.credit = response.data.creditClients
        } catch (error) {
            console.log('get stock error')
        }
    }


    async function getCreditSummary(payload = {}){
        try {
            const response = await axios.get(
                baseUrl+'/credit',
                {
                    params:payload,
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    }
                },
                
            );
            this.credit = response.data;
        } catch (error) {
            console.log('get credit error')
        }
    }




    return { summary, stock, credit, getSummary, getStockSummary, getCreditSummary }
})
