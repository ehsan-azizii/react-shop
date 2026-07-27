import { createContext, useEffect, useState} from "react";
import { login as logInApi } from "../api/authApi"
import { getProfile } from "../api/profileApi";

const AuthContext = createContext();
export function AuthProvider({children}){

    const [user,setUser]=useState(null)
    const [isAuthenticated,setIsAuthenticated]=useState(false)

   useEffect(() => {
    console.log("AuthContext mounted");

    async function loadUser() {
        console.log("loadUser called");

        const token = localStorage.getItem("access");
        console.log("Token:", token);

        if (!token) {
            console.log("No token");
            return;
        }

        try {
            const profile = await getProfile();
            console.log("Profile:", profile);

            setUser(profile);
            setIsAuthenticated(true);
        } catch (error) {
            console.log("Error:", error);
        }
    }

    loadUser();
}, []);
    async function logIn(formData){
        const {data} = await logInApi(formData)
        localStorage.setItem("access",data.access);
        localStorage.setItem("refresh",data.refresh);
        const profile= await getProfile()
        console.log(profile)
        setUser(profile)
        setIsAuthenticated(true)
    }
    function logOut(){
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setUser(null);
        setIsAuthenticated(false);
    }

    return(
        <AuthContext.Provider
        value={{
            isAuthenticated,
            user,
            logIn,
            logOut}}
        >
            {children}
        </AuthContext.Provider>
    )

}
export default AuthContext;