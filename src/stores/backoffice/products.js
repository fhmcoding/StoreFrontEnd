import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth';
import { useAlertStore } from '@/stores/alert';
import axios from "axios"

const baseUrl = `http://storeapi.fhmcoding.com/api/backoffice/products`;

export const  useProductStore = defineStore('products',() => {

    const products = ref([])    
    const product = ref('')

    const pagination = ref('')
    const page = ref(1)
    const per_page = ref(10)

    
    const alert = useAlertStore()
    const auth = useAuthStore()

    async function getList(){
        try {
            const response = await axios.get(
                baseUrl+'/list',
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            this.products = response.data.data;
            this.pagination = response.data.meta;

        } catch (error) {
            console.log(error);
            console.log('get users error')
        }
    }

    async function getAll(){
        try {
            const response = await axios.get(
                baseUrl+'?include=brand,category'+'&per_page='+per_page.value+'&page='+page.value,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            this.products = response.data.data;
            this.pagination = response.data.meta;

        } catch (error) {
            console.log('get users error')
        }
    }

    async function getById(id){
        try {
            const response = await axios.get(
                baseUrl+'/'+id+'?include=category,brand,images',
                {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${auth.token}`
                },
                }
            );
            this.product = response.data
        } catch (error) {
            console.log('get users error')
        }
    }

    async function store(product){
        try {
            const response = await axios.post(
                baseUrl, product,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            alert.success("Product Created Successfully", null, "modal", 3000)
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
            alert.success("Product Deleted Successfully", null, "modal", 3000)
            return { status: true}

        } catch (error) {
            return { status: false }
        }
    }

    async function removeImge(id){
        try {
            const response = await axios.delete(
                baseUrl + '/image/' + id,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            alert.success("Product Image Deleted Successfully", null, "modal", 3000)
            return { status: true}

        } catch (error) {
            return { status: false }
        }
    }

    async function update(id, product){
        try {
            const response = await axios.put(
                baseUrl + '/' + id,product,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            alert.success("Product Updated Successfully", null, "modal", 3000)
            return { status: true}

        } catch (error) {
            return { status: false }
        }
    }



    return {product, products, pagination, page, per_page, getList,getAll, getById, store, destroy, update, removeImge}
});