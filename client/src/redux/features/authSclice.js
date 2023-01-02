import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogged: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
})


export default authSlice.reducer;