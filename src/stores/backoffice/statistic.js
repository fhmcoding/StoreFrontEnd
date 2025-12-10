import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth';
import { useAlertStore } from '@/stores/alert';
import axios from "axios"

const baseUrl = `https://storeapi.fhmcoding.com/api/backoffice/statistic`;

export const useStatisticStore = defineStore('statistic', () => {

    const summary = ref('')

    
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

    return { summary, getSummary }
})
