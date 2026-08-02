import { useState,useContext } from "react";
import { registerApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../utils/errorHandler";
import {
    Container,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Stack,
} from "@mui/material";
import SnackbarContext from "../context/SnackbarContext";
function Register(){
    const [formData,setFormData]=useState({
        first_name:"",
        last_name:"",
        username:"",
        email:"",
        Password1:"",
        Password2:"",
    })
   const {showSnackbar}=useContext(SnackbarContext)
   const navigate = useNavigate();
    

    function handleChange(e){
        const {name,value}=e.target;

        setFormData((prev)=>({
            ...prev,
            [name]:value,
        }));
    }
    async function handleSubmit(e){
        e.preventDefault()
        if (formData.password !== formData.password2){
            showSnackbar("passwords do not match",'error');
            return;
            }
        else{
       try {
        const response = await registerApi(formData);
        showSnackbar("Account created successfully","success");
        navigate('/login')

       }catch(error){
        const message= getErrorMessage(
            error.response.data
        )
        showSnackbar(message,'error');
        
       }
       }
    }

    
    return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Card elevation={5} sx={{ borderRadius: 3 }}>
            <CardContent>

                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                >
                    Create Account
                </Typography>

                <Stack spacing={2} component="form" onSubmit={handleSubmit}>

                    <TextField
                        label="First Name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        label="Last Name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        label="Confirm Password"
                        type="password"
                        name="password2"
                        value={formData.password2}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth >
                        Register
                    </Button>
                </Stack>

            </CardContent>
        </Card>
    </Container>
);
}
export default Register