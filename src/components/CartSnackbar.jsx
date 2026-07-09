import { useContext } from "react";
import { Snackbar, Alert } from "@mui/material";
import CartContext from "../context/CartContext";

function CartSnackbar(){
    const {snackbarOpen,
        setSnackbarOpen,
        snackbarMessage,
    }=useContext(CartContext)
    return(
        <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={()=>setSnackbarOpen(false)}
        anchorOrigin={{
            vertical:"bottom",
            horizontal:"center"
        }}
        >
            <Alert 
            severity="success"
            onClose={()=>setSnackbarOpen(false)}
            variant="filled"
            >
                {snackbarMessage}
            </Alert>

        </Snackbar>
    );
}
export default CartSnackbar