import{useContext} from "react";
import {
    Card,   
    Typography,
    IconButton,
    Stack,
    Box
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import CartContext from "../context/CartContext";


function CartItem({ item }) {
    const {addToCart, decreaseQuantity,removeFromCart}=useContext(CartContext);
    const subtotal = Number(item.price)*item.quantity;
    return (
       <Card sx={{ mb: 2 }}>
    <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ p: 2 }}
    >
        <Box
    component="img"
    src={item.image}
    alt={item.name}
    sx={{
        width: 120,
        height: 120,
        objectFit: "cover",
        borderRadius: 2,
    }}/>
    <Box
    sx={{ flexGrow:1,
        display:"flex",
        flexDirection:"column",
        gap:1,
     }}>
        <Typography
        variant="h6"
        fontWeight="bold">
        {item.name}
    </Typography>
    <Typography>
       Price: ${item.price}
    </Typography>
    <Typography>
       subtotal: ${subtotal}
    </Typography>
    </Box>
    <Stack flexDirection="row" spacing={1}>
        <IconButton onClick={()=>addToCart(item)}>
            <AddIcon/>
        </IconButton>
        <Typography 
        sx={{minWidth:24,
            textAlign:"center",
        }}
        >
            {item.quantity}
        </Typography>
        <IconButton onClick={()=>decreaseQuantity(item.id)}>
            <RemoveIcon/>
        </IconButton>
        <IconButton color="error"
        onClick={()=>removeFromCart(item.id)}>
            <DeleteIcon/>
        </IconButton>

    </Stack>
    </Stack>
</Card>
    );
}

export default CartItem;