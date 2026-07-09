import { Link } from "react-router-dom";
import{useContext} from "react";
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    IconButton,
} from "@mui/material";


import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartContext from "../context/CartContext";
function ProductCard({ product }) {
    const { addToCart }=useContext(CartContext)
    return (
        <Grid item xs={12} sm={6} md={4}>
            
                <Card
                    sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Link
                        to={`/products/${product.id}`}
                        style={{
                            textDecoration: "none",
                            color: "inherit",
                        }}
                    >
                        <CardMedia
                            component="img"
                            height="200"
                            image={product.image}
                            alt={product.name}
                            sx={{ objectFit: "cover" }}
                        />
                    </Link>
                    <CardContent sx={{ flexGrow: 1 }}>
                    <Link
                        to={`/products/${product.id}`}
                        style={{
                            textDecoration: "none",
                            color: "inherit",
                        }}
                    >
                            <Typography variant="h6">
                                {product.name}
                            </Typography>
                    </Link>

                        <Typography color="text.secondary">
                            {product.category.name}
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{ fontWeight: "bold", mt: 1 }}
                        >
                            ${product.price}
                        </Typography>

                        <IconButton color="primary" 
                        sx={{ mt: 1 }}
                        onClick={()=>addToCart(product)}>
                            <ShoppingCartIcon fontSize="small" />
                        </IconButton>
                    </CardContent>
                </Card>
            
        </Grid>
    );
}

export default ProductCard;