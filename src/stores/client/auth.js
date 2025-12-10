import { ref ,computed} from 'vue'
import { defineStore } from 'pinia'
import axios from "axios"

const baseUrl = `https://storeapi.fhmcoding.com/api/auth/client/`;

export const  useAuthStore = defineStore('auth',() => {

    const user = ref(JSON.parse(localStorage.getItem('user')))
    const token = ref(localStorage.getItem('token'))
    

    async function login(payload){
        try {
            const response = await axios.post(
                baseUrl+'login',
                payload,
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
            
           

            return { status: false }

        } catch (error) {

            return { status: false }
        }
    }

    
    async function register(payload){
        try {
            const response = await axios.post(
                baseUrl+'register',
                payload,
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
            
           
            await router.push('/');

            return { status: false }

        } catch (error) {

            return { status: false }
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



    return { user, token, logout , login, register}

});