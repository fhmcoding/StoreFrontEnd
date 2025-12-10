import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth';
import { useAlertStore } from '@/stores/alert';
import axios from "axios"

const baseUrl = `http://storeapi.fhmcoding.com/api/backoffice/orders`;

export const  useOrderStore = defineStore('orders',() => {

    const orders = ref([])    
    const order = ref('')

    const pagination = ref('')
    const page = ref(1)
    const per_page = ref(10)

    
    const alert = useAlertStore()
    const auth = useAuthStore()

    

    async function getAll(){
        try {
            const response = await axios.get(
                baseUrl+'?include=customer,productsCount'+'&per_page='+per_page.value+'&page='+page.value,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            this.orders = response.data.data;
            this.pagination = response.data.meta;

        } catch (error) {
            console.log('get users error')
        }
    }

    async function getById(id){
        try {
            const response = await axios.get(
                baseUrl+'/'+id+'?include=products,customer',
                {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${auth.token}`
                },
                }
            );
            console.log(response.data)
            this.order = response.data
        } catch (error) {
            console.log('get users error')
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
            alert.success("Order Deleted Successfully", null, "modal", 3000)
            return { status: true}

        } catch (error) {
            return { status: false }
        }
    }

    
    async function update(id, order){
        try {
            const response = await axios.put(
                baseUrl + '/' + id,order,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            alert.success("Order Updated Successfully", null, "modal", 3000)
            return { status: true}

        } catch (error) {
            return { status: false }
        }
    }



    return {order, orders, pagination, page, per_page, getAll, getById,  destroy, update}
});