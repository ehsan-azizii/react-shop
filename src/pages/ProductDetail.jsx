import { useEffect,useState,useContext } from "react";
import { getProduct } from "../api/productApi";
import { useParams } from "react-router-dom";
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
} from "@mui/material";
import CartContext from "../context/CartContext";

function ProductDetail(){
    const {addToCart}=useContext(CartContext)
    const {id}=useParams()
    const [product, setProduct]=useState(null)

    useEffect(() => {
    async function fetchProduct() {
        try {
            const data = await getProduct(id);
            setProduct(data);
        } catch (err) {
            console.log(err);
        }
    }

    fetchProduct();
}, [id]);
    if (!product){
        return <h2>Loading...</h2>
    }
    return (
    <Container sx={{ py: 5 }}>

        <Card sx={{p:3}}>

            <Grid container spacing={4}>

                <Grid item size={{xs:12,md:6}}>
                    <CardMedia
                        component="img"
                        image={product.image}
                        alt={product.name}
                        sx={{
                            height: 450,
                            objectFit: "cover",
                            borderRadius: 2,
                        }}
                    />
                    
                </Grid>

                <Grid item size={{xs:12,md:6}}>

                   <CardContent>

                         <Typography variant="h4" gutterBottom>
                            {product.name}
                        </Typography>

                        <Typography
                            variant="h6"
                            color="text.secondary"
                            gutterBottom
                        >
                            {product.category.name}
                        </Typography>

                        <Typography sx={{ mt: 2 }}>
                            {product.description}
                        </Typography>

                        <Typography
                            variant="h5"
                            sx={{
                                mt: 3,
                                fontWeight: "bold",
                            }}
                        >
                            ${product.price}
                        </Typography>

                        <Typography sx={{ mt: 1 }}>
                            Stock : {product.stock}
                        </Typography>

                        <Button
                            variant="contained"
                            sx={{ mt: 4 }}
                            onClick={()=>addToCart(product)}
                        >
                            Add To Cart
                        </Button>

                   </CardContent>

                </Grid>

            </Grid>

        </Card>

    </Container>
);
}
export default ProductDetail