import { createContext, useState } from "react";
import { login as logInApi } from "../api/authApi"

const AuthContext = createContext();
export function AuthProvider({children}){
    
    const [isAuthenticated,setIsAuthenticated]=useState(
        !!localStorage.getItem("access")
    );
    async function logIn(formData){
        const {data} = await logInApi(formData)
        localStorage.setItem("access",data.access);
        localStorage.setItem("refresh",data.refresh);
        setIsAuthenticated(true)
    }
    function logOut(){
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setIsAuthenticated(false);
    }

    return(
        <AuthContext.Provider
        value={{
            isAuthenticated,
            logIn,
            logOut}}
        >
            {children}
        </AuthContext.Provider>
    )

}
export default AuthContext;