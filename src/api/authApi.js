import api from "./apiClient"
export async function login(formData){
    return api.post("/token/",formData)
}
export async function registerApi(formData){
    return api.post("/register/",formData)   
}