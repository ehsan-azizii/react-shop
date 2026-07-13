import { createContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarContext = createContext();

export function SnackbarProvider({ children }) {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    function showSnackbar(message) {
        setMessage(message);
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <SnackbarContext.Provider
            value={{ showSnackbar }}
        >
            {children}

            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert
                    severity="success"
                    onClose={handleClose}
                >
                    {message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
}

export default SnackbarContext;