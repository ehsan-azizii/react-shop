
import { Container,TextField,Button } from "@mui/material"
import { useState } from "react"
import axios from "axios";
function LogIn(){
    const [formData,setFormData]=useState({
        username:"",
        password:""
    })
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
        const response = await login(formData);

        console.log(response);
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