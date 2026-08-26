import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  content: [],
  totalDoc: 0
};
export const AllProductSlice = createSlice({
  name: "AllProductDetails",
  initialState,
  reducers: {
    setAllProductDetails: (state, action) => {
      state.content = action.payload.content;
      state.totalDoc = action.payload.totalDoc;
    },
    addSingleProductDetails: (state, action) => {
      state.content = [action.payload, ...state.content];
      state.totalDoc += 1;
    },
    updateSingleProductDetails: (state, action) => {
      if (state.totalDoc > 0 && Array.isArray(state.content)) {
        state.content = state.content.map(
          (item) => item.docId === action.payload.docId ? action.payload : item
        );
      }
    },
    removeSingleProductDetails: (state, action) => {
      if (state.totalDoc > 0 && Array.isArray(state.content)) {
        state.content = state.content.filter(
          (item) => item.docId !== action.payload
        );
        state.totalDoc = Math.max(0, state.totalDoc - 1);
      }
    },
    removeAllProductDetails: () => {
      return initialState;
    }
  }
});
export const {
  setAllProductDetails,
  addSingleProductDetails,
  updateSingleProductDetails,
  removeSingleProductDetails,
  removeAllProductDetails
} = AllProductSlice.actions;
export default AllProductSlice.reducer;
