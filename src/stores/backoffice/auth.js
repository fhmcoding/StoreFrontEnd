import { ref, computed, watch, onMounted } from 'vue'
import { defineStore } from 'pinia'
import router from '../../router';
import axios from "axios"

const baseUrl = `http://127.0.0.1:8000/api/auth/`;

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

    async function login(email, password){
        try {
            const response = await axios.post(
                baseUrl+'login',
                {
                    email: email,
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

            await router.push('/backoffice');

            return { status: false }

        } catch (error) {

            return { status: false }
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
        await router.push('/user/login');
    }

    async function refreshPermissions(){
        const listPermissions = await getPermissions()
        permissions.value = JSON.stringify(listPermissions.data);
        localStorage.setItem('permissions', JSON.stringify(listPermissions.data));
    }

    return { user, token, login, permissions, hasPermission, logout }
})
