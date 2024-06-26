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
                    <span @click="modalConfirm" class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-300">Roles</span>
                </div>
            </li>
        </ol>
    </nav>

    <!-- alert -->
    <Alert class="m-0" v-show="! createRoleModal && ! editRoleModal" />

    <!-- table data -->
    <div class="md:bg-white md:bg-gray-150 md:rounded-lg md:shadow-md dark:bg-gray-800 mb-5">
        <div class="p-4 flex justify-between">
            <h1 class="my-auto text-xl font-semibold text-gray-900 dark:text-gray-50">Roles</h1>
            <button v-if="auth.hasPermission('role-create')" @click="createRole()" class="text-white bg-primary hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2">
                <PlusCircleIcon class="h-5 mr-1" aria-hidden="true" />
                Add Role
            </button>
        </div>

        <hr class="dark:border-gray-600 hidden md:block" />

        <div class="overflow-auto overflow-x-auto "><!-- hidden md:block -->
            <table class="table-auto min-w-full max-w-full overflow-x-auto">
                <thead class="bg-gray-50 dark:bg-gray-700">
                    <tr class="dark:border-gray-700">
                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 dark:text-gray-300">Name</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">Guard</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">Assigned To</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">Created Date</th>
                        <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-gray-900 dark:text-gray-300 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                    <tr v-if="isLoading" class="text-center text-gray-400"><td colspan="5" class="p-2">loading...</td></tr>
                    <tr v-else-if="roleModel.roles.length == 0" class="text-center text-gray-400"><td colspan="5" class="p-2">Empty</td></tr>
                    <tr v-else v-for="item in roleModel.roles" :key="item.name">
                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-600 dark:text-gray-300 sm:pl-6">
                            {{ item.name.replace('-',' ').toUpperCase() }}
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-gray-500 dark:text-gray-300">
                            <span class="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-primary text-white rounded">
                                {{ item.guard_name }}
                            </span>
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-gray-500">
                            Total  {{ item.permissions_count }} Permissions
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {{ formatDate(item.created_at) }}
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-center sm:pr-6">
                            <div class="flex justify-center text-primary dark:text-primary font-bold space-x-2">
                                <TrashIcon v-if="auth.hasPermission('role-delete')" @click="destroy(item.id)" class="cursor-pointer font-bold h-5 w-5" aria-hidden="true" />
                                <PencilSquareIcon  v-if="auth.hasPermission('role-edit')" @click="editRole(item.id)" class="cursor-pointer font-bold h-5 w-5" aria-hidden="true" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Create Modal -->
    <TransitionRoot as="template" :show="createRoleModal">
        <Dialog as="div" class="relative z-10" >
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>
                
            <div class="fixed inset-0 z-10 overflow-y-auto w-max-full sm:w-full">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 sm:w-full">
                    <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel class="relative transform overflow-hidden rounded-md dark:bg-gray-800 bg-white px-4 pt-5 pb-3 text-left shadow-xl transition-all sm:my-8 w-full max-w-full md:max-w-3xl sm:p-6 ">
                            <div class="border-b-2 border-gray-200 w-full py-2 mb-7 text-gray-500 text-lg">
                                Add New Role
                            </div>
                            <!-- alert block for modal -->
                            <Alert v-if="createRoleModal" class="m-0" />
                            <form @submit="storeRole">
                                <div class="grid grid-cols-6 gap-6">
                                    <div class="col-span-6 ">
                                        <label for="user-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Role Name</label>
                                        <input v-model="name" type="text" name="name" id="user-name" autocomplete="given-name" placeholder="Role Name" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                        
                                    </div>

                                    <div class="col-span-6 ">
                                        <label for="country" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Role Guard</label>
                                        <select v-model="guard_name" id="country" name="guard_name" autocomplete="country-name" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                            <option value="">Select Guard Name</option>
                                            <option value="user">User</option>
                                        </select>
                                        
                                    </div>

                                    <label for="guard_name" class="block text-sm font-medium text-gray-700 dark:text-gray-300" v-if="guard_name">Permissions</label>
                                    
                                    <div class="grid gap-4 sm:grid-cols-4 grid-cols-2 grid-rows-3 col-span-6 ">
                                        <div v-for="item in permissionModel.permissions" :key="item.name" v-show="item.guard_name == guard_name" class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                                            <input v-model="permissions_id" :id="item.id" type="checkbox" :value="item.id" name="permissions_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                            <label :for="item.id" class="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ item.name.replace('-',' ').toLowerCase() }}</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-9 flex flex-row w-full content-center justify-center items-center space-x-2">
                                    <button :disabled="IsSubmitting" @click="createRoleModal = false; alertModel.clear()" type="button" class="button inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-xs sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                        Cancel
                                    </button>
                                    <button type="submit" :disabled="IsSubmitting" class="inline-flex bg-primary w-full justify-center rounded-md border border-transparent px-4 py-2 mx-1 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-xs sm:text-sm sm:w-auto">
                                        <span v-if="IsSubmitting" class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                            <Cog6ToothIcon class="h-5 w-5 text-white" aria-hidden="true" />
                                        </span>
                                        Create Role
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
    <TransitionRoot as="template" :show="editRoleModal">
        <Dialog as="div" class="relative z-10" >
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>
                
            <div class="fixed inset-0 z-10 overflow-y-auto w-max-full sm:w-full">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 sm:w-full">
                    <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel class="relative transform overflow-hidden rounded-md dark:bg-gray-800 bg-white px-4 pt-5 pb-3 text-left shadow-xl transition-all sm:my-8 w-full max-w-full md:max-w-3xl sm:p-6">
                            <div class="border-b-2 border-gray-200 w-full py-2 mb-7 text-gray-500 text-lg">
                                Edit Role
                            </div>
                            <!-- alert block for modal -->
                            <Alert class="m-0" v-if="editRoleModal"/>
                            <form @submit="updateRole">
                                <div class="grid grid-cols-6 gap-6">
                                    <div class="col-span-6 ">
                                        <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Role Name</label>
                                        <input v-model="name" type="text" name="name" id="name" placeholder="Role Name" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                        
                                    </div>

                                    <div class="col-span-6 ">
                                        <label for="guard_name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Role Guard</label>
                                        <select v-model="guard_name" id="guard_name" name="guard_name" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                            <option value="">Select Guard Name</option>
                                            <option value="user">User</option>
                                        </select>
                                       
                                    </div>

                                    <label for="guard_name" class="block text-sm font-medium text-gray-700 dark:text-gray-300" v-if="guard_name">Permissions</label>
                                    
                                    <div class="grid gap-4 sm:grid-cols-4 grid-cols-2 grid-rows-3 col-span-6 ">
                                        <div v-for="item in permissionModel.permissions" :key="item.name" v-show="item.guard_name == guard_name" class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                                            <input v-model="permissions_id" :id="item.id" :checked="roleModel.role.permissions.filter(n=>n.id===item.id).length===0?false:true" type="checkbox" :value="item.id" name="permissions_id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                            <label :for="item.id" class="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ item.name.replace('-',' ').toLowerCase() }}</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-9 flex flex-row w-full content-center justify-center items-center space-x-2">
                                    <button :disabled="IsSubmitting" @click="editRoleModal = false; alertModel.clear()" type="button" class="button inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-xs sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                        Cancel
                                    </button>
                                    <button type="submit" :disabled="IsSubmitting" class="button inline-flex bg-primary w-full justify-center rounded-md border border-transparent px-4 py-2 mx-1 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-xs sm:text-sm sm:w-auto">
                                        <span v-if="IsSubmitting" class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                            <Cog6ToothIcon class="h-5 w-5 text-white" aria-hidden="true" />
                                        </span>
                                        Update Role
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
    import { TrashIcon, PencilSquareIcon, PlusCircleIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline'
    import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
    import { ref,onMounted,watch } from 'vue'
    import moment from 'moment'
    import { useAlertStore } from '@/stores/alert'
    import { useAuthStore } from '@/stores/backoffice/auth'
    import { useRoleStore } from '@/stores/backoffice/role'
    import { usePermissionStore } from '@/stores/backoffice/permission'
    import { useForm } from 'vee-validate';
    import * as yup from 'yup';
    import Alert from '@/components/Alert.vue'
   

    const auth = useAuthStore()
    const alertModel = useAlertStore()
    const roleModel = useRoleStore()
    const permissionModel = usePermissionStore()
    const createRoleModal = ref(false)
    const editRoleModal = ref(false)
    const IsSubmitting = ref(false)
    const isLoading = ref(true)
    const permissions_id = ref([])
    
    /* Fields and validation start */
    

    
    const form_create_role = useForm({
        validationSchema:yup.object({
            name: yup.string().min(3).required(),
            guard_name: yup.string().required(),
        })
    });

    const [name, guard_name] = form_create_role.useFieldModel(['name', 'guard_name']);
    /* Fields and validation end */


    /* Create Role start */
    async function createRole(){
        alertModel.clear()
        await permissionModel.getAll()
        name.value = ''
        guard_name.value = ''
        permissions_id.value = []
        createRoleModal.value = true
    }

    const storeRole = form_create_role.handleSubmit( async (values) => {
        if(permissions_id.value.length == 0){
            alertModel.danger("permissions", "permissions is required", "block")
            return false
        }
        values['permissions_id'] = permissions_id.value
        alertModel.clear()
        IsSubmitting.value = true
        let result = await roleModel.store(values)
        if(result.status){
            createRoleModal.value = false
            name.value = ''
            guard_name.value = ''
            isLoading.value = true
            await roleModel.getAll()
            isLoading.value = false
        }
        IsSubmitting.value = false
    },onInvalidSubmit);
    /* Create Role end */


    /* Edit Role start */
    async function editRole(id){
        alertModel.clear()
        await permissionModel.getAll()
        await roleModel.getById(id)
        name.value = roleModel.role.name
        guard_name.value = roleModel.role.guard_name
        permissions_id.value = roleModel.role.permissions.map(a => a.id)
        editRoleModal.value = true
    }

    const updateRole = form_create_role.handleSubmit( async (values) => {
        if(permissions_id.value.length == 0){
            alertModel.danger("permissions", "permissions is required", "block")
            return false
        }
        values['permissions_id'] = permissions_id.value
        alertModel.clear()
        IsSubmitting.value = true
        let result = await roleModel.update(roleModel.role.id, values)
        if(result.status){
            editRoleModal.value = false
            name.value = ''
            guard_name.value = ''
            isLoading.value = true
            await roleModel.getAll()
            isLoading.value = false
        }
        IsSubmitting.value = false
    },onInvalidSubmit);
    /* Edit Role end */

    /* Destroy Permission start */
    function destroy(id){
        alertModel.clear()
        alertModel.remove("Remove Role", "Are you sure ?", id)
    }

    watch(alertModel, async () => {
        if(alertModel.alert && alertModel.alert.callback && alertModel.alert.confirm){
            await roleModel.destroy(alertModel.alert.id)
            isLoading.value = true
            await roleModel.getAll()
            isLoading.value = false
        }
    })
    /* Destroy Permission end */

    onMounted( async() => {
        await roleModel.getAll()
        isLoading.value = false
    })
    
    const formatDate = (value) => {
        return moment(value).format('DD MMM YYYY, hh:mm A')
    }

    function onInvalidSubmit({ errors }) {
        alertModel.clear()
        alertModel.danger(Object.keys(errors)[0], Object.values(errors)[0], "block")
    }
    
</script>