import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WishlistState, Product } from "../types";

const initialWishList: WishlistState = {
  customerId: "",
  selectedProducts: [],
  totalDoc: 0,
  wishlistDocId: ""
};

export const WishlistSlice = createSlice({
  name: "Wishlist",
  initialState: initialWishList,
  reducers: {
    setWishlist: (state, action: PayloadAction<Partial<WishlistState>>) => {
      if (action.payload.customerId !== undefined) state.customerId = action.payload.customerId;
      if (action.payload.selectedProducts !== undefined) state.selectedProducts = action.payload.selectedProducts;
      if (action.payload.totalDoc !== undefined) state.totalDoc = action.payload.totalDoc;
      if (action.payload.wishlistDocId !== undefined) state.wishlistDocId = action.payload.wishlistDocId;
    },
    addProductToWishlist: (state, action: PayloadAction<Product>) => {
      state.selectedProducts = [action.payload, ...state.selectedProducts];
      state.totalDoc = (state.totalDoc || 0) + 1;
    },
    removeProductFromWishlist: (state, action: PayloadAction<{ docId?: string; id?: string }>) => {
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
