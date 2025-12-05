import { ref ,computed} from 'vue'
import { defineStore } from 'pinia'
import axios from "axios"

const baseUrl = `http://127.0.0.1:8000/api`;

export const  useCartStore = defineStore('cart',() => {

    const cart = ref([])    

    const cartCount = computed(() => cart.value.length)
    const cartTotal = computed(() => {
        let total = 0;
        cart.value.forEach((e) => {
            total += e.price * e.quantity
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
            price:product.price,
            product:product
        }]

        console.log(cart.value)
        return cart.value   
    }

    function increment(product,quantity = 1){
        let indeOf = cart.value.indexOf(product);
        cart.value[indeOf].quantity = cart.value[indeOf].quantity +  quantity;
        
        return cart.value
    }

    function disincrement(product,quantity = 1){
        let indeOf = cart.value.indexOf(product);
        cart.value[indeOf].quantity = cart.value[indeOf].quantity -  quantity;
        if(cart.value[indeOf].quantity <= 0){
            remove(product)
        }

        return cart.value
    }


    async function remove(product){
        if(cart.value.find((item) => item.product_id == product.product_id) !== undefined){
            cart.value = cart.value.filter((item) => item.product_id !== product.product_id);
        } 
    }
    
    

    async function checkout(payload){
        try {
            const response = await axios.post(
                baseUrl+'/checkout',payload
            );

            console.log(response);

        } catch (error) {
            
        }
        return true;
    }

    return {cart ,cartCount, cartTotal, checkout, add, increment, disincrement,remove, inCart}
});