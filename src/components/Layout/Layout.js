import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { AppBar, Chip, IconButton, Toolbar, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WishlistService from "../../services/WishlistService/WishlistService";

const Layout = ({ children, title }) => {
    const [wishListLength, setWishListLength] = useState([]); 

    useEffect(() => {
        const sub = WishlistService.wishlistSubject.subscribe((wishlistIds) => setWishListLength(wishlistIds.length))

        return () => {
            sub.unsubscribe();
        }
    }, [])
    
    return (
        <div>
            <AppBar position="static" sx={{ marginBottom: '32px' }} >
                <Container sx={{ maxWidth: '800' }}>
                    <Toolbar>
                        <Container sx={{ display: 'flex', alignItems: 'center' }}>
                            <Link to='/'>
                                <img
                                    src={`${process.env.PUBLIC_URL}/images/gamma.gif`}
                                    height="50"
                                />
                            </Link>
                            <Typography sx={{ marginLeft: '16px' }} variant="h5">
                                {title}
                            </Typography>
                        </Container>
                        <Link to='/wishlist'>
                            <IconButton edge="end">{wishListLength > 0 ? <Favorite fontSize="large" /> : <FavoriteBorder fontSize="large" />}</IconButton>
                            { wishListLength < 0 || <Chip sx={{ position: 'absolute', marginLeft: '-8px' }} color="secondary" label={wishListLength} />}
                        </Link>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box justifyContent="center" sx={{ display: 'flex', justifyContent: 'center' }} >
                <Container sx={{ maxWidth: 800 }}>
                    {children}
                </Container>
            </Box>
        </div>
    )
};

export default Layout;