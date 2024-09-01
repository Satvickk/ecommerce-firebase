import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: null,
    userName: null,
    userEmail: null,
    isLogged : false
};

export const AuthSlice = createSlice({
    name: 'Auth',
    initialState: initialState,
    reducers: {
        setAuth: (_, action) => {
            return action.payload
        },
        updateAuth: (state, action) => {
            return {...state, ...action.payload}
        },
        deleteAuth: () => {
            return initialState;
        }
    }
});

export const { setAuth, deleteAuth, updateAuth } = AuthSlice.actions;

export default AuthSlice.reducer;
