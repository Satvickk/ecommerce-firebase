import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserAuth } from "../types";

const initialState: UserAuth = {
  userId: null,
  userName: null,
  userEmail: null,
  isLogged: false
};

export const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setAuth: (_, action: PayloadAction<UserAuth>) => {
      return action.payload;
    },
    updateAuth: (state, action: PayloadAction<Partial<UserAuth>>) => {
      return { ...state, ...action.payload };
    },
    deleteAuth: () => {
      return initialState;
    }
  }
});

export const { setAuth, deleteAuth, updateAuth } = AuthSlice.actions;
export default AuthSlice.reducer;
