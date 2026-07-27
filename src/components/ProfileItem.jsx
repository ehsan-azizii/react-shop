import { Box, Typography, Divider } from "@mui/material";

function ProfileItem({ label, value }) {
    return (
        <Box sx={{ width: "100%" }}>
            <Typography
                variant="subtitle2"
                color="text.secondary"
            >
                {label}
            </Typography>

            <Typography
                variant="body1"
                sx={{ mt: 0.5 }}
            >
                {value || "-"}
            </Typography>

            <Divider sx={{ my: 2 }} />
        </Box>
    );
}

export default ProfileItem;