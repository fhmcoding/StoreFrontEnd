import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios"


const baseUrl = `https://storeapi.fhmcoding.com/api/products`;

export const  useProductStore = defineStore('products',() => {

    const products = ref([])    
    const product = ref('')

    const pagination = ref('')
    const page = ref(1)
    const per_page = ref(10)

    
    
    

    async function getAll(payload = ''){
        try {
            const response = await axios.get(
                baseUrl+'?include=brand,category'+'&per_page='+per_page.value+'&page='+page.value+'&'+payload
            );
            this.products = response.data.data;
            this.pagination = response.data.meta;

        } catch (error) {
            console.log(error);
            console.log('get users error')
        }
    }

    async function getById(id){
        try {
            const response = await axios.get(
                baseUrl+'/'+id+'?include=category,brand,images'
            );
            this.product = response.data
        } catch (error) {
            console.log('get users error')
        }
    }




    return {product, products, pagination, page, per_page, getAll, getById}
});