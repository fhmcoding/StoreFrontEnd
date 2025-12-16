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
                    <span  class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-300">Brands</span>
                </div>
            </li>
        </ol>
    </nav>

    <!-- alert -->
    <Alert class="m-0" v-show="! createBrandModal && ! editBrandModal" />

    <!-- table data -->
    <div class="md:bg-white md:bg-gray-150 md:rounded-lg md:shadow-md dark:bg-gray-800 mb-5">
        <div class="p-4 flex justify-between">
            <h1 class="my-auto text-xl font-semibold text-gray-900 dark:text-gray-50">Brands</h1>
            <button v-if="auth.hasPermission('brand-create')" @click="createBrand()" class="text-white bg-primary hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2">
                <PlusCircleIcon class="h-5 mr-1" aria-hidden="true" />
                Add Brand
            </button>
        </div>

        <hr class="dark:border-gray-600 hidden md:block" />

        <div class="overflow-auto overflow-x-auto "><!-- hidden md:block -->
            <table class="table-auto min-w-full max-w-full overflow-x-auto">
                <thead class="bg-gray-50 dark:bg-gray-700">
                    <tr class="dark:border-gray-700">
                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 dark:text-gray-300">Image</th>
                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 dark:text-gray-300">Name</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">Products</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">Created Date</th>
                        <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-gray-900 dark:text-gray-300 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                    <tr v-if="isLoading" class="text-center text-gray-400"><td colspan="5" class="p-2">loading...</td></tr>
                    <tr v-else-if="brandModel.brands.length == 0" class="text-center text-gray-400"><td colspan="5" class="p-2">Empty</td></tr>
                    <tr v-else v-for="item in brandModel.brands" :key="item.name">
                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 dark:text-gray-300 sm:pl-6">
                            <img :src="item.image_url == null ? '/default.png' : item.image_url " class=" rounded-md w-12 h-12" alt="" srcset="">
                        </td>
                       
                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 dark:text-gray-300 sm:pl-6">
                            {{ item.name }}
                        </td>
                       
                        <td class="whitespace-nowrap px-3 py-4 text-gray-500">
                            Total  {{ item.products_count }}
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {{ formatDate(item.created_at) }}
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-center sm:pr-6">
                            <div class="flex justify-center text-primary dark:text-primary font-bold space-x-2">
                                <TrashIcon v-if="auth.hasPermission('brand-delete')" @click="destroy(item.id)" class="cursor-pointer font-bold h-5 w-5" aria-hidden="true" />
                                <PencilSquareIcon  v-if="auth.hasPermission('brand-edit')" @click="editBrand(item)" class="cursor-pointer font-bold h-5 w-5" aria-hidden="true" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <Pagination :links='brandModel.pagination' :goToPage="goToPage" v-if='!isLoading && brandModel.brands.length > 0' />
        </div>
    </div>

    <!-- Create Modal -->
    <TransitionRoot as="template" :show="createBrandModal">
        <Dialog as="div" class="relative z-10" >
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>
                
            <div class="fixed inset-0 z-10 overflow-y-auto w-max-full sm:w-full">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 sm:w-full">
                    <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel class="relative transform overflow-hidden rounded-md dark:bg-gray-800 bg-white px-4 pt-5 pb-3 text-left shadow-xl transition-all sm:my-8 w-full max-w-full md:max-w-3xl sm:p-6 ">
                            <div class="border-b-2 border-gray-200 w-full py-2 mb-7 text-gray-500 text-lg">
                                Add New Brand
                            </div>   

                            <form @submit="storeBrand">
                                <div class="grid grid-cols-12">
                                    <div class="col-span-12">
                                        <label for="user-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Brand Name</label>
                                        <input v-model="name" type="text" name="name" id="user-name" autocomplete="given-name" placeholder="Brand Name" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                    </div>
                                    <div class="col-span-12 my-2">
                                        <file-pond
                                            name="file"
                                            ref="pond"
                                            label-idle="Drop files here..."
                                            v-bind:allow-multiple="false"
                                            accepted-file-types="image/jpeg, image/png, image/svg"
                                            :server="{
                                                url:'https://storeapi.fhmcoding.com',
                                                process: {
                                                    url:'/api/backoffice/upload_images',
                                                    method: 'POST',
                                                    headers:{
                                                        'Authorization':'Bearer '+auth.token
                                                    }
                                                },
                                                
                                               
                                            }"
                                            v-bind:files="newBrandLogo"
                                            @processfile="handleFilePondProcessfile"
                                            />
                                    </div>
                                </div>
                                <div class="mt-9 flex flex-row w-full content-center justify-center items-center space-x-2">
                                    <button :disabled="IsSubmitting" @click="createBrandModal = false; brandModel.clear()" type="button" class="button inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-xs sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                        Cancel
                                    </button>
                                    <button type="submit" :disabled="IsSubmitting" class="inline-flex bg-primary w-full justify-center rounded-md border border-transparent px-4 py-2 mx-1 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-xs sm:text-sm sm:w-auto">
                                        <span v-if="IsSubmitting" class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                            <Cog6ToothIcon class="h-5 w-5 text-white" aria-hidden="true" />
                                        </span>
                                        Create Brand
                                    </button>
                                </div>
                            </form>
                            
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>

    <!-- Edit Modal -->

    <TransitionRoot as="template" :show="editBrandModal">
        <Dialog as="div" class="relative z-10" >
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>
                
            <div class="fixed inset-0 z-10 overflow-y-auto w-max-full sm:w-full">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 sm:w-full">
                    <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel class="relative transform overflow-hidden rounded-md dark:bg-gray-800 bg-white px-4 pt-5 pb-3 text-left shadow-xl transition-all sm:my-8 w-full max-w-full md:max-w-3xl sm:p-6 ">
                            <div class="border-b-2 border-gray-200 w-full py-2 mb-7 text-gray-500 text-lg">
                                Edit Brand
                            </div>   

                            <form @submit="updateBrand">
                                <div class="grid grid-cols-12">
                                    <div class="col-span-12">
                                        <label for="user-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Brand Name</label>
                                        <input v-model="name" type="text" name="name" id="user-name" autocomplete="given-name" placeholder="Brand Name" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                    </div>
                                    <div class="col-span-12 my-2">
                                        <file-pond
                                            name="file"
                                            ref="pond"
                                            label-idle="Drop files here..."
                                            v-bind:allow-multiple="false"
                                            accepted-file-types="image/jpeg, image/png, image/svg"
                                            :server="{
                                                url:'https://storeapi.fhmcoding.com',
                                                process: {
                                                    url:'/api/backoffice/upload_images',
                                                    method: 'POST',
                                                    headers:{
                                                        'Authorization':'Bearer '+auth.token
                                                    }
                                                },
                                                
                                               
                                            }"
                                            v-bind:files="newBrandLogo"
                                            @processfile="handleFilePondProcessfile"
                                            />
                                    </div>   
                                </div>
                                <div class="mt-9 flex flex-row w-full content-center justify-center items-center space-x-2">
                                    <button :disabled="IsSubmitting" @click="editBrandModal = false; brandModel.clear()" type="button" class="button inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-xs sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                        Cancel
                                    </button>
                                    <button type="submit" :disabled="IsSubmitting" class="inline-flex bg-primary w-full justify-center rounded-md border border-transparent px-4 py-2 mx-1 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-xs sm:text-sm sm:w-auto">
                                        <span v-if="IsSubmitting" class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                            <Cog6ToothIcon class="h-5 w-5 text-white" aria-hidden="true" />
                                        </span>
                                        Update Brand
                                    </button>
                                </div>
                            </form>
                            
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>


