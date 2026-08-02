import { createContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarContext = createContext();

export function SnackbarProvider({ children }) {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("success");

    function showSnackbar(message,severity="success") {
        setMessage(message);
        setOpen(true);
        setSeverity(severity);
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
                    severity={severity}
                    onClose={handleClose}
                    sx={{whiteSpace:'pre-line'}}
                >
                    {message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
}

export default SnackbarContext;