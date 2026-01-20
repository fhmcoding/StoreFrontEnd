import { ref } from 'vue'
import { defineStore } from 'pinia'

import axios from "axios"

const baseUrl = `https://storeapi.scentavenue.shop/api/categories`;

export const  useCategoryStore = defineStore('categories',() => {

    const categories = ref([])    

    const pagination = ref('')
    const page = ref(1)
    const per_page = ref(10)

    
   
    async function getAll(){
        try {
            const response = await axios.get(
                baseUrl+'?include=productsCount'+'&per_page='+per_page.value+'&page='+page.value
            );
            this.categories = response.data.data;
            this.pagination = response.data.meta;

        } catch (error) {
            
        }
    }


    return {categories, pagination, page, per_page, getAll}
});