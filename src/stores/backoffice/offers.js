import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth';
import { useAlertStore } from '@/stores/alert';
import axios from "axios"

const baseUrl = `http://127.0.0.1:8000/api/backoffice/offers`;

export const  useOfferStore = defineStore('offers',() => {

    const offers = ref([])    

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
            this.offers = response.data.data;
            this.pagination = response.data.meta;

        } catch (error) {
            console.log('get users error')
        }
    }

    async function store(offer){
        console.log(offer)

        try {
            const response = await axios.post(
                baseUrl, offer,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            alert.success("Offer Created Successfully", null, "modal", 3000)
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
            alert.success("Offer Deleted Successfully", null, "modal", 3000)
            return { status: true}

        } catch (error) {
            return { status: false }
        }
    }


    async function update(id, offer){
        try {
            const response = await axios.put(
                baseUrl + '/' + id,offer,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            alert.success("Offer Updated Successfully", null, "modal", 3000)
            return { status: true}

        } catch (error) {
            return { status: false }
        }
    }


    async function deleteProduct(offer_id,product_id) {
        try {
            const response = await axios.delete(
                baseUrl + '/' + offer_id + '/delete_product/' + product_id,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            alert.success("Offer Product Deleted Successfully", null, "modal", 3000)
            return { status: true}

        } catch (error) {
            return { status: false }
        }
    }


    return {offers, pagination, page, per_page, getAll, store, destroy, update, deleteProduct}
});