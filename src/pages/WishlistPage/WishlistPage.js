import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import Product from "../../components/Product/Product";
import ProductService from "../../services/ProductService/ProductService";

function WishlistPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        ProductService.getWishListProducts().then((data) => setProducts(data));
    }, []);

    return (
        <Layout title="Wishlist">
            <Grid justifyContent="center" container rowSpacing="16" columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {products.map((product, index) =>
                    <Grid key={index} item xs={8} sm={5} md={4}>
                        <Product key={index} product={product} />
                    </Grid>
                )}
            </Grid>
        </Layout>
    );
}

export default WishlistPage;