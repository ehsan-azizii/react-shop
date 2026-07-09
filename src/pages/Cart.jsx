import { useContext } from "react";
import { Link } from "react-router-dom";
import { Button,
    Container,
    Typography,
    Box,
 } from "@mui/material";
import CartContext from "../context/CartContext";
import CartItem from "../components/CartItem";
function Cart() {
    const {cart} =useContext(CartContext);
    const totalPrice=cart.reduce((total,item)=>{
        return total + Number(item.price)*item.quantity
    },0)
    if (cart.length===0){
        return(
            <Container sx={{py:4}}>
                <Typography
                    variant="h5"
                    gutterBottom
                    >
                        Your cart is empty!
                </Typography>
                <Button 
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/">
                        Continue Shopping🛒
                </Button>
            </Container>
        );
    }
    return ( 
        <Container sx={{ py: 4 }}>
            {cart.map((item) => (
                <CartItem
                    key={item.id}
                    item={item}
                />
            ))}

            <Box
                sx={{
                    mt: 4,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="h5">
                    Total: ${totalPrice}
                </Typography>

                <Button variant="contained">
                    Checkout
                </Button>
            </Box>
        </Container>
      
        )

        
    
}

export default Cart;