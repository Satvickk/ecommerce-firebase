import { createSlice } from "@reduxjs/toolkit";

const initialState = null

export const AllUserSlice = createSlice({
    name: 'AllUserDetails',
    initialState: initialState,
    reducers: {
        setAllUserDetails: (_, action) => {
            return action.payload
        },
        updateSingleUserDetails: (state, action) => {
            if(state?.totalDoc > 0 && Array.isArray(state.content)){
                state.content = state.content.map((item) => item.docId === action.payload.docId ? action.payload : item)
            }
        },
        removeSingleUserDetails: (state, action) => {
            if(state?.totalDoc > 0 && Array.isArray(state.content)){
                state.content = state.content.filter((item) => item.docId !== action.payload)
            }
        },
        removeAllUserDetails: () => {
            return initialState;
        }
    }
});

export const { setAllUserDetails,removeSingleUserDetails, removeAllUserDetails, updateSingleUserDetails } = AllUserSlice.actions;

export default AllUserSlice.reducer;
