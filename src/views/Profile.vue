<template>
    <div class="bg-gray-100 py-4">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="bg-white bg-gray-150 rounded-lg shadow-md dark:bg-gray-800 mb-5 w-full lg:w-3/4 xl:w-3/4"> 
                <div class="p-4 flex justify-between">
                    <h1 class="my-auto text-lg font-medium text-gray-600 dark:text-gray-50">{{ "My Information" }}</h1>
                </div>
                <hr class="dark:border-gray-600 block" />
                <div class="mt-3">
                  <div >
                        <div class="p-3" v-if="customer.first_name !== undefined">
                            <div class="flex items-start gap-2">
                                <div class="w-full xl:w-1/2 lg:w-1/2 mb-2">
                                    <label for="firstName" class="block text-sm font-medium leading-6 text-gray-900"
                                        >{{"First Name"}}</label
                                    >
                                    <div class="mt-2">
                                            <input
                                                type="text"
                                                name="firstName"
                                                id="firstName"
                                                v-model="customer.first_name"
                                                class="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 text-base"
                                                :placeholder="'First Name'"
                                                rules="required"
                                            />
                                    </div>
                                    
                                
                                </div>
                                <div class="w-full xl:w-1/2 lg:w-1/2 mb-2">
                                    <label for="lastName" class="block text-sm font-medium leading-6 text-gray-900"
                                        >{{"Last Name"}}</label
                                    >
                                    <div class="mt-2">
                                        <input
                                            type="text"
                                            name="lastName"
                                            id="lastName"
                                            v-model="customer.last_name"
                                            class="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 text-base"
                                            :placeholder="'Last Name'"
                                            rules="required"
                                        />
                                    </div>

                                    
                                </div>
                            </div>
                            <div class="block lg:flex xl:flex items-start gap-2">
                                <div class="w-full xl:w-1/2 lg:w-1/2 mb-2">
                                    <label for="phone" class="block text-sm font-medium leading-6 text-gray-900"
                                        >{{'Phone'}}</label
                                    >
                                    <div class="mt-2">
                                        <input 
                                            type="text"
                                            name="phone"
                                            id="phone"
                                            disabled="true"
                                            readonly="true"
                                            v-model=" customer.phone_number"
                                            class="block bg-gray-100  w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 text-base"
                                            placeholder="+212..."
                                            
                                        />
                                    </div>
                                </div>
                                <div class="w-full xl:w-1/2 lg:w-1/2 mb-2">
                                    <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
                                        >{{'Password'}}</label
                                    >
                                    <div class="mt-2">
                                        <input 
                                            type="password"
                                            name="password"
                                            id="password"
                                            v-model="customer.password"
                                            class="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 text-base"
                                            placeholder="******"
                                        />
                                    </div>

                                    
                                </div>
                            </div>
                            <button @click="submit()" class="bg-primary rounded flex mt-3 items-center justify-center text-white  text-center py-2.5  px-4 font-semibold text-base">
                                <span v-if="IsSubmitting" class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                    <ArrowPathIcon class="h-5 w-5 text-white" aria-hidden="true" />
                                </span>
                                <span>{{"Continue"}}</span>
                            </button>
                        </div>

                        
                    </div>
                </div> 
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref,computed, onMounted } from 'vue'
import { useAuthStore } from "@/stores/client/auth"
import { useRouter } from 'vue-router'

import { ArrowPathIcon } from '@heroicons/vue/20/solid'

const auth = useAuthStore()

const IsSubmitting = ref(false)

console.log(auth.user);
const router = useRouter()
const customer = ref({
    first_name:auth.user.first_name,
    last_name:auth.user.last_name,
    phone_number:auth.user.phone_number,
    password:''
})

const submit = async () => {
    console.log('submit')
    IsSubmitting.value = true
    await auth.update(customer.value)
    IsSubmitting.value = false
    router.push({path:'/'})
}
</script>