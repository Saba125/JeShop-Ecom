/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Cart, CartItems } from '@/types';
import { toast } from 'sonner';

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
            if (findExistingItem && findExistingItem.quantity + 1 > action.payload.stock) {
                toast.error("მონაცემი აღემატება მარაგს");
                return;
            }
            if (findExistingItem) {
                findExistingItem.quantity += action.payload.quantity;
            } else {
                state.products.push(action.payload);
            }
        },
        removeItemFromCart: (state, action: PayloadAction<number>) => {
            const existingItem = state.products.find((item) => item.product_uid === action.payload);
            if (existingItem) {
                state.products = state.products.filter((item) => item.product_uid !== action.payload);
            }
        },
        updateItemQuantity: (state, action: PayloadAction<{ product_uid: number;  method: "plus" | "minus" }>)  => {
            const existingItem = state.products.find((item) => item.product_uid === action.payload.product_uid)
            if (!existingItem) {
                toast.error("პროდუქტი ვერ მოიძებნა! სცადეთ მოგვიანებით")
                return;
            }
            if (action.payload.method === "plus") {
                if (existingItem.quantity + 1 > existingItem.stock) {
                    toast.error("მეტს ვერ დაამატებთ!")
                    return;
                }
                existingItem.quantity = existingItem.quantity + 1
            } else {
                existingItem.quantity = existingItem.quantity - 1;
            }
        }
            
    },
});

export const { addItemToCart, removeItemFromCart, updateItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;
