import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { AppBar, Button, Chip, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductService from "../../services/ProductService/ProductService";
import WishlistService from "../../services/WishlistService/WishlistService";
import Product from "../Product/Product";

const Layout = ({ children, title }) => {
    const [wishListLength, setWishListLength] = useState([]);
    const [wishlistProducts, setWishListProducts] = useState([]);
    const [openWishlist, setOpenWishlist] = useState(false);

    //Update the wishlist length
    useEffect(() => {
        const sub = WishlistService.wishlistSubject.subscribe((wishlistIds) => {
            setWishListLength(wishlistIds.length);
        });

        return () => {
            sub.unsubscribe();
        }
    }, []);

    //Update wishlist when opening it
    useEffect(() => {
        ProductService.getWishListProducts().then(data => {
            setWishListProducts(data);
        });
    }, [openWishlist])

    return (
        <div>
            <React.Fragment>
                <Drawer
                    anchor={'right'}
                    open={openWishlist}
                    onClose={() => setOpenWishlist(false)}
                    sx={{ overflow: 'scroll-y' }}
                >
                    <Box sx={{ maxWidth: '300px' }}>
                        {wishlistProducts.map((product, index) => {
                            return <Product key={index} product={product} />
                        })}
                    </Box>
                </Drawer>
            </React.Fragment>
            <AppBar position="sticky" sx={{ marginBottom: '32px' }} >
                <Container sx={{ maxWidth: '800' }}>
                    <Toolbar>
                        <Container sx={{ display: 'flex', alignItems: 'center' }}>
                            <Link to='/'>
                                <img
                                    alt="header company logo"
                                    src={`${process.env.PUBLIC_URL}/images/gamma.gif`}
                                    height="50"
                                />
                            </Link>
                            <Typography sx={{ marginLeft: '16px' }} variant="h5">
                                {title}
                            </Typography>
                        </Container>
                        <Link to="/wishlist">
                            <Button color="secondary" variant="contained">
                                Wishlist
                            </Button>
                        </Link>
                        <Box>
                            <IconButton disabled={wishListLength === 0} onClick={() => setOpenWishlist(true)}>{wishListLength > 0 ? <Favorite fontSize="large" /> : <FavoriteBorder fontSize="large" />}</IconButton>
                            {wishListLength < 0 || <Chip sx={{ position: 'absolute', marginLeft: '-20px' }} color="secondary" label={wishListLength} />}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box justifyContent="center" sx={{ display: 'flex', justifyContent: 'center' }} >
                <Container sx={{ maxWidth: 800 }}>
                    {children}
                </Container>
            </Box>
        </div>
    );
};

export default Layout;