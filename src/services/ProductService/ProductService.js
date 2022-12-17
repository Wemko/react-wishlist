import WishlistService from "../WishlistService/WishlistService";

class ProductService {
    async getProducts() {
        return fetch(`${process.env.PUBLIC_URL}/products.json`)
            .then(resp => resp.json());
    }

    /*
        This has a racecondition if the wish list service is slower than the 
        products server. But if this was a real call it would fetch the products 
        straight from the server and it would not be required to have wish list ids.  
    */
    async getWishListProducts(){
        return fetch(`${process.env.PUBLIC_URL}/products.json`)
            .then(resp => resp.json())
            .then((data) => data.filter(({ id }) =>  WishlistService.isOnWishlist(id)))
    }
}

export default new ProductService();