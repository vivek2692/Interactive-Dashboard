import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: null,
        token: null
    },
    reducers: {
        login: (state, action) => {
            state.userInfo = action.payload.data;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.userInfo = null;
            state.token = null;
        }
    }
});

export const {login, logout} = userSlice.actions;
export default userSlice.reducer;