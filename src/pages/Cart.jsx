import { useContext, useEffect } from "react";
import { getCart } from "../api/cartApi";
import { Link } from "react-router-dom";
import {
    Button,
    Container,
    Typography,
    Box,
} from "@mui/material";

import CartContext from "../context/CartContext";
import CartItem from "../components/CartItem";

function Cart() {
    const { cart } = useContext(CartContext);

    const totalPrice = cart.reduce((total, item) => {
        return (
            total +
            Number(item.product_details.price) * Number(item.quantity)
        );
    }, 0);

    useEffect(() => {
        async function loadCart() {
            const data = await getCart();
            console.log("GET CART:", data);
        }

        loadCart();
    }, []);

    if (cart.length === 0) {
        return (
            <Container sx={{ py: 4, textAlign: "center" }}>
                <Typography variant="h5" sx={{ mb: 3 }}>
                    Your cart is empty!
                </Typography>

                <Button
                    variant="contained"
                    component={Link}
                    to="/"
                >
                    Continue Shopping 🛒
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
    );
}

export default Cart;