import { createSlice } from "@reduxjs/toolkit";
const initialState = null;
export const UserDetailSlice = createSlice({
  name: "UserDetails",
  initialState,
  reducers: {
    setUserDetails: (_, action) => {
      return action.payload;
    },
    updateUserDetails: (state, action) => {
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
