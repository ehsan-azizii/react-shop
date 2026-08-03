import { Children, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";


function ProtectedRoute({children}){
    const {isAuthenticated,user,loading}=useContext(AuthContext);

    if (loading){
        return <h2>loading...</h2>
    } 
    
    if (!isAuthenticated && !user){
        return <Navigate to="/login" replace />;
    }
    return children;
}
export default ProtectedRoute;