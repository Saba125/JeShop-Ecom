/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Cart, CartItems } from '@/types';

const initialState: Cart = {
    products: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action: PayloadAction<CartItems>) => {
            const findExistingItem = state.products.find(
                (item) => item.product_uid === action.payload.product_uid
            );
            if (findExistingItem) {
                findExistingItem.quantity += action.payload.quantity;
            } else {
                state.products.push(action.payload);
            }
        },
    },
});

export const { addItemToCart } = cartSlice.actions;

export default cartSlice.reducer;
