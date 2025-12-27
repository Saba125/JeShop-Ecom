import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Wishlist, WishlistItems } from '@/types';

const initialState: Wishlist = {
    products: JSON.parse(localStorage.getItem('wishlist') || '[]'),
};

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addItemToWishlist: (state, action: PayloadAction<WishlistItems>) => {
            const existingItem = state.products.some(
                (item) => item.product_uid === action.payload.product_uid
            );
            if (existingItem) {
                state.products = state.products.filter(
                    (item) => item.product_uid !== action.payload.product_uid
                );
            } else {
                state.products.push(action.payload);
            }
            localStorage.setItem('wishlist', JSON.stringify(state.products));
        },
        removeItemFromWishlist: (state, action: PayloadAction<WishlistItems>) => {
            state.products = state.products.filter(
                (item) => item.product_uid !== action.payload.product_uid
            );
        },
    },
});

export const { addItemToWishlist, removeItemFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
