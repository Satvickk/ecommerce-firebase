import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllProductsState, Product } from "../types";

const initialState: AllProductsState = {
  content: [],
  totalDoc: 0,
};

export const AllProductSlice = createSlice({
  name: "AllProductDetails",
  initialState,
  reducers: {
    setAllProductDetails: (state, action: PayloadAction<AllProductsState>) => {
      state.content = action.payload.content;
      state.totalDoc = action.payload.totalDoc;
    },
    addSingleProductDetails: (state, action: PayloadAction<Product>) => {
      state.content = [action.payload, ...state.content];
      state.totalDoc += 1;
    },
    updateSingleProductDetails: (state, action: PayloadAction<Product>) => {
      if (state.totalDoc > 0 && Array.isArray(state.content)) {
        state.content = state.content.map((item) =>
          item.docId === action.payload.docId ? action.payload : item
        );
      }
    },
    removeSingleProductDetails: (state, action: PayloadAction<string>) => {
      if (state.totalDoc > 0 && Array.isArray(state.content)) {
        state.content = state.content.filter(
          (item) => item.docId !== action.payload
        );
        state.totalDoc = Math.max(0, state.totalDoc - 1);
      }
    },
    removeAllProductDetails: () => {
      return initialState;
    },
  },
});

export const {
  setAllProductDetails,
  addSingleProductDetails,
  updateSingleProductDetails,
  removeSingleProductDetails,
  removeAllProductDetails,
} = AllProductSlice.actions;

export default AllProductSlice.reducer;
