import {Link, useNavigate} from "react-router-dom";
import { useContext } from "react"
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Button,
    Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import CartContext from "../context/CartContext";
import AuthContext from "../context/AuthContext";
import SnackbarContext from "../context/SnackbarContext";

function NavBar(){
    const {cart}=useContext(CartContext);
    const { isAuthenticated, logOut } = useContext(AuthContext);
    const {showSnackbar}=useContext(SnackbarContext);
    const navigate = useNavigate()

    function handleLogout(){
        logOut();
        showSnackbar("logOut successfuly!","success")
        navigate("/")
    }
    const totalItems=cart.reduce((total,item)=>{
        return total + item.quantity
    },0);
    console.log(totalItems)
    return(
        <AppBar position="static">
            <Toolbar 
            sx={{
               display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                 }}
            >
                <Typography 
                variant="h6" 
                component={Link}
                to="/"
                sx={{
                    textDecoration:"none",
                    color:"inherit",
                    fontWeight:"bold",
                }}
                >
                    MyShop
                </Typography>
            
            <Box
            sx={{
                display:"flex",
                gap:3,
                alignItems:"center"
            }}
            >
                <Typography
                component={Link}
                to="/"
                sx={{
                    textDecoration:"none",
                    color:"inherit"
                }}
                >
                    Home
                </Typography>
               {
                    isAuthenticated ? (
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    ) : (
                        <Button
                            color="inherit"
                            component={Link}
                            to="/login"
                        >
                            Login
                        </Button>
                    )
                }
            </Box>
                <IconButton
                component={Link}
                to="/cart"
                color="inherit"
                >
                    <Badge
                    badgeContent={totalItems}
                    color="error"
                    showZero
                    >
                        <ShoppingCartIcon/>
                    </Badge>
                </IconButton>
            
            </Toolbar>
        </AppBar>
    );
}

export default NavBar