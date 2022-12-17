import WishlistService from './WishlistService';

const mockSubjectNext = jest.fn();
WishlistService.wishlistSubject = { next: mockSubjectNext }

describe('WishlistService', () => {
    describe('addToWishlist', () => {
        beforeEach(() => {
            WishlistService.wishlistIds = [];
            mockSubjectNext.mockReset();
        });

        afterAll(() => {
            WishlistService.wishlistIds = [];
        });
        
        test('Can add an item to the wishlist', () => {
            WishlistService.addToWishlist('1');
            expect(WishlistService.wishlistIds[0]).toBe('1');
        });

        test('When adding an item to the wishlist the subject is provided with an updated wishlist ids', () => {
            WishlistService.addToWishlist('1');
            expect(mockSubjectNext).toHaveBeenCalledWith(['1']);
        });
        
        test('When adding an item to the wishlist the storage is updated', () => {
            jest.spyOn(WishlistService, 'updateWishlistIdsStorage');

            WishlistService.addToWishlist('1');
            expect(WishlistService.updateWishlistIdsStorage).toHaveBeenCalledTimes(1);
        });

        test('Can not add a duplicate  item to the wishlist', () => {       
            WishlistService.addToWishlist('1');
            WishlistService.addToWishlist('1');
            expect(WishlistService.wishlistIds.length).toBe(1);
        });
        
        test('Can remove an item from the wishlist', () => {
            WishlistService.wishlistIds = ['1'];
            WishlistService.removeFromWishlist('1');
        
            expect(WishlistService.wishlistIds.length).toBe(0);
        });
    })
    
    describe('isOnWishlist', () => {
        beforeAll(() => {
            WishlistService.wishlistIds = ['1'];
        });

        afterAll(() => {
            WishlistService.wishlistIds = [];
        });

        test('Can check if an item is on the wishlist', () => {
            expect(WishlistService.isOnWishlist('1')).toBe(true);
        });
        
        test('Can check if an item is not on the wishlist', () => {
            expect(WishlistService.isOnWishlist('2')).toBe(false);
        });
    }); 

    describe('fetchStorage', () => {
        const wishlistFetchStorage = ['1', '2', '3'];
        
        test('Can fetch wishlist storage from the local storage', async () => {
            localStorage.setItem(WishlistService.wishlistLocalId, JSON.stringify(wishlistFetchStorage));
            const fetch = await WishlistService.fetchStorage();
            expect(fetch).toEqual(wishlistFetchStorage);
        });

        test('Can fetch wishlist storage from the local storage even if there is not any', async () => {
            localStorage.removeItem(WishlistService.wishlistLocalId);
            const fetch = await WishlistService.fetchStorage();
            expect(fetch).toEqual([]);
        });
    }); 
});

