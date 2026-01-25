import { ref ,computed} from 'vue'
import { defineStore } from 'pinia'
import axios from "axios"

const baseUrl = `https://storeapi.scentavenue.shop/api`;

export const  useCaisseStore = defineStore('caisse',() => {

   const cart = ref([])


    const cartCount = computed(() => cart.value.length)
    const cartTotal = computed(() => {
        let total = 0;
        cart.value.forEach((e) => {

            if(e.product.offers.length > 0){
                total += e.product.offers[0].pivot.price * e.quantity
            }else{ 
                total += e.price * e.quantity
            }
        })

        return total
    })

    const inCart = computed(() => {
        return (productId) => cart.value.find((item) => item.product_id == productId) !== undefined;
    })

    async function add(product) {
        console.log(product)
        if(cart.value.find((item) => item.product_id == product.product_code) !== undefined){
            increment(product);
            return cart.value;
        }
        cart.value = [...cart.value,{
            product_id:product.product_code,
            quantity:1,
            price:product.offers.length > 0 ? product.offers[0].pivot.price : product.price,
            product:product
        }]
        localStorage.setItem('cart', JSON.stringify(cart.value));
        console.log(cart.value)
        return cart.value   
    }

    function increment(product,quantity = 1){
        let indeOf = cart.value.indexOf(product);
        cart.value[indeOf].quantity = cart.value[indeOf].quantity +  quantity;
        localStorage.setItem('cart', JSON.stringify(cart.value));
        return cart.value
    }

    function disincrement(product,quantity = 1){
        let indeOf = cart.value.indexOf(product);
        cart.value[indeOf].quantity = cart.value[indeOf].quantity -  quantity;
        if(cart.value[indeOf].quantity <= 0){
            remove(product)
        }

        localStorage.setItem('cart', JSON.stringify(cart.value));

        return cart.value
    }


    async function remove(product){
        if(cart.value.find((item) => item.product_id == product.product_id) !== undefined){
            cart.value = cart.value.filter((item) => item.product_id !== product.product_id);
        } 

        localStorage.setItem('cart', JSON.stringify(cart.value));
    }
    
    

    async function checkout(payload){
        
                        // "Authorization":`Bearer ${localStorage.getItem('token')}`
        try {
            const response = await axios.post(
                baseUrl+'/checkout',payload,
                {
                    "Authorization":`Bearer ${localStorage.getItem('token')}`
                }
            );

            console.log(response);
            cart.value = [];
            localStorage.setItem('cart', JSON.stringify(cart.value));


        } catch (error) {
            
        }
        return true;
    }

    return {cart ,cartCount, cartTotal, checkout, add, increment, disincrement,remove, inCart}
});