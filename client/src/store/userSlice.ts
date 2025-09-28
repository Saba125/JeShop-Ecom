/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';
interface UserState {
    uid: number | null;
    username: string;
    email: string;
    phone: string;
    user_type: number;
    is_active: number;
    email_verified_date: string;
    create_date: string;
}

const initialState: UserState = {
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
       setUser: (state: UserState, action: PayloadAction<UserState>) => {
            state.uid = action.payload.uid;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.user_type = action.payload.user_type;
            state.is_active = action.payload.is_active;
            state.email_verified_date = action.payload.email_verified_date;
            state.create_date = action.payload.create_date;
       },
    }
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.counter.value;

export default userSlice.reducer;
