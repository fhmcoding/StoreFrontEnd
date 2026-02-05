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
                        <RouterLink to="/backoffice/clients">
                            <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-300">Clients</span>
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
                <h1 class="my-auto text-xl font-semibold text-gray-900 dark:text-gray-50">Update Client</h1>
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
                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="first-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">first name</label>
                                        <input v-model="first_name" type="text" name="first-name" id="first-name" autocomplete="first-name" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                    </div>

                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="last-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">last name</label>
                                        <input v-model="last_name" type="text" name="last-name" id="last-name" autocomplete="last-name" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                    </div>
    
                                   
                    
                            
                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="phone_number" class="block text-sm font-medium text-gray-700 dark:text-gray-300">phone number</label>
                                        <input v-model="phone_number" type="text" name="phone_number" id="phone_number" autocomplete="phone_number" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                    </div>
    
                                   
                

                                    

                                    <div class="col-span-6 sm:col-span-3 flex items-center">
                                        <input v-model="is_active" id="is_active" class=" w-9 mr-2 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch">
                                        <label for="is_active" class="dark:text-gray-300 inline-block text-gray-800">is Active</label>
                                    </div>

                                    
                                </div>
                            </div>
                            <div class="bg-gray-50 dark:bg-gray-800 dark:border-t-2 border-gray-600 px-4 py-3 text-right space-x-2 sm:px-6">
                                <routerLink to="/backoffice/clients" class="inline-flex justify-center rounded-md border dark:bg-gray-200 border-indigo-600 bg-transparent py-2 px-4 text-sm font-medium text-primary shadow-sm hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Cancel</routerLink>
                                <button type="submit" :disabled="IsSubmitting" class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    <span v-if="IsSubmitting" class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                        <Cog6ToothIcon class="h-5 w-5 text-white" aria-hidden="true" />
                                    </span>
                                    Update Client
                                </button>
                            </div>
                        </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { Cog6ToothIcon } from '@heroicons/vue/24/outline'
    import { ref,onMounted } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { useAlertStore } from '@/stores/alert'
    import { useAuthStore } from '@/stores/backoffice/auth'
    import { useClientStore } from '@/stores/backoffice/client'
    import { useRoleStore } from '@/stores/backoffice/role'
    import { useForm } from 'vee-validate';
    import * as yup from 'yup';
  
    const route = useRoute()
    const router = useRouter()
    const auth = useAuthStore()
    const alertModel = useAlertStore()
    const clientModel = useClientStore()
    const roleModel = useRoleStore()
    const isLoading = ref(true)
    const IsSubmitting = ref(false)

    /* Fields and validation start */
    
    
    const form_update_user = useForm({
        validationSchema:yup.object({
            first_name: yup.string().required(),
            last_name:yup.string().required(),
            phone_number: yup.string().required(),
            is_active: yup.boolean().required(),
            
        })
    })



    const [first_name, last_name,phone_number,  is_active] = form_update_user.useFieldModel(['first_name', 'last_name', 'phone_number', 'is_active']);
    /* Fields and validation end */

    onMounted( async() => {
        await clientModel.getById(route.params.id)
        first_name.value = clientModel.client.first_name
        last_name.value = clientModel.client.last_name
        phone_number.value = clientModel.client.phone_number
        is_active.value = clientModel.client.is_active
        isLoading.value = false
    })

    const update = form_update_user.handleSubmit( async (values) => {
        alertModel.clear()
        IsSubmitting.value = true
        if(values.password == ''){
            values.password = null;
        }
        values.type = 'client'
        let result = await clientModel.update(clientModel.client.id, values)
        if(result.status){
            router.push({path: '/backoffice/clients'})
        }
        IsSubmitting.value = false
    },onInvalidSubmit);

    function onInvalidSubmit({ errors }) {
        console.log(errors)
        alertModel.clear()
        alertModel.danger(Object.keys(errors)[0], Object.values(errors)[0], "block")
    }

</script>