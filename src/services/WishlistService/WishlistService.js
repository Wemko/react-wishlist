import { ReplaySubject } from "rxjs";

class WishlistService {
    wishlistLocalId = "wishlist";
    wishlistIds = [];
    wishlistSubject = new ReplaySubject();

    constructor() {
        this.fetchStorage()
            .then((data) => { 
                this.wishlistIds = data;
                this.wishlistSubject.next(this.wishlistIds); 
            });
    }

    addToWishlist(productId) {
        // Make sure it is not already on the wishlist to prevent duplicates
        if (this.isOnWishlist(productId)) return;
        this.wishlistIds.push(productId);

        this.updateWishlistIdsStorage();
        this.wishlistSubject.next(this.wishlistIds); 
    }

    removeFromWishlist(productId) {
        this.wishlistIds = this.wishlistIds.filter((id) => id !== productId);
        this.updateWishlistIdsStorage();
        this.wishlistSubject.next(this.wishlistIds); 
    }

    isOnWishlist(productId) {
        return !!this.wishlistIds.find((id) => id === productId);
    }

    updateWishlistIdsStorage() {
        return new Promise(resolve => {
            localStorage.setItem(this.wishlistLocalId, JSON.stringify(this.wishlistIds));
            resolve();
        });
    }

    fetchStorage() {
        return new Promise(resolve => {
            setTimeout(() => {
                const wishlist = localStorage.getItem(this.wishlistLocalId);

                resolve(wishlist ? JSON.parse(wishlist) : []);
            });
        });
    }
}

export default new WishlistService();