import axios from "axios";
export async function login(formData){
    return axios.post("http://127.0.0.1:8000/api/token/",formData)
}