import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth';
import { useAlertStore } from '@/stores/alert';
import axios from "axios"

const baseUrl = `https://storeapi.fhmcoding.com/api/backoffice/roles`;

export const useRoleStore = defineStore('roles', () => {

    const role = ref('')
    const roles = ref([])

    const alert = useAlertStore()
    const auth = useAuthStore()

    async function getAll(){
        try {
            const response = await axios.get(
                baseUrl+'?include=permissions,permissionsCount',
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            this.roles = response.data.data;
        } catch (error) {
            console.log('get users error')
        }
    }

    async function getById(id){
        try {
            const response = await axios.get(
                baseUrl+'/'+id+'?include=permissions',
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            this.role = response.data;
        } catch (error) {
            console.log('get users error')
        }
    }

    async function store(role){
        try {
            const response = await axios.post(
                baseUrl, role,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            alert.success("Make Successfully", "Role has been created", "modal", 3000)
            return { status: true}
        } catch (error) {
            if (error.response.data.errors.name) {
                alert.danger("name", error.response.data.errors.name[0], "block")
            }else if(error.response.data.errors.guard_name) {
                alert.danger("guard name", error.response.data.errors.guard_name[0], "block")
            }else{
                alert.danger("permissions", error.response.data.message, "block")
            }
            return { status: false }
        }
    }

    async function update(id, role){
        try {
            const response = await axios.put(
                baseUrl+'/'+id, role,
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    },
                }
            );
            alert.success("Role Updated Successfully", null, "modal", 3000)
            return { status: true}
        } catch (error) {
            if (error.response.data.errors.name) {
                alert.danger("name", error.response.data.errors.name[0], "block")
            }else if(error.response.data.errors.guard_name) {
                alert.danger("guard name", error.response.data.errors.guard_name[0], "block")
            }else{
                alert.danger("permissions", error.response.data.message, "block")
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
            alert.success("Role Deleted Successfully", null, "modal", 3000)
        }catch(error){
            alert.danger("Role Not Deleted", null, "block", 3000)
        }
    }

    return { role, roles, getAll, getById, destroy, store, update }
})
