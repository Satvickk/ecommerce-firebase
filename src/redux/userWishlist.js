import { createSlice } from "@reduxjs/toolkit";
const initialWishList = {
  customerId: "",
  selectedProducts: [],
  totalDoc: 0,
  wishlistDocId: ""
};
export const WishlistSlice = createSlice({
  name: "Wishlist",
  initialState: initialWishList,
  reducers: {
    setWishlist: (state, action) => {
      if (action.payload.customerId !== void 0) state.customerId = action.payload.customerId;
      if (action.payload.selectedProducts !== void 0) state.selectedProducts = action.payload.selectedProducts;
      if (action.payload.totalDoc !== void 0) state.totalDoc = action.payload.totalDoc;
      if (action.payload.wishlistDocId !== void 0) state.wishlistDocId = action.payload.wishlistDocId;
    },
    addProductToWishlist: (state, action) => {
      state.selectedProducts = [action.payload, ...state.selectedProducts];
      state.totalDoc = (state.totalDoc || 0) + 1;
    },
    removeProductFromWishlist: (state, action) => {
      const targetId = action.payload.docId || action.payload.id;
      state.selectedProducts = state.selectedProducts.filter(
        (item) => (item.docId || item.id) !== targetId
      );
      state.totalDoc = Math.max(0, (state.totalDoc || 0) - 1);
    },
    emptyWishlist: (state) => {
      state.selectedProducts = [];
      state.totalDoc = 0;
    }
  }
});
export const {
  addProductToWishlist,
  emptyWishlist,
  removeProductFromWishlist,
  setWishlist
} = WishlistSlice.actions;
export default WishlistSlice.reducer;
