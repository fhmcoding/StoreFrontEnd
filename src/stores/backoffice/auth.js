import { ref, computed, watch, onMounted } from 'vue'
import { defineStore } from 'pinia'
import router from '../../router';
import axios from "axios"
import { useAlertStore } from '@/stores/alert';

const baseUrl = `https://storeapi.scentavenue.shop/api/auth/`;

export const useAuthStore = defineStore('auth', () => {

    const user = ref(JSON.parse(localStorage.getItem('user')))
    const token = ref(localStorage.getItem('token'))
    const permissions = ref(localStorage.getItem('permissions'))
    const alert = useAlertStore()
    
    
    if(user.value){
        refreshPermissions()
    }

    const hasPermission = computed(() => {
        return function(permission){
            if(permissions.value && permissions.value.indexOf(permission) == -1){
                return false
            }else{
                return true
            }
        }
    })

    async function login(phone_number, password){
        try {
            const response = await axios.post(
                baseUrl+'login',
                {
                    phone_number: phone_number,
                    password: password,
                },
                {
                    headers: {
                        "Accept": "application/json",
                    },
                }
            );
          
            this.user = response.data.user;
            this.token = response.data.token;
          
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', response.data.token);
            
            const listPermissions = await getPermissions()

            this.permissions = JSON.stringify(listPermissions.data);

            localStorage.setItem('permissions', JSON.stringify(listPermissions.data));
            console.log(listPermissions.data.find((e) => e.name == 'caisse'))
            if(listPermissions.data.find((e) => e.name == 'caisse') !== undefined ){
                await router.push('/backoffice/caisse');    
            }else{
                await router.push('/backoffice');
            }

            return { status: false }

        } catch (error) {

            return { status: false }
        }
    }

    async function getUsersAccountes(){
        try {
            return await axios.get(
                baseUrl+'users',
                {
                    headers: {
                        "Accept": "application/json",
                    },
                }
            );
        } catch (error) {
            //const alertStore = useAlertStore();
            //alertStore.error(error);
            //console.log('permissions error')
        }
    }

    async function getPermissions(){
        try {
            return await axios.get(
                baseUrl+'permissions',
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${token.value}`
                    },
                }
            );
        } catch (error) {
            //const alertStore = useAlertStore();
            //alertStore.error(error);
            //console.log('permissions error')
        }
    }

    async function logout(){
        this.user = null;
        this.token = null;
        this.permissions = null;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('permissions');
        await router.push('/login');
    }

    async function refreshPermissions(){
        const listPermissions = await getPermissions()
        permissions.value = JSON.stringify(listPermissions.data);
        localStorage.setItem('permissions', JSON.stringify(listPermissions.data));
    }
        async function update( user){
        try {
            const response = await axios.put(
                baseUrl, user,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${token.value}`
                    },
                }
            );
            alert.success("User Updated Successfully", null, "modal", 3000)
            this.user = response.data;
            localStorage.setItem('user', JSON.stringify(response.data));
            return { status: true}
        } catch (error) {
            if(error.response.data.hasOwnProperty('errors')){
                if (error.response.data.errors.first_name) {
                    alert.danger("first name", error.response.data.errors.first_name[0], "block")
                }
                if (error.response.data.errors.last_name) {
                    alert.danger("last name", error.response.data.errors.last_name[0], "block")
                }
                if (error.response.data.errors.user_name) {
                alert.danger("user name", error.response.data.errors.user_name[0], "block")
                }
                if (error.response.data.errors.email) {
                    alert.danger("email", error.response.data.errors.email[0], "block")
                }
                if (error.response.data.errors.phone) {
                    alert.danger("phone", error.response.data.errors.phone[0], "block")
                }
                if (error.response.data.errors.address) {
                    alert.danger("address", error.response.data.errors.address[0], "block")
                }
                if (error.response.data.errors.role_id) {
                    alert.danger("role", error.response.data.errors.role_id[0], "block")
                }
                if (error.response.data.errors.is_active) {
                    alert.danger("is_active", error.response.data.errors.is_active[0], "block")
                }
            }else{
                alert.danger("error", error.response.data.message, "block")
            }
            return { status: false }
        }
    }


     async function updatePassword(data){
        try {
            const response = await axios.put(
                baseUrl, data,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${token.value}`
                    },
                }
            );
            alert.success("Password Updated Successfully", null, "modal", 3000)
            return { status: true}
        } catch (error) {
            console.log(error)
            alert.danger("Password Updated Failed", null, "modal", 3000)
            // if(error.response.data.hasOwnProperty('errors')){
            //     if (error.response.data.errors.current_password) {
            //         alert.danger("current password", error.response.data.errors.current_password[0], "block")
            //     }
            //     if (error.response.data.errors.new_password) {
            //         alert.danger("new password", error.response.data.errors.new_password[0], "block")
            //     }
            // }else{
            //     alert.danger("error", error.response.data.message, "block")
            // }
                return { status: false }
        }
    }





    return { user, token, login, permissions, hasPermission, logout, update,updatePassword,getUsersAccountes }
})
