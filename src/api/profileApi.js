import api from "./apiClient"

export async function getProfile() {
    const {data} = await api.get("/profile/");
    return data;
    
}
export async function updateProfile(profileData) {
    const { data } = await api.patch("/profile/",profileData);
    return data;
    
}