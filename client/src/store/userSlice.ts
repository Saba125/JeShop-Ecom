/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';
import type { User } from '@/types';


const initialState: User = {
    uid: null,
    username: '',
    email: '',
    phone: '',
    user_type: 2,
    is_active: 1,
    email_verified_date: '',
    create_date: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
       setUser: (state: User, action: PayloadAction<User>) => {
            state.uid = action.payload.uid;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.user_type = action.payload.user_type;
            state.is_active = action.payload.is_active;
            state.email_verified_date = action.payload.email_verified_date;
            state.create_date = action.payload.create_date;
       },
       clearUser: (state: User) => {
            state.uid = null;
            state.username = '';
            state.email = '';
            state.phone = '';
            state.user_type = 2;
            state.is_active = 1;
            state.email_verified_date = '';
            state.create_date = '';
       }
    }
});

export const { setUser,clearUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