</template>


<script setup>

import { useBrandStore } from '@/stores/backoffice/brands'
import { useAlertStore } from '@/stores/alert'
import { useAuthStore } from '@/stores/backoffice/auth'
import { onMounted , ref, watch} from 'vue'
import moment from 'moment'
import { TrashIcon, PencilSquareIcon, PlusCircleIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import Alert from '@/components/Alert.vue'
import Pagination from '@/components/Pagination.vue'

import { useForm } from 'vee-validate';
import * as yup from 'yup';
import vueFilePond from "vue-filepond";

import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

// Import styles
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

// Create FilePond component
const FilePond = vueFilePond( FilePondPluginFileValidateType, FilePondPluginImagePreview );

   
const auth = useAuthStore()
const brandModel = useBrandStore()
const alertModel = useAlertStore()
const isLoading = ref(true)
const createBrandModal = ref(false)
const editBrandModal = ref(false)
const IsSubmitting = ref(false)
const newBrandLogo = ref([])
let brandId = 0; 



const form_create_brand = useForm({
    validationSchema:yup.object({
        name: yup.string().min(3).required()
    })
});



const [name] = form_create_brand.useFieldModel(['name']);


const formatDate = (value) => {
    return moment(value).format('DD MMM YYYY, hh:mm A')
} 

const storeBrand = form_create_brand.handleSubmit(async (values) => {
    IsSubmitting.value = true
    
    if(newBrandLogo.value.length){
        values.file =  newBrandLogo.value[0].source;
    }
    let result = await brandModel.store(values)
    IsSubmitting.value = false;
    createBrandModal.value = false;
    
    newBrandLogo.value = []

    isLoading.value = true
    await brandModel.getAll()
    isLoading.value = false
},onInvalidSubmit);

const updateBrand = form_create_brand.handleSubmit(async (values) => {
    
    IsSubmitting.value = true
    
    if(newBrandLogo.value.length){
        values.file =  newBrandLogo.value[0].source;
    }
    let result = await brandModel.update(brandId,values)
    IsSubmitting.value = false;
    editBrandModal.value = false;
    
    newBrandLogo.value = []
    name.value = '';

    isLoading.value = true
    await brandModel.getAll()
    isLoading.value = false

},onInvalidSubmit)

const handleFilePondProcessfile = (error, file) => {
    newBrandLogo.value = [{
        source:file.filename,
        options: {
            type: 'local'
        }
    }]
}

async function createBrand(){
    alertModel.clear();
    createBrandModal.value = true;
}

async function editBrand(brand){
    alertModel.clear();
    editBrandModal.value = true;
    brandId = brand.id;
    name.value = brand.name;
    newBrandLogo.value = [];
}

async function destroy(id){
    alertModel.remove("Remove Brand", "Are you sure ?", id)
}

watch(alertModel, async () => {
    if(alertModel.alert && alertModel.alert.callback && alertModel.alert.confirm){
        await brandModel.destroy(alertModel.alert.id)
        isLoading.value = true
        await brandModel.getAll()
        isLoading.value = false
    }
})

async function goToPage(page){
    console.log(page);
    isLoading.value = true
    brandModel.page = page
    await brandModel.getAll()
    isLoading.value = false
}


function onInvalidSubmit({ errors }) {
    console.log(errors)
    alertModel.clear()
    alertModel.danger(Object.keys(errors)[0], Object.values(errors)[0], "block")
}

onMounted(
    async () => {
        await brandModel.getAll()
        isLoading.value = false
    }
)


</script>