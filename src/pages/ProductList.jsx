import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import {getProducts,getCategories} from '../api/productApi'
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    IconButton,
    Stack,
    TextField,
    Chip
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProductCard from "../components/ProductCard";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);

    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {
         async function fetchCategories() {
        try {
            const data = await getCategories();
            setCategories(data.results);
        } catch (err) {
            console.log(err);
        }
    }

    fetchCategories();
    }, []);

   
    useEffect(() => {
        const timer = setTimeout(() => {
            async function fetchProducts() {
            try {
                const params = {
                    search,
                    page,
                };

                if (selectedCategory) {
                    params.category = selectedCategory;
                }

                const data = await getProducts(params);

                setProducts(data.results);
                setNextPage(data.next);
                setPrevPage(data.previous);
                console.log(data)
            } catch (err) {
                console.log(err);
            }
        }

        fetchProducts();
        }, 400);

        return () => clearTimeout(timer);
    }, [search, selectedCategory, page]);

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Products
            </Typography>

            {/* SEARCH */}
            <TextField
                fullWidth
                label="Search products"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                }}
                sx={{ mb: 3 }}
            />

            {/* CATEGORIES */}
            <Stack
                direction="row"
                spacing={1}
                sx={{ mb: 3, overflowX: "auto" }}
            >
                <Chip
                    label="All"
                    clickable
                    color={selectedCategory === "" ? "primary" : "default"}
                    onClick={() => {
                        setSelectedCategory("");
                        setPage(1);
                    }}
                />

                {categories.map((category) => (
                    <Chip
                        key={category.id}
                        label={category.name}
                        clickable
                        color={
                            selectedCategory === category.id
                                ? "primary"
                                : "default"
                        }
                        onClick={() => {
                            setSelectedCategory(category.id);
                            setPage(1);
                        }}
                    />
                ))}
            </Stack>

            <Grid container spacing={3}>
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </Grid>

            {/* PAGINATION */}
            <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                mt={4}
            >
                <Chip
                    label="Previous"
                    disabled={!prevPage}
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                />

                <Chip
                    label="Next"
                    disabled={!nextPage}
                    onClick={() => setPage((p) => p + 1)}
                />
            </Stack>
        </Container>
    );
}

export default ProductList;