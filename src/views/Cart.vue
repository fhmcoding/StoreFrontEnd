<template>
  <div class="bg-white">
   
    <main class="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>

      <form class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <section aria-labelledby="cart-heading" class="lg:col-span-7">
          <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>

          <ul role="list" class="divide-y divide-gray-200 border-t border-b border-gray-200">
            <li v-for="item in cartModel.cart" :key="item.product_id" class="flex py-6 sm:py-10">
              <div class="flex-shrink-0">
                <img :src="item.product.image_url" :alt="item.product.image_url" class="h-20 w-20 rounded-md object-cover object-center sm:h-20 sm:w-20" />
              </div>

              <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                  <div>
                    <div class="flex justify-between">
                      <h3 class="text-sm">
                        <RouterLink :to="'/poducts/'+item.product.id" class="font-medium text-gray-700 hover:text-gray-800">{{ item.product.name }}</RouterLink>
                      </h3>
                    </div>
                    <div class="mt-1 flex text-sm">
                      <p class="text-gray-500">{{ item.product.brand.name }}</p>
                      <p class="ml-4 border-l border-gray-200 pl-4 text-gray-500">{{ item.product.category.name }}</p>
                    </div>
                    <p class="mt-1 text-sm font-medium text-gray-900">{{ item.price }}</p>
                  </div>

                  <div class="mt-4 sm:mt-0 sm:pr-9">
                   
                    <div class="absolute top-0 right-0">
                      <button type="button" class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                        <span class="sr-only">Remove</span>
                        <XMarkIconMini class="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>

                
              </div>
            </li>
          </ul>
        </section>

        <!-- Order summary -->
        <section aria-labelledby="summary-heading" class="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
          <h2 id="summary-heading" class="text-lg font-medium text-gray-900">Order summary</h2>

          <dl class="mt-6 space-y-4">
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
              <dd class="text-sm font-medium text-gray-900">25.00 MAD</dd>
            </div>
            
            <div class="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt class="text-base font-medium text-gray-900">Order total</dt>
              <dd class="text-base font-medium text-gray-900">{{ cartModel.cart.reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity),0) + 25}} MAD</dd>
            </div>
          </dl>

          <div class="mt-6">
            <button type="submit" class="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">Checkout</button>
          </div>
        </section>
      </form>

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

const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    price: '$32.00',
    color: 'Sienna',
    inStock: true,
    size: 'Large',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in sienna.",
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    price: '$32.00',
    color: 'Black',
    inStock: false,
    leadTime: '3–4 weeks',
    size: 'Large',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
  },
  {
    id: 3,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35.00',
    color: 'White',
    inStock: true,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg',
    imageAlt: 'Insulated bottle with white base and black snap lid.',
  },
]

const open = ref(false)
const isLoading = ref(true)
const productModel = useProductStore()
const cartModel = useCartStore()


onMounted(async () => {
    isLoading.value = true;
    await productModel.getAll();
    isLoading.value = false;
});
</script>