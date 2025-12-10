import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth';
import { useAlertStore } from '@/stores/alert';
import axios from "axios"

const baseUrl = `http://storeapi.fhmcoding.com/api/backoffice/permissions`;

export const usePermissionStore = defineStore('permission', () => {

    const permission = ref('')
    const permissions = ref([])

    const alert = useAlertStore()
    const auth = useAuthStore()

    async function getAll(){
        try {
            const response = await axios.get(
                baseUrl+'?include=roles',
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            this.permissions = response.data.data;
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
            this.permission = response.data;
        } catch (error) {
            console.log('get users error')
        }
    }

    async function store(permission){
        try {
            const response = await axios.post(
                baseUrl, permission,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            alert.success("Make Successfully", "permission has been created", "modal", 3000)
            return { status: true}
        } catch (error) {
            if (error.response.data.errors.name) {
                alert.danger("name", error.response.data.errors.name[0], "block")
            }
            if (error.response.data.errors.guard_name) {
                alert.danger("guard name", error.response.data.errors.guard_name[0], "block")
            }
            return { status: false }
        }
    }
  
    async function update(id, permission){
        try {
            const response = await axios.put(
                baseUrl+'/'+id, permission,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            alert.success("Permission Updated Successfully", null, "modal", 3000)
            return { status: true}
        } catch (error) {
            if (error.response.data.errors.name) {
                alert.danger("name", error.response.data.errors.name[0], "block")
            }
            if (error.response.data.errors.guard_name) {
                alert.danger("guard name", error.response.data.errors.guard_name[0], "block")
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
            alert.success("Permission Deleted Successfully", null, "modal", 3000)
        }catch(error){
            alert.danger("Permission Not Deleted", null, "block", 3000)
        }
    }

    return { permission, permissions, getAll, getById, destroy, store, update }
})
