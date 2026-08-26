import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllUsersState, UserProfile } from "../types";

const initialState: AllUsersState | null = null;

export const AllUserSlice = createSlice({
  name: 'AllUserDetails',
  initialState: initialState as AllUsersState | null,
  reducers: {
    setAllUserDetails: (_, action: PayloadAction<AllUsersState>) => {
      return action.payload;
    },
    updateSingleUserDetails: (state, action: PayloadAction<UserProfile>) => {
      if (state && state.totalDoc > 0 && Array.isArray(state.content)) {
        state.content = state.content.map((item) =>
          item.docId === action.payload.docId ? action.payload : item
        );
      }
    },
    removeSingleUserDetails: (state, action: PayloadAction<string>) => {
      if (state && state.totalDoc > 0 && Array.isArray(state.content)) {
        state.content = state.content.filter((item) => item.docId !== action.payload);
        state.totalDoc = Math.max(0, state.totalDoc - 1);
      }
    },
    removeAllUserDetails: () => {
      return null;
    }
  }
});

export const { setAllUserDetails, removeSingleUserDetails, removeAllUserDetails, updateSingleUserDetails } = AllUserSlice.actions;
export default AllUserSlice.reducer;
