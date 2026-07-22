import { useEffect, useState } from "react";
import { getProfile } from "../api/profileApi";

export default function Profile(){
    const [user,setUser]=useState(null);

    useEffect(()=>{
        async function fetchProfile() {
            try{
                const data = await getProfile();
                setUser(data);
            } catch(err){
                console.log(err);
            }
            
        }

        fetchProfile();
    },[]);
    if (!user) return <h2>Loading...</h2>;
    return(
        <div>
            <h2>{user.username}</h2>
        </div>
    );
}