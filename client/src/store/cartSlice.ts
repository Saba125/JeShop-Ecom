import { createSlice } from '@reduxjs/toolkit';
import type { CartItems } from '@/types';
import type { PayloadAction } from '@reduxjs/toolkit';
interface CartState {
    products: CartItems[];
}

const initialState: CartState = {
    products: JSON.parse(localStorage.getItem('cart') || '[]'),
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart(state, action: PayloadAction<CartItems>) {
            const existing = state.products.find(
                (item) => item.product_uid === action.payload.product_uid
            );

            if (existing) {
                if (existing.quantity < existing.stock) {
                    existing.quantity += 1;
                }
            } else {
                state.products.push(action.payload);
            }

            localStorage.setItem('cart', JSON.stringify(state.products));
        },
        addMultipleItemsToCart(state, action: PayloadAction<CartItems[]>) {
            for (const item of action.payload) {
                if (item.stock < item.quantity) {
                    continue;
                } else {
                    state.products.push(item);
                }
            }
            localStorage.setItem('cart', JSON.stringify(state.products));
        },

        updateItemQuantity(
            state,
            action: PayloadAction<{ product_uid: number; method: 'plus' | 'minus' }>
        ) {
            const item = state.products.find((p) => p.product_uid === action.payload.product_uid);

            if (!item) return;

            if (action.payload.method === 'plus' && item.quantity < item.stock) {
                item.quantity += 1;
            }

            if (action.payload.method === 'minus' && item.quantity > 1) {
                item.quantity -= 1;
            }

            localStorage.setItem('cart', JSON.stringify(state.products));
        },

        removeItemFromCart(state, action: PayloadAction<number>) {
            state.products = state.products.filter((item) => item.product_uid !== action.payload);

            localStorage.setItem('cart', JSON.stringify(state.products));
        },

        clearCart(state) {
            state.products = [];
            localStorage.removeItem('cart');
        },
    },
});

export const {
    addItemToCart,
    updateItemQuantity,
    removeItemFromCart,
    addMultipleItemsToCart,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
