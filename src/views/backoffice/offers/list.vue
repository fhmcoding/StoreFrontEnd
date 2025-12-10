<template>
    <!-- breadcrumb -->
    <nav class="mb-3 px-3 py-3 text-gray-700 dark:text-gray-50 bg-white dark:bg-gray-800 rounded-md p-3" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
                <RouterLink to="/user/dashboard" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-white dark:hover:text-white">
                    <svg aria-hidden="true" class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                    </svg>
                    Dashboard
                </RouterLink>
            </li>
            <li aria-current="page">
                <div class="flex items-center">
                    <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <span  class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-300">Offers</span>
                </div>
            </li>
        </ol>
    </nav>
    
    <!-- alert -->
    <Alert class="m-0" v-show="! createOfferModal && ! editOfferModal" />


    <!-- table data -->
    <div class="md:bg-white md:bg-gray-150 md:rounded-lg md:shadow-md dark:bg-gray-800 mb-5">
        <div class="p-4 flex justify-between">
            <h1 class="my-auto text-xl font-semibold text-gray-900 dark:text-gray-50">Offers </h1>
            <button v-if="auth.hasPermission('offer-create')" @click="createOffer()" class="text-white bg-primary hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2">
                <PlusCircleIcon class="h-5 mr-1" aria-hidden="true" />
                Add Offer 
            </button>
        </div>

        <hr class="dark:border-gray-600 hidden md:block" />

        <div class="overflow-auto overflow-x-auto "><!-- hidden md:block -->
            <table class="table-auto min-w-full max-w-full overflow-x-auto">
                <thead class="bg-gray-50 dark:bg-gray-700">
                    <tr class="dark:border-gray-700">
                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 dark:text-gray-300">Title</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">User</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">Products</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">From / to</th>
                        <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-gray-900 dark:text-gray-300 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                    <tr v-if="isLoading" class="text-center text-gray-400"><td colspan="5" class="p-2">loading...</td></tr>
                    <tr v-else-if="offerModel.offers.length == 0" class="text-center text-gray-400"><td colspan="5" class="p-2">Empty</td></tr>
                    <tr v-else v-for="item in offerModel.offers" :key="item.name">
                        
                       
                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 dark:text-gray-300 sm:pl-6">
                            {{ item.title }}
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-gray-500">
                            <span v-if="item.user != undefined && item.user.first_name !== undefined">
                            {{  item.user.first_name }} {{  item.user.last_name }}
                            </span>
                        </td>

                        <td class="whitespace-nowrap px-3 py-4 text-gray-500">
                            {{ item.products.length }}
                        </td>
                       
                        
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {{ formatDate(item.from) }} - {{ formatDate(item.to) }}
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-center sm:pr-6">
                            <div class="flex justify-center text-primary dark:text-primary font-bold space-x-2">
                                <TrashIcon v-if="auth.hasPermission('offer-delete')" @click="destroy(item.id)" class="cursor-pointer font-bold h-5 w-5" aria-hidden="true" />
                                <PencilSquareIcon  v-if="auth.hasPermission('offer-edit')" @click="editOffer(item)" class="cursor-pointer font-bold h-5 w-5" aria-hidden="true" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <Pagination :links='offerModel.pagination' :goToPage="goToPage" v-if='!isLoading && offerModel.offers.length > 0' />
        </div>
    </div>


    <TransitionRoot as="template" :show="createOfferModal">
        <Dialog as="div" class="relative z-10" >
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>
                
            <div class="fixed inset-0 z-10 overflow-y-auto w-max-full sm:w-full">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 sm:w-full">
                    <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel class="relative transform overflow-hidden rounded-md dark:bg-gray-800 bg-white px-4 pt-5 pb-3 text-left shadow-xl transition-all sm:my-8 w-full max-w-full md:max-w-3xl sm:p-6 ">
                            <div class="border-b-2 border-gray-200 w-full py-2 mb-7 text-gray-500 text-lg">
                                Add New Offer
                            </div>   

                            <div>
                                <div class="grid grid-cols-12 gap-2">
                                    <div class="col-span-6 mb-1">
                                        <label for="location" class="block text-sm font-medium text-gray-700 dark:text-gray-300">User</label>
                                        <div class="mt-2 grid grid-cols-1">
                                            <select id="location" v-model="user_id" name="location" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6">
                                                <option>-----select----</option>
                                                <option :value="user.id" v-for="user in userModel.users" :key="user.id">{{ user.first_name }} - {{ user.last_name }}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-span-6 mb-1">
                                        <label for="user-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Offer Name</label>
                                        <input v-model="title" type="text" name="title" id="user-title" autocomplete="given-name" placeholder="offer Name" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                    </div>

                                    <div class="col-span-6 mb-1">
                                        <label for="from" class="block text-sm font-medium text-gray-700 dark:text-gray-300">From</label>
                                        <input v-model="from" type="date" name="from" id="from" autocomplete="given-name" placeholder="from" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                    </div>

                                    <div class="col-span-6 mb-1">
                                        <label for="to" class="block text-sm font-medium text-gray-700 dark:text-gray-300">To</label>
                                        <input v-model="to" type="date" name="to" id="to" autocomplete="given-name" placeholder="to" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                    </div>

                                    <div class="col-span-12 mb-1 flex gap-2 items-end" v-for="item in products" :key="item.id"> 
                                        <div class="w-2/4 mb-1">
                                            <label for="location" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Product</label>
                                            <div class="mt-2 grid grid-cols-1">
                                                <select id="location" v-model="item.product_id" name="location" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6">
                                                    <option>-----select----</option>
                                                    <option :value="product.id" v-for="product in productModel.products" :key="product.id">{{ product.product.name }} - {{ product.name }}</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="w-1/4 mb-1">
                                            <label for="price" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
                                            <input v-model="item.price" type="number" name="price" id="price" autocomplete="price" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                        </div>

                                        <div class="w-1/4 mb-1 flex items-end gap-2">
                                            <!-- Add Button -->
                                            <button 
                                                @click="add()"
                                                class="px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-400">
                                                Add
                                            </button>

                                            <!-- Remove / delete Button -->
                                            <button 
                                                v-if="products.length > 1"
                                                @click="remove(index)"
                                                class="px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-400">
                                                Remove
                                            </button>

                                            
                                        </div>

                                        

                                    </div>
                                </div>

                                
                                <div class="mt-9 flex flex-row w-full content-center justify-center items-center space-x-2">
                                    <button :disabled="IsSubmitting"  type="button" class="button inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-xs sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                        Cancel
                                    </button>
                                    <button type="submit" @click="submitting()" :disabled="IsSubmitting" class="inline-flex bg-primary w-full justify-center rounded-md border border-transparent px-4 py-2 mx-1 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-xs sm:text-sm sm:w-auto">
                                        <span v-if="IsSubmitting" class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                            <Cog6ToothIcon class="h-5 w-5 text-white" aria-hidden="true" />
                                        </span>
                                        Create Offer
                                    </button>
                                </div>

                            </div>
                            
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>


    <TransitionRoot as="template" :show="updateOfferModal">
        <Dialog as="div" class="relative z-10" >
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>
                
            <div class="fixed inset-0 z-10 overflow-y-auto w-max-full sm:w-full">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 sm:w-full">
                    <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel class="relative transform overflow-hidden rounded-md dark:bg-gray-800 bg-white px-4 pt-5 pb-3 text-left shadow-xl transition-all sm:my-8 w-full max-w-full md:max-w-3xl sm:p-6 ">
                            <div class="border-b-2 border-gray-200 w-full py-2 mb-7 text-gray-500 text-lg">
                                Update Offer
                            </div>   

                            <div>
                                <div class="grid grid-cols-12 gap-2">
                                    <div class="col-span-6 mb-1">
                                        <label for="location" class="block text-sm font-medium text-gray-700 dark:text-gray-300">User</label>
                                        <div class="mt-2 grid grid-cols-1">
                                            <select id="location" v-model="selectedOffer.user_id" name="location" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6">
                                                <option>-----select----</option>
                                                <option :value="user.id" v-for="user in userModel.users" :key="user.id">{{ user.first_name }} - {{ user.last_name }}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-span-6 mb-1">
                                        <label for="user-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Offer Name</label>
                                        <input v-model="selectedOffer.title" type="text" name="title" id="user-title" autocomplete="given-name" placeholder="offer Name" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                    </div>

                                    <div class="col-span-6 mb-1">
                                        <label for="from" class="block text-sm font-medium text-gray-700 dark:text-gray-300">From</label>
                                        <input v-model="selectedOffer.from" type="date" name="from" id="from" autocomplete="given-name" placeholder="from" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                    </div>

                                    <div class="col-span-6 mb-1">
                                        <label for="to" class="block text-sm font-medium text-gray-700 dark:text-gray-300">To</label>
                                        <input v-model="selectedOffer.to" type="date" name="to" id="to" autocomplete="given-name" placeholder="to" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                    </div>

                                    <div class="col-span-12 mb-1 flex gap-2 items-end" v-for="item in selectedOffer.products" :key="item.id"> 
                                        <div class="w-2/4 mb-1">
                                            <label for="location" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Product</label>
                                            <div class="mt-2 grid grid-cols-1">
                                                <select id="location" :disabled="item.id !== undefined" v-model="item.product_id" name="location" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6">
                                                    <option>-----select----</option>
                                                    <option :value="product.id"  v-for="product in productModel.products" :key="product.id"> {{ product.product.name }} - {{ product.name }}</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="w-1/4 mb-1">
                                            <label for="price" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
                                            <input v-model="item.price" :disabled="item.id !== undefined" :class="{'cursor-not-allowed bg-gray-300':item.id !== undefined}" :readonly="item.id !== undefined" type="number" name="price" id="price" autocomplete="price" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                        </div>

                                        <div class="w-1/4 mb-1 flex items-end gap-2">
                                            <!-- Add Button -->
                                            <button 
                                                @click="add()"
                                                class="px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-400">
                                                Add
                                            </button>

                                            <!-- Remove Button -->
                                            <button 
                                                v-if="products.length > 1 && item.id == undefined"
                                                @click="remove(index)"
                                                class="px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-400">
                                                Remove
                                            </button>

                                            <button 
                                                v-if="item.id !== undefined"
                                                @click="deleteProduct(item.product_id)"
                                                class="px-3 py-2 bg-red-600 flex gap-2 text-white text-sm rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-400">
                                                Delete
                                                <span v-if="IsDeleting" class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                                    <Cog6ToothIcon class="h-5 w-5 text-white" aria-hidden="true" />
                                                </span>

                                            </button>
                                        </div>

                                        

                                    </div>
                                </div>

                                
                                <div class="mt-9 flex flex-row w-full content-center justify-center items-center space-x-2">
                                    <button :disabled="IsSubmitting" @click="updateOfferModal = false"  type="button" class="button inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-xs sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                        Cancel
                                    </button>
                                    <button type="submit" @click="update()" :disabled="IsSubmitting" class="inline-flex bg-primary w-full justify-center rounded-md border border-transparent px-4 py-2 mx-1 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-xs sm:text-sm sm:w-auto">
                                        <span v-if="IsSubmitting" class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                            <Cog6ToothIcon class="h-5 w-5 text-white" aria-hidden="true" />
                                        </span>
                                        Update Offer
                                    </button>
                                </div>

                            </div>
                            
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>

