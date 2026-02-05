<template>
    <div>
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
                        <RouterLink to="/backoffice/users">
                            <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-300">Users</span>
                        </RouterLink>
                    </div>
                </li>
                <li aria-current="page">
                    <div class="flex items-center">
                        <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                        </svg>
                        <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-300">Create</span>
                    </div>
                </li>
            </ol>
        </nav>

       

        <div class="bg-white bg-gray-150 rounded-lg shadow-md dark:bg-gray-800 my-3">
            <div class="p-4 flex justify-between">
                <h1 class="my-auto text-xl font-semibold text-gray-900 dark:text-gray-50">Create Client</h1>
            </div>
            <hr class="dark:border-gray-600" />
            <div class="mt-5">
                
                <form @submit="store">
                    <div class="overflow-hidden">
                        <div class="bg-white dark:bg-gray-800 px-4 py-5 sm:p-6">
                            <div class="grid grid-cols-6 gap-6">

                                <div class="col-span-6 sm:col-span-3">
                                    <label for="first-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">first name</label>
                                    <input v-model="first_name" type="text" name="first-name" id="user-name" autocomplete="given-name" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                    <!-- <span class="text-sm text-red-400">{{ errors.user_name }}</span> -->
                                </div>

                                <div class="col-span-6 sm:col-span-3">
                                    <label for="last-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">last name</label>
                                    <input v-model="last_name" type="text" name="last-name" id="user-name" autocomplete="given-name" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                    <!-- <span class="text-sm text-red-400">{{ errors.user_name }}</span> -->
                                </div>

                                
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="phone-Number" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone number</label>
                                    <input v-model="phone_number" type="text" name="phone-Numebr" id="email-address" autocomplete="email" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                    <!-- <span class="text-sm text-red-400">{{ errors.email }}</span> -->
                                </div>

                                
                               

                                <div class="col-span-6 sm:col-span-3 flex items-center">
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
                                Create Client
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
    import { useForm } from 'vee-validate'
    import * as yup from 'yup'
    import { IconLoader } from '@tabler/icons-vue'

    const route = useRoute()
    const router = useRouter()
    const auth = useAuthStore()
    const clientModel = useClientStore()

    const IsSubmitting = ref(false)

    /* Fields and validation create user start */

    const form_create_user = useForm({
        validationSchema: yup.object({
            first_name: yup.string().required(),
            last_name:yup.string().required(),
            is_active: yup.boolean().required()
        }),
    });
    
    const [first_name,last_name, phone_number,  is_active] = form_create_user.useFieldModel(['first_name','last_name','phone_number','is_active']);

    /* Fields and validation end */


    const store = form_create_user.handleSubmit( async (values) => {
        IsSubmitting.value = true
        values.type = 'client'
        let result = await clientModel.store(values)
        if(result.status){
            router.push('/backoffice/clients')
        }
        IsSubmitting.value = false
    },onInvalidSubmit);

    function onInvalidSubmit({ errors }) {
        console.log(errors)
    }

</script>