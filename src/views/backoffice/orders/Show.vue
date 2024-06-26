<template>
    <nav
        class="mb-3 px-3 py-3 text-gray-700 dark:text-gray-50 bg-white dark:bg-gray-800 rounded-md p-3"
        aria-label="Breadcrumb"
    >
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
                <RouterLink
                    to="/backoffice"
                    class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-white dark:hover:text-white"
                >
                    <svg
                        aria-hidden="true"
                        class="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                        ></path>
                    </svg>
                    Dashboard
                </RouterLink>
            </li>
            <li aria-current="page">
                <div class="flex items-center">
                    <svg
                        aria-hidden="true"
                        class="w-6 h-6 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                    <RouterLink to="/backoffice/orders">
                        <span
                            class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-300"
                            >Orders</span
                        >
                    </RouterLink>
                </div>
            </li>
            <li aria-current="page">
                <div class="flex items-center">
                    <svg
                        aria-hidden="true"
                        class="w-6 h-6 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                    <span
                        class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-300"
                        >Order Page</span
                    >
                </div>
            </li>
        </ol>
    </nav>
    <Alert />

    <div
        class="md:bg-white md:bg-gray-150 md:rounded-lg md:shadow-md dark:bg-gray-800 mb-5"
    >
        <div class="p-4 flex justify-between">
            <h1
                class="my-auto text-xl font-semibold text-gray-900 dark:text-gray-50"
            >
                Order Details
            </h1>
        </div>

        <hr class="dark:border-gray-600 hidden md:block" />
        <div class="p-4 ">
            <form
                class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16"
            v-if='orderModel.order.products != undefined'>
                <section aria-labelledby="cart-heading" class="lg:col-span-7">
                    <div class="flex items-center justify-between">
                        <h5>Order Reference</h5>
                        <h4>{{orderModel.order.order_ref}}</h4>
                    </div>
                    <div class="flex items-center justify-between">
                        <h5>Order Status</h5>
                        <h4>{{orderModel.order.status}}</h4>
                    </div>
                    <div class="flex items-center justify-between">
                        <h5>Placed At</h5>
                        <h4>{{formatDate(orderModel.order.created_at)}}</h4>
                    </div>

                    <ul
                        role="list"
                        class="divide-y divide-gray-200 "
                    >
                        <li
                            v-for="item in orderModel.order.products"
                            :key="item.id"
                            class="flex p-4 gap-2  border border-gray-100 rounded-md mb-1"
                        >
                            <div class="flex-shrink-0">
                                <img
                                    :src="item.image_url"
                                    :alt="item.image_url"
                                    class="h-20 w-20 rounded-md object-cover object-center sm:h-20 sm:w-20"
                                />
                            </div>

                            <div
                                class="flex flex-1 flex-col justify-between"
                            >
                                <div
                                    class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0"
                                >
                                    <div>
                                        <div class="flex justify-between">
                                            <h3 class="text-sm">
                                                <RouterLink
                                                    :to="
                                                        '/poducts/' +
                                                        item.id
                                                    "
                                                    class=" font-semibold text-gray-800 hover:text-gray-800"
                                                    >{{
                                                        item.name
                                                    }}</RouterLink
                                                >
                                            </h3>
                                        </div>
                                        
                                        <p
                                            class="mt-1 text-sm font-medium text-gray-900"
                                        >
                                            {{ item.pivot.price }} x  {{ item.pivot.quantity}}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </section>

                <!-- Order summary -->
                <section
                    aria-labelledby="summary-heading"
                    class="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
                >
                    <h2
                        id="summary-heading"
                        class="text-lg font-medium text-gray-900"
                    >
                        Order summary
                    </h2>

                    <dl class="mt-6 space-y-4">
                        <div class="flex items-center justify-between">
                            <dt class="text-sm text-gray-600">Subtotal</dt>
                            <dd class="text-sm font-medium text-gray-900">
                                {{
                                    orderModel.order.sub_total
                                }}
                                {{orderModel.order.currency}}
                            </dd>
                        </div>
                        <div
                            class="flex items-center justify-between border-t border-gray-200 pt-4"
                        >
                            <dt class="flex items-center text-sm text-gray-600">
                                <span>Shipping estimate</span>
                                <a
                                    href="#"
                                    class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                                >
                                    <span class="sr-only"
                                        >Learn more about how shipping is
                                        calculated</span
                                    >
                                    <QuestionMarkCircleIcon
                                        class="h-5 w-5"
                                        aria-hidden="true"
                                    />
                                </a>
                            </dt>
                            <dd class="text-sm font-medium text-gray-900">
                                {{orderModel.order.delivery_fee}} {{orderModel.order.currency}}
                            </dd>
                        </div>

                        <div
                            class="flex items-center justify-between border-t border-gray-200 pt-4"
                        >
                            <dt class="text-base font-medium text-gray-900">
                                Order total
                            </dt>
                            <dd class="text-base font-medium text-gray-900">
                                {{
                                    orderModel.order.total
                                }}
                                {{orderModel.order.currency}}
                            </dd>
                        </div>
                    </dl> 
                </section>
            </form>
        </div>
    </div>
</template>

<script setup>


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

import { useAlertStore } from '@/stores/alert'
import { useOrderStore } from '@/stores/backoffice/orders'
import { useAuthStore } from '@/stores/backoffice/auth'

import Alert from '@/components/Alert.vue'

import moment from 'moment'
import { ref,onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'


const auth = useAuthStore() 
const alertModel = useAlertStore()
const orderModel = useOrderStore()
const isLoading = ref(true)
const route = useRoute()
const router = useRouter()


const statusClass = {
    pending:'bg-indigo-500 text-white',
    confirmed:'bg-green-500 text-white',
    delivered:'bg-orange-500 text-white',
    returned:'bg-red-500 text-white',
    cancelled:'bg-yellow-500 text-white',
    on_hold:'bg-gray-500 text-white',
    in_transit:'bg-blue-500 text-white',
}

const formatDate = (value) => {
    return moment(value).format('DD MMM YYYY, hh:mm A')
}
onMounted( async() => {
    console.log(route.params.id);
    await orderModel.getById(route.params.id)
    isLoading.value = false
})

</script>