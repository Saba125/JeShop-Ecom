import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Wishlist, WishlistItems } from '@/types';

const initialState: Wishlist = {
    products: [],
};

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addItemToWishlist: (state, action: PayloadAction<WishlistItems>) => {
            state.products.push(action.payload);
        },
    },
});

export const {addItemToWishlist} = wishlistSlice.actions;

export default wishlistSlice.reducer;
