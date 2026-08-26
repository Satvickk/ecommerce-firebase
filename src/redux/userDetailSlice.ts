import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "../types";

const initialState: UserProfile | null = null;

export const UserDetailSlice = createSlice({
  name: 'UserDetails',
  initialState: initialState as UserProfile | null,
  reducers: {
    setUserDetails: (_, action: PayloadAction<UserProfile | null>) => {
      return action.payload;
    },
    updateUserDetails: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state) {
        return { ...state, ...action.payload };
      }
      return state;
    },
    removeUserDetails: () => {
      return null;
    }
  }
});

export const { setUserDetails, removeUserDetails, updateUserDetails } = UserDetailSlice.actions;
export default UserDetailSlice.reducer;
