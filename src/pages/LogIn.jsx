
import { Container,TextField,Button } from "@mui/material"
import { useState,useContext } from "react"
import { login } from "../api/authApi"
import SnackbarContext from "../context/SnackbarContext"
import { useNavigate } from "react-router-dom"

function LogIn(){

    const initialFormData={
        username:"",
        password:"",
    }
    const [formData,setFormData]=useState(initialFormData)
    const {showSnackbar}=useContext(SnackbarContext)
    const navigate= useNavigate()
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
        console.log(formData)
        const {data} = await login(formData);
        localStorage.setItem("access",data.access)
        localStorage.setItem("refresh",data.refresh)
        setFormData(initialFormData)
        showSnackbar("Login successful!","success")
        navigate("/")
    } catch (error) {
        if (error.response?.status === 401) {
            showSnackbar("Invalid username or password","error")
        } else{
            showSnackbar("Something went wrong. Please try again later","error")

            }
        
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