import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container, 
    Card,
    CardContent,
    Avatar,
    Stack,
    Button,
    Typography
} from "@mui/material";
import ProfileItem from "../components/ProfileItem";
import AuthContext from "../context/AuthContext";
export default function Profile(){
    const {user}=useContext(AuthContext)
    const navigate= useNavigate();
    
    if (!user) return <h2>Loading...</h2>;

    return(
        <Container maxWidth="sm" sx={{mt:5,}}>
            <Card elevation={5}sx={{borderRadius:3}}>
                <CardContent>
                    <Stack spacing={2}
                     alignItems="center"
                     >
                            <Avatar
                                sx={{
                                    width: 90,
                                    height: 90,
                                }}
                            />
                            <Typography variant="h5">
                                {user.first_name || user.last_name
                                    ? `${user.first_name} ${user.last_name}`
                                    : user.username}
                            </Typography>

                            <ProfileItem
                                label="Email"
                                value={user.email}
                            />

                            <ProfileItem
                                label="Phone"
                                value={user.phone}
                            />

                            <ProfileItem
                                label="Address"
                                value={user.address}
                            />        
                            <Button
                            variant="contained"
                            sx={{ mt: 2 }}
                            onClick={() => navigate("/profile/edit")}
                        >
                            Edit Profile
                    </Button> 
                    </Stack>
                </CardContent>
            </Card>
        </Container>
                
    );
}