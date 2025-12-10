<template>
  <div class="bg-white">
   
    <main class="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>

        <div class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section aria-labelledby="cart-heading" class="lg:col-span-7">
                <div class="bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"> 
                    <div class="my-2 flex items-center gap-2">  
                        <div class="w-1/2"> 
                            <label for="firstName" class="block text-sm font-medium leading-6 text-gray-900">First name</label>
                            <div class="mt-2">
                                <input id="firstName" v-model="customer.first_name" name="firstName" placeholder="Given name" type="text" autocomplete="firstName" required="" class="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#C1AC6B] sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div class="w-1/2"> 
                            <label for="Surname" class="block text-sm font-medium leading-6 text-gray-900">Last name </label>
                            <div class="mt-2">
                                <input id="Surname"  v-model="customer.last_name" name="Surname" placeholder="Last Name" type="text" autocomplete="Surname" required="" class="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#C1AC6B] sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                    </div>
                    <div class="my-2">
                        <label for="phone" class="block text-sm font-medium leading-6 text-gray-900">Phone</label>
                        <div class="mt-2">
                            <input id="phone" v-model="customer.phone_number" name="phone" placeholder="Phone" type="text" autocomplete="phone" required="" class="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#C1AC6B] sm:text-sm sm:leading-6" />
                        </div>
                    </div>    
                    <div class="mt-6">
                        <button @click="submit()" class="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                            <span v-if="IsSubmitting">
                                loading...
                            </span> 
                            <span v-else>Checkout</span>
                        </button>
                    </div>
                </div>            
            </section>

            <!-- Order summary -->
            <section aria-labelledby="summary-heading" class="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
                <h2 id="summary-heading" class="text-lg font-medium text-gray-900">Order summary</h2>

                <dl class="mt-6 space-y-4">
                    <div>
                    <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>
                    
                    <ul role="list" class="divide-y divide-gray-200 border-t border-b border-gray-200">
                        <li v-for="item in cartModel.cart" :key="item.product_id" class="flex py-2 sm:py-2">
                            <div class="flex-shrink-0">
                                <img :src="item.product.image_url" :alt="item.product.image_url" class="h-[50px] w-[50px] rounded-md object-cover object-center sm:h-20 sm:w-20" />
                            </div>

                            <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                <div>
                                    <div class="flex justify-between">
                                        <h3 class="text-sm">
                                            <RouterLink :to="'/poducts/'+item.product.id" class="font-medium text-gray-700 hover:text-gray-800">{{ item.product.title }}</RouterLink>
                                        </h3>
                                    </div>
                                    <p class="mt-1 text-sm font-semibold text-gray-900" v-if="item.product.offers.length == 0 ">{{ item.price }}</p> 
                                    <div v-else class="flex items-center gap-2">
                                       <p class="mt-1 text-sm font-meduim line-through text-gray-700" >{{ item.product.price }}</p> 

                                        <p class="mt-1 text-sm font-semibold text-gray-900" >{{ item.price }}</p> 

                                    </div>

                                </div>

                                <div class="mt-4 sm:mt-0 sm:pr-9">
                                
                                    <div class="absolute top-0 right-0">
                                    <button type="button" class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500" @click="cartModel.remove(item)">
                                        <span class="sr-only">Remove</span>
                                        <XMarkIconMini class="h-5 w-5" aria-hidden="true" />
                                    </button>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                    <div class="flex items-center justify-between">
                    <dt class="text-sm text-gray-600">Subtotal</dt>
                    <dd class="text-sm font-medium text-gray-900">{{ cartModel.cart.reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity),0) }} MAD</dd>
                    </div>
                    <div class="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt class="flex items-center text-sm text-gray-600">
                        <span>Shipping estimate</span>
                        <a href="#" class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                        <span class="sr-only">Learn more about how shipping is calculated</span>
                        <QuestionMarkCircleIcon class="h-5 w-5" aria-hidden="true" />
                        </a>
                    </dt>
                    <dd class="text-sm font-medium text-gray-900">00.00 MAD</dd>
                    </div>
                    
                    <div class="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt class="text-base font-medium text-gray-900">Order total</dt>
                    <dd class="text-base font-medium text-gray-900">{{ cartModel.cart.reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity),0) + 25}} MAD</dd>
                    </div>
                </dl>           
            </section>
        </div>

        <section
            aria-labelledby="related-heading"
            class="mt-10 border-t border-gray-200 py-16 px-4 sm:px-0"
        >
            <h2
                id="related-heading"
                class="text-xl font-bold text-gray-900"
            >
                Customers also bought
            </h2>
            <div
                class="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
            >
                <div
                    v-for="product in productModel.products"
                    :key="product.id"
                >
                    <Product :product="product" />
                </div>
            </div>
        </section>
    </main>

  </div>
</template> 

<script setup>
import { useProductStore } from "@/stores/client/products";
import { useCartStore } from "@/stores/client/cart";
import Product from "@/components/Product.vue";
import { ref, onMounted } from "vue";


import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon as XMarkIconOutline,
} from '@heroicons/vue/24/outline'
import { CheckIcon, ClockIcon, QuestionMarkCircleIcon, XMarkIcon as XMarkIconMini } from '@heroicons/vue/20/solid'
import {  useRouter } from 'vue-router'


const router = useRouter()
const isLoading = ref(true)
const IsSubmitting  = ref(false)
const productModel = useProductStore()
const cartModel = useCartStore()
const customer = ref({
    first_name:'',
    last_name:'',
    phone_number:'',
    city:'laayoune'
}) 

const submit = async () => {
    IsSubmitting.value = true
    
    await cartModel.checkout({
        customer:customer.value,
        products:cartModel.cart
    })


    router.push('/thank')

}
onMounted(async () => {
    isLoading.value = true;
    await productModel.getAll();
    isLoading.value = false;
});
</script>