import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import { useState } from "react"
import WishlistService from "../../services/WishlistService/WishlistService";

function Product({ product }) {
    const { id, image } = product;
    const [onWishlist, setOnWishlist] = useState(() => WishlistService.isOnWishlist(id)); 
    const updateWishlist = () => {
        onWishlist ?
            WishlistService.removeFromWishlist(id) :
            WishlistService.addToWishlist(id) 
        
        setOnWishlist(!onWishlist);
    }

    return (
        <Card>
            <CardHeader
                title={product.name}
                action={(
                    <IconButton onClick={updateWishlist}>
                        { onWishlist ? <Favorite /> : <FavoriteBorder />}
                    </IconButton>)
                }
            />
            <CardMedia
                component="img"
                height='251'
                sx={{ objectFit: 'contain' }}
                image={`${process.env.PUBLIC_URL}/${image}`}
                alt={product.name}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>
            </CardContent>
        </Card>
    );
    <div>{product.name}</div>
}

export default Product;