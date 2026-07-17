import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth';
import { useAlertStore } from '@/stores/alert';
import axios from "axios"

const baseUrl = `https://storeapi.scentavenue.shop/api/backoffice/expenses`;

export const  useExpenseStore = defineStore('expenses',() => {

    const created_at = ref('')
    const created_from = ref('')
    const created_to = ref('')

    const expenses = ref([])    

    const pagination = ref('')
    const page = ref(1)
    const per_page = ref(10)

    
    const alert = useAlertStore()
    const auth = useAuthStore()

    

    async function getAll(){
        try {
            const response = await axios.get(
                baseUrl+`?include=user`+`&per_page=`+per_page.value+`&page=`+page.value + 
                `${created_at.value !== '' ? '&filter[created_at]='+created_at.value : ''}`+
                `${created_from.value !== '' ? '&filter[created_from]=' + created_from.value : ''}` +
                `${created_to.value !== '' ? '&filter[created_to]=' + created_to.value : ''}`,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            this.expenses = response.data.data;
            this.pagination = response.data.meta;

        } catch (error) {
            console.log('get users error')
        }
    }

    async function store(category){
        try {
            const response = await axios.post(
                baseUrl, category,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            alert.success("Category Created Successfully", null, "modal", 3000)
            return { status: true}
        } catch (error) {
            return { status: false }
        }
    }


    
    return {expenses, pagination, page, per_page, created_at, created_from, created_to, getAll, store}
});