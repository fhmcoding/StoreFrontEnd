import { ref, computed, watch, onMounted } from 'vue'
import { defineStore } from 'pinia'
import router from '../../router';
import axios from "axios"

const baseUrl = `https://storeapi.scentavenue.shop/api/auth/`;

export const useAuthStore = defineStore('auth', () => {

    const user = ref(JSON.parse(localStorage.getItem('user')))
    const token = ref(localStorage.getItem('token'))
    const permissions = ref(localStorage.getItem('permissions'))

    
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

    return { user, token, login, permissions, hasPermission, logout, getUsersAccountes }
})
