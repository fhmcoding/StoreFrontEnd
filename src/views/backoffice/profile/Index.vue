<template>
    <!-- breadcrumb -->
    <nav class="mb-3 px-3 py-3 text-gray-700 dark:text-gray-50 bg-white dark:bg-gray-800 rounded-md p-3 border border-gray-200" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
                <RouterLink to="/" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-white dark:hover:text-white">
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
                    <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-300">Profile</span>
                </div>
            </li>
        </ol>
    </nav>



    <div class="flex space-x-2 my-5">
                <button type="button" @click="open_account"  :class="[
                'px-6 pt-2.5 pb-2  font-medium text-sm leading-normal rounded focus:shadow-lg focus:outline-none focus:ring-0 transition duration-150 ease-in-out flex align-center',
                {'bg-primary text-white hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800 active:shadow-lg' : account},
                {'text-gray-600 hover:text-gray-500' : ! account}
            ]">
                    <span class="h-5 w-5 " viewBox="0 0 24 24">
                        <UserIcon class="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>Account</span>
                </button>
                <button type="button" @click="open_security" :class="[
                'px-6 pt-2.5 pb-2 font-medium text-sm leading-normal rounded focus:shadow-lg focus:outline-none focus:ring-0 transition duration-150 ease-in-out flex align-center',
                {'bg-primary text-white hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800 active:shadow-lg' : security},
                {'text-gray-600 hover:text-gray-500' : ! security}
            ]">
                    <span class="h-5 w-5" viewBox="0 0 24 24">
                        <LockClosedIcon class="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>Security</span>
                </button>
    </div>

    <div class="bg-white border border-gray-200 rounded-lg dark:bg-gray-800 mb-5"  v-if="account">
        <div class="p-4 flex justify-between border-b border-gray-200">
            <h1 class="my-auto text-lg font-medium text-gray-600 dark:text-gray-50">Profile Details</h1>
        </div>
       
        <div class="mt-3">
            <!-- alert -->
            <Alert class="mx-3 sm:mx-6" />
            <form class="" @submit="updateProfile">
                <div class="overflow-hidden">
                    <div class="bg-white dark:bg-gray-800 py-4 px-3 sm:px-6">
                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-3">
                                    <label for="first_name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                                    <input v-model="first_name" type="text" name="first_name" id="first_name" autocomplete="first_name"
                                        class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                </div>

                                <div class="col-span-6 sm:col-span-3">
                                    <label for="last_name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                                    <input v-model="last_name" type="text" name="last_name" id="last_name" autocomplete="last_name"
                                        class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                </div>

                            <div class="col-span-6 sm:col-span-3">
                                <label for="phone_number" class="block text-sm font-medium text-gray-700 dark:text-gray-300">phone_number</label>
                                <input v-model="phone_number" type="text" name="phone_number" id="phone_number" autocomplete="phone_number" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                            </div>
            
                           

                          
                        </div>
                    </div>
                    <div class="bg-gray-50 dark:bg-gray-800 dark:border-t-2 border-gray-600 px-4 py-3 text-right space-x-2 sm:px-6">
                        <button type="submit" :disabled="IsSubmitting" class="inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary-hover focus:ring-offset-2">
                            <span v-if="IsSubmitting" class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                <Cog6ToothIcon class="h-5 w-5 text-white" aria-hidden="true" />
                            </span>
                            Update User
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>


    <div class="bg-white border border-gray-200 rounded-lg dark:bg-gray-800 mb-5"  v-if="security">
        <div class="p-4 flex justify-between border-b border-gray-200">
            <h1 class="my-auto text-lg font-medium text-gray-600 dark:text-gray-50">Change Password</h1>
        </div>
       
        <div class="mt-3">
            <!-- alert -->
            <Alert class="mx-3 sm:mx-6" />
            <form @submit="changePassword">
                <div class="overflow-hidden">
                    <div class="bg-white dark:bg-gray-800 py-2 px-3 sm:px-6">
                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-3">
                                <label for="current_password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Current password</label>
                                <input v-model="current_password" type="password" name="current_password" id="current_password" placeholder="Enter current password" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                            </div>

                            <div class="col-span-6 sm:col-span-3">
                                <label for="new_password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                                <input v-model="new_password" type="password" name="new_password" id="new_password" placeholder="Enter new password" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                            </div>
            
                            <div class="col-span-6 sm:col-span-3">
                                <label for="confirm_new_password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Retype New Password</label>
                                <input v-model="confirm_new_password" type="password" name="confirm_new_password" id="confirm_new_password" placeholder="Confirm your new password" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                            </div>
                        </div>
                        <div class="my-5">
                            <p class="text-gray-500 font-semibold text-xs mb-2">Password requirements:</p>
                            <ul class="text-gray-500 font-normal text-xs ml-3 list-disc">
                                <li>Minimum 8 characters long - the more, the better</li>
                            </ul>
                        </div>
                        
                    </div>
                    <div class="bg-gray-50 dark:bg-gray-800 dark:border-t-2 border-gray-600 px-4 py-3 text-right space-x-2 sm:px-6">
                        <button type="submit" :disabled="IsSubmitting" class="inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary-hover focus:ring-offset-2">
                            <span v-if="IsSubmitting" class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                <Cog6ToothIcon class="h-5 w-5 text-white" aria-hidden="true" />
                            </span>
                            Change Password
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>

   

    
</template>

