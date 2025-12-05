<template>
    <div>
        <!-- breadcrumb -->
        <nav class="mb-3 px-3 py-3 text-gray-700 dark:text-gray-50 bg-white dark:bg-gray-800 rounded-md p-3" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
                <li class="inline-flex items-center">
                    <RouterLink to="/backoffice" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-white dark:hover:text-white">
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
                        <RouterLink to="/backoffice/products">
                            <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-300">Products</span>
                        </RouterLink>
                    </div>
                </li>
                <li aria-current="page">
                    <div class="flex items-center">
                        <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                        </svg>
                        <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-300">Edit</span>
                    </div>
                </li>
            </ol>
        </nav>

      

        <div class="bg-white bg-gray-150 rounded-lg shadow-md dark:bg-gray-800 my-3">
            <div class="p-4 flex justify-between">
                <h1 class="my-auto text-xl font-semibold text-gray-900 dark:text-gray-50">Update Product</h1>
            </div>
            <hr class="dark:border-gray-600" />
            <div class="mt-5">
                <div v-if="isLoading" class="flex justify-center pt-6 pb-8">
                    <span class="animate-spin h-6 w-6 mr-2" viewBox="0 0 24 24">
                        <IconLoader class="h-6 w-6" aria-hidden="true" />
                    </span>
                </div>
                <form v-if="!isLoading" @submit="update">
                    <div class="overflow-hidden">
                        <div class="bg-white dark:bg-gray-800 px-4 py-5 sm:p-6">
                            <div class="grid grid-cols-6 gap-6">

                                
                                <div class="col-span-6 sm:col-span-6">
                                    <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                                    <input v-model="name" type="text" name="name" id="name"  class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                </div>
                                
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="country" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Brand</label>
                                    <select v-model="brand_id" id="country" name="brand" autocomplete="country-name" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                        <option value="0">Select Brand</option>
                                        <option v-for="brand in brandModel.brands" :key="brand.id"  :value="brand.id">{{ brand.name }}</option>
                                    </select>
                                </div>

                                <div class="col-span-6 sm:col-span-3">
                                    <label for="country" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                                    <select v-model="category_id" id="country" name="category" autocomplete="country-name" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                        <option value="0">Select Category</option>
                                        <option v-for="category in categoryModel.categories" :key="category.id"  :value="category.id">{{ category.name }}</option>
                                    </select>
                                </div>

                                <div class="col-span-6 sm:col-span-6">
                                    <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                                    <textarea v-model="description" name="description" id="description"  class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
                                </div>
                            </div>

                            <div class=" border rounded-md p-2 mt-2 bg-gray-50"> 
                                <div class="flex items-end gap-6 mb-2" v-for="(product,index) in products" :key="index">
                                    <div class="w-2/5">
                                        <label for="reference" class="block text-sm font-medium text-gray-700 dark:text-gray-300">reference</label>
                                        <input v-model="product.product_code" :class="{'bg-gray-100 cursor-not-allowed':product.id !== undefined}" :readonly="product.id !== undefined" :disabled="product.id !== undefined" type="text" name="reference" id="size" placeholder="reference"  class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                    </div>

                                    <div class="w-1/5">
                                        <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Size (ml)</label>
                                        <input v-model="product.name" type="text" name="size" id="size" placeholder="size"  class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                    </div>

                                    <div class="flex items-center justify-between w-1/5 gap-2">
                                        <div class="w-1/2">
                                            <label for="price" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
                                            <input v-model="product.price" type="number" name="price" id="price" autocomplete="price" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                        </div>

                                        <div class="w-1/2">
                                            <label for="sale-price" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Sale Price</label>
                                            <input v-model="product.sale_price" type="number" name="sale-price" id="sale-price" autocomplete="sale-price" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                        </div>
                                    </div>

                                    <div class="w-1/5">
                                        <label for="stock_quantity" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Stock Quantity</label>
                                        <input v-model="product.stock_quantity" type="number" name="stock_quantity" id="stock_quantity"  class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                    </div>

                                    <div class="w-1/5 flex items-end gap-2">
                                        <!-- Add Button -->
                                        <button 
                                            @click="add()"
                                            class="px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-400">
                                            Add
                                        </button>

                                        <!-- Remove Button -->
                                        <button 
                                            v-if="products.length > 1 && product.id == undefined"
                                            
                                            @click="remove(index)"
                                            class="px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-400">
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div class="my-2">
                                    <file-pond
                                        name="file"
                                        ref="pond"
                                        label-idle="Drop files here..."
                                        v-bind:allow-multiple="true"
                                        accepted-file-types="image/jpeg, image/png, image/svg"
                                        :server="{
                                            url:'http://127.0.0.1:8000',
                                            process: {
                                                url:'/api/backoffice/upload_images',
                                                method: 'POST',
                                                headers:{
                                                    'Authorization':'Bearer '+auth.token
                                                }
                                            },
                                            
                                            
                                        }"
                                        v-bind:files="produtImages"
                                        @processfile="handleFilePondProcessfile"
                                    />
                                </div>

                                <div class="bg-gray-50 border border-gray-100 p-3 rounded-md my-2 dark:bg-gray-700 dark:border-gray-700 " v-show="productModel.product.images.length > 0">
                                    <h5 class="whitespace-nowrap mb-1.5 text-md font-medium text-gray-900 dark:text-gray-300">Product Images</h5>
                                    <div class="flex flex-wrap gap-2">
                                        <div v-for="image in productModel.product.images" :key="image.id" class="relative">
                                            <img :src="image.url" class="rounded-md w-24 h-24 brightness-50">
                                            <div class="cursor-pointer absolute left-0 top-0 bg-white text-red-700 p-1 rounded-full m-1 shadow-md" @click="removeImage(image.id)">
                                                <TrashIcon class="font-bold h-4 w-4" aria-hidden="true" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex items-center">
                                    <input v-model="is_active" id="is_active" class=" w-9 mr-2 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch">
                                    <label for="is_active" class="dark:text-gray-300 inline-block text-gray-800">is Active</label>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-50 dark:bg-gray-800 dark:border-t-2 border-gray-600 px-4 py-3 text-right space-x-2 sm:px-6">
                            <routerLink to="/backoffice/users" class="inline-flex justify-center rounded-md border dark:bg-gray-200 border-indigo-600 bg-transparent py-2 px-4 text-sm font-medium text-primary shadow-sm hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Cancel</routerLink>
                            <button type="submit" :disabled="IsSubmitting" class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                <span v-if="IsSubmitting" class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                    <Cog6ToothIcon class="h-5 w-5 text-white" aria-hidden="true" />
                                </span>
                                Update Product
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { Cog6ToothIcon,TrashIcon } from '@heroicons/vue/24/outline'
    import { ref,onMounted } from 'vue'
    import { useRoute, useRouter } from 'vue-router'

    import { useAlertStore } from '@/stores/alert'
    import { useAuthStore } from '@/stores/backoffice/auth'
    import { useProductStore } from '@/stores/backoffice/products'
    import { useBrandStore } from '@/stores/backoffice/brands'
    import { useCategoryStore } from '@/stores/backoffice/categories'
    
    import { useForm } from 'vee-validate'
    import * as yup from 'yup'
    import { IconLoader } from '@tabler/icons-vue'
    import Editor from 'tailwind-editor'
    import Alert from '@/components/Alert.vue'
    
    import vueFilePond from "vue-filepond";

    import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
    import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

    // Import styles
    import 'filepond/dist/filepond.min.css';
    import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

    // Create FilePond component
    const FilePond = vueFilePond( FilePondPluginFileValidateType, FilePondPluginImagePreview );

    const route = useRoute()
    const router = useRouter()

    const auth = useAuthStore()
    const productModel = useProductStore()
    const brandModel = useBrandStore()
    const categoryModel = useCategoryStore()
    const alertModel = useAlertStore()
    
    const isLoading = ref(true)
    const IsSubmitting = ref(false)
    const produtImages = ref([])



    /* Fields and validation create user start */

    const form_update_product = useForm({
        validationSchema: yup.object({
            name: yup.string().required(),
            brand_id: yup.number().moreThan(0,'Brand is required').required(),
            category_id: yup.number().moreThan(0,'Category is required').required(),
            is_active: yup.boolean().required(),
            description: yup.string(),
           
        }),
    });
    
    const [name,  brand_id, category_id, is_active, description] = form_update_product.useFieldModel(['name','brand_id','category_id','is_active','description']);
    const products = ref([])
    /* Fields and validation end */

    onMounted( async() => {
        await productModel.getById(route.params.id)
        await brandModel.getAll()
        await categoryModel.getAll()
        brand_id.value = 0
        category_id.value = 0
        isLoading.value = false
        
        name.value = productModel.product.name
        brand_id.value = productModel.product.brand.id
        category_id.value = productModel.product.category.id
        is_active.value = productModel.product.is_active
        description.value = productModel.product.description
        products.value = productModel.product.products


    })

    const update = form_update_product.handleSubmit( async (values) => {

        console.log('test')
        
        IsSubmitting.value = true

        if(produtImages.value.length){
            values.images = produtImages.value.map((e) => e.source);
        }

        values.products = products.value

        let result = await productModel.update(productModel.product.id,values)
        
        if(result.status){
            router.push('/backoffice/products')
        }
        IsSubmitting.value = false
    },onInvalidSubmit);

    const add = () => {
        products.value = [...products.value,{
            name:'',
            price:0,
            sale_price:0,
            stock_quantity:1,
            product_code:'',
        }]
        console.log('add')
    }

    const remove = (index) => {
        products.value.splice(index, 1)
        console.log('add')
    }

    const  removeImage  = async (imageId) => {
        let reponse = await productModel.removeImge(imageId);
        productModel.product.images = productModel.product.images.filter((e) => e.id != imageId);
    }

    const handleFilePondProcessfile = (error, file) => {
        produtImages.value = [...produtImages.value,{
            source:file.filename,
            options: {
                type: 'local'
            }
        }]
    }

    function onInvalidSubmit({ errors }) {
        alertModel.clear()
        alertModel.danger(Object.keys(errors)[0], Object.values(errors)[0], "block")
    }
</script>