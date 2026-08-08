import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx'

import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import { CartProvider } from './context/CartContext.jsx';
import { SnackbarProvider } from './context/SnackbarContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
console.log(theme)

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <AuthProvider>
       <SnackbarProvider>
            <CartProvider>
                  <App />
            </CartProvider>
         </SnackbarProvider>
         </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
    
  
  ,
)
