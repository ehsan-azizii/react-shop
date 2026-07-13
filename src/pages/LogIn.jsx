
import { Container,TextField,Button } from "@mui/material"
import { useState,useContext } from "react"
import { login } from "../api/authApi"
import SnackbarContext from "../context/SnackbarContext"

function LogIn(){

    const initialFormData={
        username:"",
        password:"",
    }
    const [formData,setFormData]=useState(initialFormData)
    const {showSnackbar}=useContext(SnackbarContext)
    function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));
    }
    async function handleSubmit(e) {
    e.preventDefault();

    try {
        const {data} = await login(formData);
        localStorage.setItem("access",data.access)
        setFormData(initialFormData)
        showSnackbar("Login successful!")
        
    } catch (error) {
        console.error(error);
    }
}
    return(
        
        <Container>
        <form onSubmit={handleSubmit}>
           <TextField 
           label="Username"
           name="username"
           value={formData.username}
           onChange={handleChange}
           ></TextField> 
           <TextField 
           label="Password"
           type="password"
           name="password"
           value={formData.password}
           onChange={handleChange}
           ></TextField> 
           <Button 
                    variant="contained"
                    color="primary"
                    type="submit">
                        Login
                </Button>
                </form>
        </Container>
    )
}
export default LogIn