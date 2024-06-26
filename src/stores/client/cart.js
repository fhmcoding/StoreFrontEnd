import { ref ,computed} from 'vue'
import { defineStore } from 'pinia'
import axios from "axios"

const baseUrl = `http://127.0.0.1:8000/api/orders`;

export const  useCartStore = defineStore('cart',() => {

    const cart = ref([])    

    const cartCount = computed(() => {
        return () => cart.length;
    })

    const inCart = computed(() => {
        return (productId) => cart.value.find((item) => item.product_id == productId) !== undefined;
    })

    async function add(product) {
        if(cart.value.find((item) => item.product_id == product.id) !== undefined){
            increment(product);
            return cart.value;
        }
        cart.value = [...cart.value,{
            product_id:product.id,
            quantity:1,
            price:product.price,
            product:product
        }]
        return cart.value   
    }

    async function increment(product,quantity = 1){
        if(cart.value.find((item) => item.product_id == product.id) !== undefined){
            let indeOf = cart.value.indexOf(cart.value.find((item) => item.product_id == product.id));
            cart.value[indeOf].quantity = cart.value[indeOf].quantity +  quantity;
        }
    }

    async function disincrement(product,quantity = 1){
        if(cart.value.find((item) => item.product_id == product.id) !== undefined){
            let indeOf = cart.value.indexOf(cart.value.find((item) => item.product_id == product.id));
            cart.value[indeOf].quantity = cart.value[indeOf].quantity -  quantity;
            if(cart.value[indeOf].quantity <= 0){
                remove(product)
            }
        }
    }


    async function remove(product){
        if(cart.value.find((item) => item.product_id == product.id) !== undefined){
            cart.value = cart.value.filter((item) => item.product_id !== product.id);
        } 
    }
    
    

    return {cart, cartCount, add, increment, remove, inCart}
});