

import { createSlice } from "@reduxjs/toolkit";


const accountInitialState = {
    name: '',
    isLoggedIn: false
}


export const couterSlice = createSlice({
    name: 'account',
    initialState: accountInitialState,
    reducers: {
    }
})