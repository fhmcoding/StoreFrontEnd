import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth';
import { useAlertStore } from '@/stores/alert';
import axios from "axios"

const baseUrl = `https://storeapi.scentavenue.shop/api/backoffice/clients`;

export const useClientStore = defineStore('client', () => {

    const client = ref('')
    const clients = ref([])

    const pagination = ref('')
    const page = ref(1)
    const per_page = ref(10)

    const alert = useAlertStore()
    const auth = useAuthStore()

    async function getAll(){
        console.log('test')
        try {
            const response = await axios.get(
                baseUrl+'?include=roles'+'&per_page='+per_page.value+'&page='+page.value,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            this.clients = response.data.data;
            this.pagination  = response.data.meta;
        } catch (error) {
            console.log('get users error')
        }
    }

    async function getById(id){
        try {
            const response = await axios.get(
                baseUrl+'/'+id+'?include=roles',
                {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${auth.token}`
                },
                }
            );
            this.client = response.data
        } catch (error) {
            console.log('get clients error')
        }
    }

    async function store(client){
        try {
            const response = await axios.post(
                baseUrl, client,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            alert.success("Client Created Successfully", null, "modal", 3000)
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
                    alert.danger("email", error.response.data.errors.is_active[0], "block")
                }
            }else{
                alert.danger("error", error.response.data.message, "block")
            }
            return { status: false }
        }
    }

    async function update(id, client){
        try {
            const response = await axios.put(
                baseUrl+'/'+id, client,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            alert.success("Client Updated Successfully", null, "modal", 3000)
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

    async function destroy(id){
        try{
            const response = await axios.delete(
                baseUrl+'/'+id,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            alert.success("Client Deleted Successfully", null, "modal", 3000)
        }catch(error){
            alert.danger("Client Not Deleted", null, "block", 3000)
        }
    }

    async function updatePassword(id, data){
        try {
            const response = await axios.put(
                baseUrl+'/'+id+'/update-password', data,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            alert.success("Password Updated Successfully", null, "modal", 3000)
            return { status: true}
        } catch (error) {
        if(error.response.data.hasOwnProperty('errors')){
            if (error.response.data.errors.current_password) {
                alert.danger("current password", error.response.data.errors.current_password[0], "block")
            }
            if (error.response.data.errors.new_password) {
                alert.danger("new password", error.response.data.errors.new_password[0], "block")
            }
        }else{
            alert.danger("error", error.response.data.message, "block")
        }
            return { status: false }
        }
    }

    async function updateAvatar(id, data){
        try {
            const response = await axios.post(
                baseUrl+'/'+id+'/update-avatar', data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        "Authorization": `Bearer ${auth.token}`,
                    },
                }
            );
            alert.success("Avatar Updated Successfully", null, "modal", 3000)
            return { status: true}
        } catch (error) {
            if(error.response.data.hasOwnProperty('errors')){
                if (error.response.data.errors.avatar) {
                    alert.danger("avatar", error.response.data.errors.avatar[0], "block")
                }
            }else{
                alert.danger("error", error.response.data.message, "block")
            }
            return { status: false }
        }
    }

    return { client, clients, getAll, getById, pagination,page,per_page, destroy, store, update, updatePassword, updateAvatar }
})
