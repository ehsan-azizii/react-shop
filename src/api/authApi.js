import api from "./apiClient"
export async function login(formData){
    return api.post("/token/",formData)
}