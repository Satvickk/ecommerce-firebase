import { createSlice } from "@reduxjs/toolkit";

const initialState = null

export const UserDetailSlice = createSlice({
    name: 'UserDetails',
    initialState: initialState,
    reducers: {
        setUserDetails: (_, action) => {
            return action.payload
        },
        updateUserDetails: (state, action) => {
            return {...state, ...action.payload}
        },
        removeUserDetails: () => {
            return initialState;
        }
    }
});

export const { setUserDetails, removeUserDetails, updateUserDetails } = UserDetailSlice.actions;

export default UserDetailSlice.reducer;