<script setup>
    import { LockClosedIcon, UserIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline'
    import { IconLoader } from '@tabler/icons-vue';
    import { ref, onMounted } from 'vue';
    import { useAuthStore } from '@/stores/backoffice/auth'
    import { useAlertStore } from '@/stores/alert'
    import { useUserStore } from '@/stores/backoffice/user'
    import Alert from '@/components/Alert.vue'
    import { useForm, ErrorMessage  } from 'vee-validate'
    import * as yup from 'yup';


    const auth = useAuthStore()
    const alertModel = useAlertStore()
    const userModel = useUserStore()

    const account = ref(true)
    const security = ref(false)
    const IsSubmitting = ref(false)

    const avatarChanged = ref(false)
    const user_avatar_path = ref('')
    const new_user_avatar_path = ref('')

    const open_account = () => {
        alertModel.clear()
        account.value = true
        security.value = false

        user_avatar_path.value = userModel.user.avatar
        new_user_avatar_path.value = ''
        avatarChanged.value = false
    }

    const open_security = () => {
        alertModel.clear()
        account.value = false
        security.value = true

        current_password.value = ''
        new_password.value = ''
        confirm_new_password.value = ''
    }


   
    /* Fields and validation update profile start */
    const form_update_profile = useForm({
        validationSchema: yup.object({
            first_name: yup.string(),
            lastt_name: yup.string(),
            phone_number: yup.string()
        }),
    });

    const [first_name,last_name,phone_number] = form_update_profile.useFieldModel(['first_name','last_name', 'phone_number']);
    /* Fields and validation update profile end */

    /* Fields and validation change password start */
    const form_change_password = useForm({
        validationSchema: yup.object({
            current_password: yup.string().min(8).required(),
            new_password: yup.string().min(8).required(),
            confirm_new_password: yup.string().min(8).required(),
        }),
    });

    const [current_password, new_password, confirm_new_password] = form_change_password.useFieldModel(['current_password', 'new_password', 'confirm_new_password']);
    /* Fields and validation change password end */

    onMounted( async() => {
        await userModel.getById(auth.user.id)
        first_name.value = userModel.user.first_name
        last_name.value = userModel.user.last_name
        phone_number.value = userModel.user.phone_number
    })

    const changePassword = form_change_password.handleSubmit( async (values) => {
        alertModel.clear()
        IsSubmitting.value = true
        if(values['new_password'] != values['confirm_new_password']){
            alertModel.danger("The new passwords do not match", null, "block")
            IsSubmitting.value = false
            return false
        }
        delete values['confirm_new_password']
        let result = await auth.updatePassword(values)
        if(result.status){
            current_password.value = ''
            new_password.value = ''
            confirm_new_password.value = ''
        }
        IsSubmitting.value = false
    }, onInvalidSubmit);

    const updateProfile = form_update_profile.handleSubmit( async (values) => {
        alertModel.clear()
        IsSubmitting.value = true
        let result = await auth.update(values)
        if(result.status){
            
        }
        IsSubmitting.value = false
    }, onInvalidSubmit);

   

    function onInvalidSubmit({ errors }) {
        console.log(errors)
        // alertModel.clear()
        // alertModel.danger(Object.values(errors))
    }
</script>