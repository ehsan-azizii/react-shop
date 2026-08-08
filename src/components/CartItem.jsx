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
    const {addToCart, decreaseQuantity,deleteCartItem}=useContext(CartContext);
    console.log("sub",item.subtotal)
    console.log("CART ITEM:", item);
    console.log("Price:", item.product_details.price);
    console.log("QUANTITY:", item.quantity);
    console.log("PRODUCT:", item.product);

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
    src={`http://127.0.0.1:8000${item.product_details.image}`}
    alt={item.product_details.name}
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
        {item.product_details.name}
    </Typography>
    <Typography>
    Category: {item.product_details.category.name}
    </Typography>
    <Typography>
       Price: ${item.product_details.price}
    </Typography>
    <Typography>
       subtotal: ${item.subtotal}
    </Typography>
    </Box>
    <Stack direction="row" spacing={1}>
        <IconButton onClick={()=>addToCart(item.product_details)}>
            <AddIcon/>
        </IconButton>
        <Typography 
        sx={{minWidth:24,
            textAlign:"center",
        }}
        >
            {item.quantity}
        </Typography>
        <IconButton onClick={()=>decreaseQuantity(item)}>
            <RemoveIcon/>
        </IconButton>
        <IconButton color="error"
        onClick={()=>deleteCartItem(item)}>
            <DeleteIcon/>
        </IconButton>

    </Stack>
    </Stack>
</Card>
    );
}


export default CartItem;