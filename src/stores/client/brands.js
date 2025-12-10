import { ref } from 'vue'
import { defineStore } from 'pinia'

import axios from "axios"

const baseUrl = `http://storeapi.fhmcoding.com/api/brands`;

export const  useBrandStore = defineStore('brands',() => {

    const brands = ref([])    

    const pagination = ref('')
    const page = ref(1)
    const per_page = ref(10)

    
   
    async function getAll(){
        try {
            const response = await axios.get(
                baseUrl+'?include=productsCount'+'&per_page='+per_page.value+'&page='+page.value
            );
            this.brands = response.data.data;
            this.pagination = response.data.meta;

        } catch (error) {
            
        }
    }


    return {brands, pagination, page, per_page, getAll}
});