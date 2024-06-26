import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth';
import { useAlertStore } from '@/stores/alert';
import axios from "axios"

const baseUrl = `http://127.0.0.1:8000/api/backoffice/brands`;

export const  useBrandStore = defineStore('brands',() => {

    const brands = ref([])    

    const pagination = ref('')
    const page = ref(1)
    const per_page = ref(10)

    
    const alert = useAlertStore()
    const auth = useAuthStore()

    

    async function getAll(){
        try {
            const response = await axios.get(
                baseUrl+'?include=productsCount'+'&per_page='+per_page.value+'&page='+page.value,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            this.brands = response.data.data;
            this.pagination = response.data.meta;

        } catch (error) {
            console.log('get users error')
        }
    }

    async function store(brand){
        try {
            const response = await axios.post(
                baseUrl, brand,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            alert.success("Brand Created Successfully", null, "modal", 3000)
            return { status: true}
        } catch (error) {
            return { status: false }
        }
    }


    async function destroy(id){
        try {
            const response = await axios.delete(
                baseUrl + '/' + id,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            alert.success("Brand Deleted Successfully", null, "modal", 3000)
            return { status: true}

        } catch (error) {
            return { status: false }
        }
    }


    async function update(id, brand){
        try {
            const response = await axios.put(
                baseUrl + '/' + id,brand,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            alert.success("Brand Updated Successfully", null, "modal", 3000)
            return { status: true}

        } catch (error) {
            return { status: false }
        }
    }



    return {brands, pagination, page, per_page, getAll, store, destroy, update}
});