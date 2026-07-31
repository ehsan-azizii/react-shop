import { useContext,useState } from "react";
import AuthContext from "../context/AuthContext";
import { updateProfile,getProfile } from "../api/profileApi";
import { useNavigate } from "react-router-dom";
import { Container,TextField,Button } from "@mui/material"


function EditProfile(){
    const {user , updateUser}=useContext(AuthContext)

    const initialFormData = {
    username: user?.username || "",
    email: user?.email || "",
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    address: user?.profile?.address || "",
};
    const [formData, setFormData] = useState(initialFormData);
    const navigate= useNavigate()
    function handleChange(e){
        const {name, value}=e.target;

        setFormData((prev)=>({
            ...prev,
            [name]:value
        }));
    }
    async function handleSubmit(e) {
    e.preventDefault();

    try {

        const updatedData = await updateProfile({
            username: formData.username,
            email: formData.email,
            first_name: formData.first_name,
            last_name: formData.last_name,
            profile: {
                address: formData.address,
            },
        });

        const refreshedUser = await getProfile();


        updateUser(refreshedUser);

        navigate("/profile");

    } catch (error) {
        console.log(error);
        console.log("Status:", error.response?.status);
        console.log("Data:", error.response?.data);
    }
}   
    console.log("PAGE USER",user)
    return(
        
        <Container>
        <form onSubmit={handleSubmit}>
            <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
            />

            <TextField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />

            <TextField
                label="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
            />

            <TextField
                label="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
            />

            <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
            />

           <Button 
                    variant="contained"
                    color="primary"
                    type="submit">
                        Save Change
                </Button>
                </form>
        </Container>
    )
}
export default EditProfile