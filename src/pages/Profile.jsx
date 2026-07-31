import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Card,
    CardContent,
    Avatar,
    Typography,
    Stack,
    Button,
} from "@mui/material";

import AuthContext from "../context/AuthContext";
import ProfileItem from "../components/ProfileItem";

export default function Profile() {
    const { user } = useContext(AuthContext);
    console.log("user",user)
    const navigate = useNavigate();

    if (!user) return <h2>Loading...</h2>;

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Card elevation={5} sx={{ borderRadius: 3 }}>
                <CardContent>

                   
                    <Stack spacing={2} alignItems="center" sx={{ mb: 3 }}>

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

                        <Typography color="text.secondary">
                            @{user.username}
                        </Typography>

                    </Stack>

                   
                    <ProfileItem
                        label="Email"
                        value={user.email}
                    />

                    <ProfileItem
                        label="Address"
                        value={user.profile?.address}
                    />

                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={() => navigate("/profile/edit")}
                    >
                        Edit Profile
                    </Button>

                </CardContent>
            </Card>
        </Container>
    );
}