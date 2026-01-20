import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth';
import { useAlertStore } from '@/stores/alert';
import axios from "axios"

const baseUrl = `https://storeapi.scentavenue.shop/api/backoffice/categories`;

export const  useCategoryStore = defineStore('categories',() => {

    const categories = ref([])    

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
            this.categories = response.data.data;
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
            alert.success("Category Deleted Successfully", null, "modal", 3000)
            return { status: true}

        } catch (error) {
            return { status: false }
        }
    }


    async function update(id, category){
        try {
            const response = await axios.put(
                baseUrl + '/' + id,category,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            alert.success("Category Updated Successfully", null, "modal", 3000)
            return { status: true}

        } catch (error) {
            return { status: false }
        }
    }



    return {categories, pagination, page, per_page, getAll, store, destroy, update}
});