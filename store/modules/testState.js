import { createSlice } from '@reduxjs/toolkit';

const initialState = {
};



export const SAVE_COOKIE = 'cookieState/SAVE_COOKIE';
export const LOAD_COOKIE = 'cookieState/LOAD_COOKIE';
export const REMOVE_COOKIE = 'cookieState/REMOVE_COOKIE';


const userSlice = createSlice({
    name: 'cookieState',
    initialState,
    reducers: {
        SAVE_COOKIE: (state, action) => {},
        REMOVE_COOKIE: (state, action) => {},
        LOAD_COOKIE: (state, action) => {},

    },
});


export default userSlice.reducer; // 리듀서;