</template>


<script setup>

import { useOfferStore } from '@/stores/backoffice/offers'
import { useProductStore } from '@/stores/backoffice/products'
import { useUserStore } from '@/stores/backoffice/user'

import { useAlertStore } from '@/stores/alert'
import { useAuthStore } from '@/stores/backoffice/auth'
import { onMounted , ref, watch} from 'vue'
import moment from 'moment'
import { TrashIcon, PencilSquareIcon, PlusCircleIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import Alert from '@/components/Alert.vue'
import Pagination from '@/components/Pagination.vue'


const auth = useAuthStore()
const offerModel = useOfferStore()
const alertModel = useAlertStore()
const productModel = useProductStore()
const userModel = useUserStore()

const isLoading = ref(true)
const createOfferModal = ref(false)
const updateOfferModal = ref(false)

const title = ref('')
const from = ref('')
const to = ref('')
const user_id = ref('')

const   selectedOffer = ref(null)
const   IsDeleting = ref(false)

const products = ref([{
    price:0,
    product_id:null
}])


const add = () => {
    products.value = [...products.value,{
        price:0,
        product_id:null,
    }]
    if(selectedOffer.value !== null){
        selectedOffer.value.products = [...selectedOffer.value.products,{
            price:0,
            product_id:null
        }]
    }
    console.log(products.value)
    console.log('add')
}

const remove = (index) => {
    products.value.splice(index, 1)
    if(selectedOffer.value !== null){
        selectedOffer.value.products.splice(index, 1)
    }
    console.log('remove')
}

async function destroy(id){
    alertModel.remove("Remove Offer", "Are you sure ?", id)
}

const deleteProduct = async (id) => {
    console.log(selectedOffer.value)
    IsDeleting.value = true;
    await offerModel.deleteProduct(selectedOffer.value.id,id)
    IsDeleting.value = false;
    selectedOffer.value.products = selectedOffer.value.products.filter((e) => e.product_id !== id)

}

watch(alertModel, async () => {
    if(alertModel.alert && alertModel.alert.callback && alertModel.alert.confirm){
        await offerModel.destroy(alertModel.alert.id)
        isLoading.value = true
        await offerModel.getAll()
        isLoading.value = false
    }
})

const formatDate = (value) => {
    return moment(value).format('DD MMM YYYY, hh:mm A')
} 
const editOffer = (offer) => {
   
    selectedOffer.value = {
        id:offer.id,
        title:offer.title,
        from:offer.from,
        to:offer.to,
        user_id:offer.user !== null ? offer.user.id ?? null : null,
        products:offer.products.length == 0 ? [{
            price:0,
            product_id:null,
        }] : offer.products.map((e) => {
            return {
                id:e.id,
                price:e.pivot.price,
                product_id:e.pivot.product_id
            }
        })
    }
    
    console.log(selectedOffer.value)

    updateOfferModal.value = true
}

const submitting = async () => {
    console.log(products.value)
    await offerModel.store({
        from:from.value,
        to:to.value,
        title:title.value,
        user_id:user_id.value,
        products:products.value
    })

    createOfferModal.value = false; 
    // offerModel.clear()
}

const update = async () => {
    await offerModel.update(selectedOffer.value.id,{
        from:selectedOffer.value.from,
        to:selectedOffer.value.to,
        title:selectedOffer.value.title,
        user_id:selectedOffer.value.user_id,
        products:selectedOffer.value.products
    })
    editOfferModal.value = false
    selectedOffer.value = null
}

async function goToPage(page){
    console.log(page);
    isLoading.value = true
    offerModel.page = page
    await offerModel.getAll()
    isLoading.value = false
}

async function createOffer(){
    alertModel.clear();
    createOfferModal.value = true;
}

onMounted(
    async () => {
    
        await productModel.getList()
        await offerModel.getAll()
        await userModel.getAll()

        isLoading.value = false

    }
)

</script>


