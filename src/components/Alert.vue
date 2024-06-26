<template>
    <div>

        <!-- ALERT BLOCK -->
        <div v-if="alert.alert && alert.alert.display == 'block'" class="shadow mb-3" role="alert">  
            <div class="flex">    
                <div :class="[
                        'w-16 text-center p-1',
                        {'bg-green-500' : alert_type == 'alert-success'},
                        {'bg-red-500' : alert_type == 'alert-danger'},
                        {'bg-yellow-500' : alert_type == 'alert-warning'},
                        {'bg-primary' : alert_type == 'alert-notification'}
                    ]">      
                    <div class="flex justify-center h-full items-center">        
                        <CheckBadgeIcon v-if="alert_type == 'alert-success'" class="h-6 w-6 text-white" aria-hidden="true" /> 
                        <HandRaisedIcon v-if="alert_type == 'alert-danger'" class="h-6 w-6 text-white" aria-hidden="true" /> 
                        <ExclamationTriangleIcon v-if="alert_type == 'alert-warning'" class="h-6 w-6 text-white" aria-hidden="true" /> 
                        <BellAlertIcon v-if="alert_type == 'alert-notification'" class="h-6 w-6 text-white" aria-hidden="true" />  
                    </div>    
                </div>    
                <div :class="[
                        'bg-white dark:bg-gray-700 border-r-4 w-full p-2',
                        {'border-green-500' : alert_type == 'alert-success'},
                        {'border-red-500' : alert_type == 'alert-danger'},
                        {'border-yellow-500' : alert_type == 'alert-warning'},
                        {'border-primary' : alert_type == 'alert-notification'}
                    ]">      
                    <div>        
                        <p class="text-gray-600 dark:text-gray-100 text-sm font-bold">{{ alert_title }}</p>        
                        <p class="text-gray-600 dark:text-gray-50 text-xs">{{ alert_message }}</p>      
                    </div>    
                </div>  
            </div>
        </div>

        <!-- ALERT CONFIRM/REMOVE -->
        <div aria-live="assertive" class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
            <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
                <TransitionRoot as="template" :show="open">
                    <Dialog as="div" class="relative z-10" >
                        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </TransitionChild>
                    
                        <div class="fixed inset-0 z-10 overflow-y-auto sm:w-full">
                            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 sm:w-full">
                                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                                    <DialogPanel class="relative w-full transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full max-w-sm sm:p-6">
                                        <div>
                                            <div :class="[
                                                    'mx-auto flex h-12 w-12 items-center justify-center rounded-full ',
                                                    {'bg-purple-100' : alert_type == 'alert-confirm'},
                                                    {'bg-red-100' : alert_type == 'alert-remove'},
                                                ]">
                                                <CheckCircleIcon v-if="alert_type == 'alert-confirm'" class="h-6 w-6 text-primary" aria-hidden="true" />
                                                <TrashIcon v-if="alert_type == 'alert-remove'" class="h-6 w-6 text-red-600" aria-hidden="true" />
                                            </div>
                                            <div class="mt-3 text-center sm:mt-5">
                                                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">{{ alert_title }}</DialogTitle>
                                                <div class="mt-2">
                                                    <p class="text-sm text-gray-500">{{ alert_message }}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mt-5 sm:mt-6 flex flex-row w-full content-center justify-center items-center space-x-2">
                                            <button @click="_refuse" type="button" class="button inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-xs sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                                Cancel
                                            </button>
                                            <button @click="_confirm" type="button" :class="[
                                                'button inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 mx-1 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-xs sm:text-sm sm:w-auto',
                                                {'bg-red-500' : alert_type == 'alert-remove'},
                                                {'hover:bg-red-700' : alert_type == 'alert-remove'},
                                                {'bg-primary' : alert_type == 'alert-confirm'},
                                                {'hover:bg-indigo-700' : alert_type == 'alert-confirm'},
                                            ]">
                                                Confirm
                                            </button>
                                        </div>
                                    </DialogPanel>
                                </TransitionChild>
                            </div>
                        </div>
                    </Dialog>
                </TransitionRoot>
            </div>
        </div>

        <!-- ALERT MODAL -->
        <!-- <div aria-live="assertive" class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
            <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
                <transition enter-active-class="transform ease-out duration-300 transition" enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2" enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                    <div v-if="show" class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white dark:bg-gray-600 shadow-lg ring-1 ring-black ring-opacity-5">
                        <div class="p-4">
                            <div class="flex items-start">
                                <div class="flex-shrink-0">
                                    <CheckBadgeIcon v-if="alert.alert.type == 'alert-success'" class="h-6 w-6 text-green-500" aria-hidden="true" /> 
                                    <HandRaisedIcon v-if="alert.alert.type == 'alert-danger'" class="h-6 w-6 text-red-500" aria-hidden="true" /> 
                                    <ExclamationTriangleIcon v-if="alert.alert.type == 'alert-warning'" class="h-6 w-6 text-yellow-500" aria-hidden="true" /> 
                                    <BellAlertIcon v-if="alert.alert.type == 'alert-notification'" class="h-6 w-6 text-primary" aria-hidden="true" /> 
                                </div>
                                <div class="ml-3 w-0 flex-1 pt-0.5">
                                    <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ alert.alert.title }}</p>
                                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-300">{{ alert.alert.message }}</p>
                                </div>
                                <div class="ml-4 flex flex-shrink-0">
                                    <button type="button" @click="show = false" class="inline-flex rounded-md bg-white text-gray-400 dark:bg-gray-600 dark:text-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                        <span class="sr-only">Close</span>
                                        <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div> -->
        <div aria-live="assertive" class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start z-20 sm:p-6">
            <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
                <transition enter-active-class="transform ease-out duration-300 transition" enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2" enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                    <div v-if="show" :class="[
                            'pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg shadow-lg ring-opacity-5',
                            {'bg-green-500' : alert_type == 'alert-success'},
                            {'bg-red-500' : alert_type == 'alert-danger'},
                            {'bg-yellow-500' : alert_type == 'alert-warning'},
                            {'bg-primary' : alert_type == 'alert-notification'}
                        ]">
                        <div class="p-4">
                            <div class="flex items-start">
                                <div class="flex-shrink-0">
                                    <CheckBadgeIcon v-if="alert_type == 'alert-success'" class="h-6 w-6 text-white" aria-hidden="true" /> 
                                    <HandRaisedIcon v-if="alert_type == 'alert-danger'" class="h-6 w-6 text-white" aria-hidden="true" /> 
                                    <ExclamationTriangleIcon v-if="alert_type == 'alert-warning'" class="h-6 w-6 text-white" aria-hidden="true" /> 
                                    <BellAlertIcon v-if="alert_type == 'alert-notification'" class="h-6 w-6 text-white" aria-hidden="true" /> 
                                </div>
                                <div class="ml-3 w-0 flex-1 pt-0.5">
                                    <p class="text-sm font-medium text-gray-50">{{ alert_title }}</p>
                                    <p class="mt-1 text-sm text-gray-50">{{ alert_message }}</p>
                                </div>
                                <div class="ml-4 flex flex-shrink-0">
                                    <button type="button" @click="show = false" class="inline-flex rounded-md  text-gray-50 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                        <span class="sr-only">Close</span>
                                        <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
    
