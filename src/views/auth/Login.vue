<template>
    <div class="flex h-full min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-100">
        <div class="w-full h-full max-w-md space-y-8">
            <div>
                <img class="mx-auto h-12 w-auto" src="/logo.png" alt="Your Company">
                <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
            </div>
            <form class="mt-8 space-y-6" @submit.prevent="submit">
                <input type="hidden" name="remember" value="true">
                <div class="-space-y-px rounded-md shadow-sm">
                    <div>
                        <label for="phone-number" class="sr-only">Phone Number</label>
                        <input v-model="phone_number"  id="phone-number" name="phone_number" type="text" autocomplete="phone_number" required class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Phone Number">
                    </div>
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <input v-model="password" id="password" name="password" type="password" autocomplete="current-password" required class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password">
                    </div>
                </div>
        
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                        <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
                    </div>
            
                    <div class="text-sm">
                        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
                    </div>
                </div>
        
                <div>
                    <button type="submit" :disabled="IsSubmitting" class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                            <span v-if="!IsSubmitting" class="h-5 w-5 mr-2" viewBox="0 0 24 24">
                                <LockClosedIcon class="h-5 w-5 text-white" aria-hidden="true" />
                            </span>
                            <span v-if="IsSubmitting" class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                <Cog6ToothIcon class="h-5 w-5 text-white" aria-hidden="true" />
                            </span>
                        </span>
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
    import { Cog6ToothIcon, LockClosedIcon } from '@heroicons/vue/24/outline'
    import { ref } from 'vue';
    import { useAuthStore } from '@/stores/backoffice/auth';
    
    const auth = useAuthStore()
   
    const phone_number = ref('');
    const password = ref('');

    const IsSubmitting = ref(false)

    const submit = async () => {
        IsSubmitting.value = true
        let result = await auth.login(phone_number.value, password.value)
        if(! result.status){
            IsSubmitting.value = false
        }
    };
</script>