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

            <div class="flex items-center gap-2"> 
                <button type="button" class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-500 border hover:bg-gray-50" @click="changeStatusModel = true">Modifer</button>
            </div>
        </div>

        <hr class="dark:border-gray-600 hidden md:block" />
        <div class="p-4 ">
            <form
                class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16"
            v-if='orderModel.order.products != undefined'>
                <section aria-labelledby="cart-heading" class="lg:col-span-7">
                    <div class="flex items-center justify-between">
                        <h5>Order Reference</h5>
                        <h4> {{10000 + orderModel.order.id}}</h4>
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
                        class="divide-y divide-gray-200 mt-2 "
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
                                                        item.product.name
                                                    }} - {{ item.name }}</RouterLink
                                                >
                                            </h3>
                                        </div>
                                        <p class="mt-1 text-sm font-semibold text-gray-900" v-if="item.pivot.original_price == item.pivot.price ">{{ item.pivot.price }}</p> 
                                        <div v-else class="flex items-center gap-2">
                                            <p class="mt-1 text-sm font-meduim line-through text-gray-700" >{{ item.pivot.original_price }}</p> 
                                            <p class="mt-1 text-sm font-semibold text-gray-900" >{{ item.pivot.price }}</p> 
                                        </div>

                                       
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

     <TransitionRoot as="template" :show="changeStatusModel">
        <Dialog as="div" class="relative z-10" >
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>
                
            <div class="fixed inset-0 z-10 overflow-y-auto w-max-full sm:w-full">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 sm:w-full">
                    <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel class="relative transform overflow-hidden rounded-md dark:bg-gray-800 bg-white px-4 pt-5 pb-3 text-left shadow-xl transition-all sm:my-8 w-full max-w-full md:max-w-3xl sm:p-6 ">
                            <div class="border-b-2 border-gray-200 w-full py-2 mb-7 text-gray-500 text-lg">
                                Modifer Order : {{10000 + orderModel.order.id}}
                            </div>   


                            <div class="mb-2">
                                <label for="location" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                                <div class="mt-2 grid grid-cols-1">
                                    <select id="location" v-model="status" name="location" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6">
                                        <option>-----select----</option>
                                        <option value="pending">pending</option>
                                        <option value="confirmed">confirmed</option>
                                        <option value="in_transit">in transit</option>
                                        <option value="on_hold">on hold</option>
                                        <option value="delivered">delivered</option>
                                        <option value="returned">returned</option>
                                        <option value="cancelled">cancelled</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label for="user-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Remark Address</label>
                                <textarea v-model="remark" type="text" name="title" id="user-title" autocomplete="given-name" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
                            </div>

                            <div>
                                <label for="user_note" class="block text-sm font-medium text-gray-700 dark:text-gray-300">User Note</label>
                                <textarea v-model="user_note" type="text" name="user_note" id="user_note" autocomplete="given-name" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
                            </div>


                            <div class="mt-9 flex flex-row w-full content-center justify-center items-center space-x-2">
                                <button :disabled="IsSubmitting" @click="changeStatusModel = false"  type="button" class="button inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-xs sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                    Cancel
                                </button>
                                <button type="submit" @click="update()" :disabled="IsSubmitting" class="inline-flex bg-primary w-full justify-center rounded-md border border-transparent px-4 py-2 mx-1 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-xs sm:text-sm sm:w-auto">
                                    <span v-if="IsSubmitting" class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                        <Cog6ToothIcon class="h-5 w-5 text-white" aria-hidden="true" />
                                    </span>
                                    Update Offer
                                </button>
                            </div>



                            
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>

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
const IsSubmitting = ref(false)

const statusClass = {
    pending:'bg-indigo-500 text-white',
    confirmed:'bg-green-500 text-white',
    delivered:'bg-orange-500 text-white',
    returned:'bg-red-500 text-white',
    cancelled:'bg-yellow-500 text-white',
    on_hold:'bg-gray-500 text-white',
    in_transit:'bg-blue-500 text-white',
}

const changeStatusModel = ref(false)
const status = ref('')
const remark = ref('')
const user_note = ref('')

const formatDate = (value) => {
    return moment(value).format('DD MMM YYYY, hh:mm A')
}

const update = async () => {
    console.log('update');
    IsSubmitting.value = true;
    await orderModel.update(route.params.id,{
        status:status.value,
        address:remark.value,
        user_notes:user_note.value
    })

    IsSubmitting.value = false


}
onMounted( async() => {
    console.log(route.params.id);
    await orderModel.getById(route.params.id)
    isLoading.value = false

    status.value = orderModel.order.status
    user_note.value =  orderModel.order.user_notes
    remark.value = orderModel.order.remark
})

</script>