</template>

<script setup>
import { useAlertStore } from '@/stores/alert';
import { ref, watch } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationTriangleIcon, BellAlertIcon, CheckBadgeIcon, CheckCircleIcon, HandRaisedIcon, TrashIcon, XMarkIcon, CheckIcon } from '@heroicons/vue/24/outline'

const alert = useAlertStore()
const open = ref(false)
const show = ref(false)

const _confirm = () => {
    alert.alert.confirm = true; 
    alert.alert.callback = true; 
    open.value = false;
}

const _refuse = () => {
    alert.alert.confirm = false; 
    alert.alert.callback = true; 
    open.value = false;
}

const alert_type = ref('')
const alert_title = ref('')
const alert_message = ref('')



watch(alert, () => {
    if(alert.alert){
        alert_type.value = alert.alert.type
        alert_title.value = alert.alert.title
        alert_message.value = alert.alert.message
    }
    if(alert.alert && !alert.alert.callback && (alert.alert.type == 'alert-confirm' || alert.alert.type == 'alert-remove') && alert.alert.display == 'modal'){
        open.value = true
        if(alert.alert.timeOut > 0){
            setTimeout(() => open.value = false, alert.alert.timeOut);
        }
    }
    if(alert.alert && !alert.alert.callback && alert.alert.type != 'alert-confirm' && alert.alert.type != 'alert-remove' && alert.alert.display == 'modal'){
        show.value = true
        if(alert.alert.timeOut > 0){
            setTimeout(() => show.value = false, alert.alert.timeOut);
        }
    }
    if(alert.alert && alert.alert.display == 'block'){
        if(alert.alert.timeOut > 0){
            setTimeout(() => alert.alert = null, alert.alert.timeOut);
        }
    }
})

</script>